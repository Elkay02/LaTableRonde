import ActionButton from "@/components/ui/ActionButton"
import { useRef, useState, type FormEvent } from "react"
import { INQUIRY_EMAIL, sendInquiry, type Inquiry } from "@/services/inquiries"
import FormField from "./FormField"
import FormInput from "./FormInput"
import { FORM_CONTROL_PROPS, FORM_CONTROL_STYLE } from "./formControls"

export default function InquiryForm() {
  const [form, setForm] = useState<Inquiry>({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    guests: "",
    message: "",
  })
  const [sent, setSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<"required" | "send" | null>(null)
  const sendingRef = useRef(false)
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sendingRef.current) return
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("required")
      return
    }

    sendingRef.current = true
    setIsSending(true)
    setError(null)

    try {
      await sendInquiry(form)
      setSent(true)
    } catch {
      setError("send")
    } finally {
      sendingRef.current = false
      setIsSending(false)
    }
  }

  return (
    <>
      {sent ? (
        <div
          role="status"
          className="h-full flex flex-col items-center justify-center text-center py-16"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="mb-6"
          >
            <circle
              cx="24"
              cy="24"
              r="23"
              stroke="var(--gold)"
              strokeWidth="1.2"
              fill="none"
            />
            <polyline
              points="14,24 21,31 34,17"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3
            className="font-display tracking-[0.15em] uppercase mb-3"
            style={{ color: "var(--ink)", fontSize: "0.8rem" }}
          >
            Message Received
          </h3>
          <p className="font-body text-sm" style={{ color: "var(--charcoal)" }}>
            Thank you for reaching out. We will be in touch shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-busy={isSending}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name *"
              name="name"
              autoComplete="name"
              disabled={isSending}
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <FormInput
              label="Email Address *"
              name="email"
              autoComplete="email"
              disabled={isSending}
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Phone / WhatsApp *"
              name="phone"
              autoComplete="tel"
              disabled={isSending}
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
            <FormField label="Event Type">
              <select
                name="event"
                disabled={isSending}
                {...FORM_CONTROL_PROPS}
                style={{ ...FORM_CONTROL_STYLE, appearance: "none" }}
                value={form.event}
                onChange={(e) =>
                  setForm((f) => ({ ...f, event: e.target.value }))
                }
              >
                <option value="">Select an option</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Private Party</option>
                <option>Outdoor Gathering</option>
                <option>Other</option>
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Event Date"
              name="date"
              disabled={isSending}
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            <FormInput
              label="Number of Guests"
              name="guests"
              disabled={isSending}
              type="number"
              min="1"
              value={form.guests}
              onChange={(e) =>
                setForm((f) => ({ ...f, guests: e.target.value }))
              }
            />
          </div>
          <FormField label="Message *">
            <textarea
              name="message"
              disabled={isSending}
              required
              rows={5}
              {...FORM_CONTROL_PROPS}
              style={{ ...FORM_CONTROL_STYLE, resize: "none" }}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
            />
          </FormField>
          {error && (
            <p
              role="alert"
              className="font-body text-sm"
              style={{ color: "#b42318" }}
            >
              {error === "required" ? (
                "Please complete all required fields."
              ) : (
                <>
                  We couldn't send your inquiry. Please try again, or email us
                  directly at{" "}
                  <a href={`mailto:${INQUIRY_EMAIL}`} className="underline">
                    {INQUIRY_EMAIL}
                  </a>
                  .
                </>
              )}
            </p>
          )}
          <ActionButton
            variant="gold"
            type="submit"
            className="w-full py-4"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Inquiry"}
          </ActionButton>
        </form>
      )}
    </>
  )
}
