export const INQUIRY_EMAIL = "lucienkayrouz@gmail.com"

export interface Inquiry {
  name: string
  email: string
  phone: string
  event: string
  date: string
  guests: string
  message: string
}

export async function sendInquiry(inquiry: Inquiry): Promise<void> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: inquiry.name.trim(),
          email: inquiry.email.trim(),
          phone: inquiry.phone.trim(),
          "Event type": inquiry.event || "Not specified",
          "Event date": inquiry.date || "Not specified",
          "Number of guests": inquiry.guests || "Not specified",
          message: inquiry.message.trim(),
          _subject: "New event inquiry - La Table Ronde",
          _replyto: inquiry.email.trim(),
          _template: "table",
        }),
      },
    )

    if (!response.ok) throw new Error("Inquiry submission failed")

    const result: unknown = await response.json()
    if (
      !result ||
      typeof result !== "object" ||
      !("success" in result) ||
      (result.success !== true && result.success !== "true")
    ) {
      throw new Error("Inquiry was not accepted")
    }
  } finally {
    clearTimeout(timeout)
  }
}
