import { CONTACT } from "@/data/site"

export const INQUIRY_EMAIL = CONTACT.email

export interface Inquiry {
  name: string
  email: string
  phone: string
  event: string
  date: string
  guests: string
  message: string
}

export async function sendInquiry(inquiry: Inquiry, website = ""): Promise<void> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(
      "/api/inquiries",
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
          event: inquiry.event,
          date: inquiry.date,
          guests: inquiry.guests,
          message: inquiry.message.trim(),
          website,
        }),
      },
    )

    if (!response.ok) throw new Error("Inquiry submission failed")

    const result: unknown = await response.json()
    if (
      !result ||
      typeof result !== "object" ||
      !("success" in result) ||
      result.success !== true
    ) {
      throw new Error("Inquiry was not accepted")
    }
  } finally {
    clearTimeout(timeout)
  }
}
