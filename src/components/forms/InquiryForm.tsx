import { useState } from "react"
import FormField from "./FormField"
import FormInput from "./FormInput"
import { FORM_CONTROL_PROPS, FORM_CONTROL_STYLE } from "./formControls"

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    guests: "",
    message: "",
  })
  const [sent, setSent] = useState(false)
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      {sent ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-16">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name *"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <FormInput
              label="Email Address *"
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
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
            <FormField label="Event Type">
              <select
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
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            <FormInput
              label="Number of Guests"
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
          <button
            type="submit"
            className="w-full font-display tracking-[0.28em] uppercase py-4 transition-all duration-300 hover:opacity-85"
            style={{
              background: "var(--gold)",
              color: "var(--ink)",
              fontSize: "0.7rem",
            }}
          >
            Send Inquiry
          </button>
        </form>
      )}
    </>
  )
}
