export interface InquiryEnv {
  CF_ACCOUNT_ID?: string
  CF_EMAIL_API_TOKEN?: string
  INQUIRY_FROM?: string
  INQUIRY_TO?: string
}

const limits = { name: 150, email: 254, phone: 50, event: 80, date: 10, guests: 6, message: 5000 }
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const maxBodyBytes = 24000

function reply(status: number, error?: string) {
  return Response.json({ success: status === 200, ...(error ? { error } : {}) }, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 405 ? { Allow: "POST" } : {}) },
  })
}

// Read with a byte limit even when Content-Length is absent or incorrect.
async function readBody(request: Request): Promise<string> {
  if (!request.body) return ""
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let bytes = 0
  let body = ""
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > maxBodyBytes) {
        await reader.cancel()
        throw new RangeError("Request too large")
      }
      body += decoder.decode(value, { stream: true })
    }
    return body + decoder.decode()
  } finally {
    reader.releaseLock()
  }
}

export default async function handleInquiry({ request, env }: { request: Request; env: InquiryEnv }): Promise<Response> {
  if (request.method !== "POST") return reply(405, "Method not allowed")
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return reply(403, "Invalid origin")
  }
  if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(415, "Expected JSON")
  }

  let data: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(await readBody(request))
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply(400, "Invalid inquiry")
    data = parsed as Record<string, unknown>
  } catch (error) {
    return reply(error instanceof RangeError ? 413 : 400, "Invalid request body")
  }

  // A honeypot filters basic automated submissions; it is not a rate limiter.
  if (data.website !== undefined && data.website !== "") return reply(400, "Invalid inquiry")
  const fields: Record<string, string> = {}
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== "string" || data[key].length > limit) return reply(400, "Invalid inquiry")
    fields[key] = data[key].trim()
  }
  if (!fields.name || !fields.phone || !fields.message || !emailPattern.test(fields.email)) {
    return reply(400, "Complete all required fields")
  }
  if (fields.guests && !/^[1-9]\d{0,5}$/.test(fields.guests)) return reply(400, "Invalid guest count")
  if (fields.date && (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date) ||
    !Number.isFinite(Date.parse(fields.date)) || new Date(fields.date).toISOString().slice(0, 10) !== fields.date)) {
    return reply(400, "Invalid date")
  }

  const { CF_ACCOUNT_ID, CF_EMAIL_API_TOKEN, INQUIRY_FROM, INQUIRY_TO } = env
  if (!CF_ACCOUNT_ID || !/^[a-f0-9]{32}$/i.test(CF_ACCOUNT_ID) || !CF_EMAIL_API_TOKEN ||
    !INQUIRY_FROM || !emailPattern.test(INQUIRY_FROM) || !INQUIRY_TO || !emailPattern.test(INQUIRY_TO)) {
    console.error("Inquiry email configuration is missing or invalid")
    return reply(503, "Email is not configured")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/email/sending/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${CF_EMAIL_API_TOKEN}`, "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        from: INQUIRY_FROM,
        to: INQUIRY_TO,
        replyTo: fields.email,
        subject: "New event inquiry - La Table Ronde",
        text: [
          `Name: ${fields.name}`, `Email: ${fields.email}`, `Phone / WhatsApp: ${fields.phone}`,
          `Event type: ${fields.event || "Not specified"}`, `Event date: ${fields.date || "Not specified"}`,
          `Number of guests: ${fields.guests || "Not specified"}`, "", "Message:", fields.message,
        ].join("\n"),
      }),
    })
    const result = await response.json() as {
      success?: boolean
      result?: { delivered?: string[]; queued?: string[]; permanent_bounces?: string[] }
    }
    const delivery = result.result
    const accepted = [delivery?.delivered, delivery?.queued].some(
      (addresses) => Array.isArray(addresses) && addresses.includes(INQUIRY_TO),
    )
    if (!response.ok || result.success !== true || !accepted || delivery?.permanent_bounces?.includes(INQUIRY_TO)) {
      console.error("Inquiry email rejected", response.status)
      return reply(502, "Email was not accepted")
    }
    return reply(200)
  } catch {
    // Do not log the token or visitors' contact details and messages.
    console.error("Inquiry email service unavailable")
    return reply(502, "Email service unavailable")
  } finally {
    clearTimeout(timeout)
  }
}
