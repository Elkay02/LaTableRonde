import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import ts from "typescript"

// Load the actual function without adding a test runtime dependency.
const source = await readFile(new URL("../worker/inquiries.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
})
const inquiryModule = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
const { default: onRequest } = await import(inquiryModule)
const workerSource = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8")
const workerOutput = ts.transpileModule(workerSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText.replace('"./inquiries"', JSON.stringify(inquiryModule))
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(workerOutput).toString("base64")}`)
const origin = "https://la-tableronde.com"
const env = {
  RESEND_API_KEY: "test-token",
  INQUIRY_FROM: "hello@la-tableronde.com", INQUIRY_TO: "inbox@example.com",
}
const inquiry = {
  name: " Léa ", email: "visitor@example.com", phone: "+961 71 000 000",
  event: "Wedding", date: "2027-04-15", guests: "80", message: "An outdoor dinner, please.", website: "",
}
function request(body = inquiry, options = {}) {
  return new Request(`${origin}/api/inquiries`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body), ...options,
  })
}

test("Worker inquiry endpoint", async (t) => {
  let calls = []
  let apiResponse
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, init })
    if (apiResponse instanceof Error) throw apiResponse
    return apiResponse.clone()
  })
  t.mock.method(console, "error", () => {})
  await t.test("accepted mail preserves all fields, fixed recipient and Reply-To", async () => {
      apiResponse = Response.json({ id: "test-email-id" })
      const response = await onRequest({ request: request({ ...inquiry, to: "attacker@example.com" }), env })
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { success: true })
      const call = calls.at(-1)
      assert.equal(call.url, "https://api.resend.com/emails")
      assert.equal(call.init.headers.Authorization, "Bearer test-token")
      const payload = JSON.parse(call.init.body)
      assert.deepEqual(payload.to, [env.INQUIRY_TO])
      assert.equal(payload.from, env.INQUIRY_FROM)
      assert.equal(payload.reply_to, inquiry.email)
      for (const key of ["name", "email", "phone", "event", "date", "guests", "message"]) {
        assert.ok(payload.text.includes(inquiry[key].trim()))
      }
  })
  await t.test("invalid requests never call the email provider", async () => {
    calls = []
    const cases = [
      [request(inquiry, { method: "GET", body: undefined }), 405],
      [request(inquiry, { headers: { Origin: "https://other.example", "Content-Type": "application/json" } }), 403],
      [request(inquiry, { headers: { Origin: origin } }), 415],
      [request(inquiry, { body: "{" }), 400], [request(null), 400],
      [request({ ...inquiry, website: "bot" }), 400],
      [request({ ...inquiry, name: " " }), 400],
      [request({ ...inquiry, email: "x@example.com\r\nBcc: victim@example.com" }), 400],
      [request({ ...inquiry, phone: 123 }), 400],
      [request({ ...inquiry, guests: "-1" }), 400],
      [request({ ...inquiry, date: "2027-02-30" }), 400],
      [request({ ...inquiry, message: "x".repeat(5001) }), 400],
      [request({ ...inquiry, message: "x".repeat(24001) }), 413],
    ]
    for (const [req, expected] of cases) assert.equal((await onRequest({ request: req, env })).status, expected)
    assert.equal((await onRequest({ request: request(), env: {} })).status, 503)
    assert.equal(calls.length, 0)
  })
  await t.test("provider failures, malformed responses and network errors cannot report success", async () => {
    for (const result of [
      Response.json({ message: "Invalid API key" }, { status: 401 }),
      Response.json({ message: "Domain is not verified" }, { status: 403 }),
      Response.json({ message: "Rate limit exceeded" }, { status: 429 }),
      Response.json({ id: "unexpected-id" }, { status: 500 }),
      Response.json({}), Response.json({ id: "" }), Response.json({ id: 123 }),
      Response.json(null), new Response("not json"),
      new Error("network unavailable"), new DOMException("Timeout", "AbortError"),
    ]) {
      apiResponse = result
      const response = await onRequest({ request: request(), env })
      assert.equal(response.status, 502)
      assert.equal((await response.json()).success, false)
    }
  })
})

test("Worker routes inquiries and keeps API failures separate from static pages", async () => {
  const assetRequests = []
  const runtimeEnv = { ASSETS: { fetch: async (req) => {
    assetRequests.push(req.url)
    return new Response("static page")
  } } }
  for (const path of ["/", "/contact", "/assets/site.css"]) {
    assert.equal(await (await worker.fetch(new Request(`${origin}${path}`), runtimeEnv)).text(), "static page")
  }
  for (const path of ["/api", "/api/unknown"]) {
    assert.equal((await worker.fetch(new Request(`${origin}${path}`), runtimeEnv)).status, 404)
  }
  // A GET to the actual handler must return 405, never the SPA HTML fallback.
  assert.equal((await worker.fetch(new Request(`${origin}/api/inquiries`), runtimeEnv)).status, 405)
  assert.equal(assetRequests.length, 3)
})
