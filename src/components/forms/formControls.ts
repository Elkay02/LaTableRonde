import type { CSSProperties, FocusEvent } from "react"

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const FORM_CONTROL_STYLE: CSSProperties = {
  background: "var(--cream)",
  border: "1px solid var(--border)",
  color: "var(--ink)",
  fontFamily: "'Source Sans 3', sans-serif",
}

export const FORM_CONTROL_PROPS = {
  className:
    "w-full px-4 py-3 font-body text-sm outline-none transition-colors duration-200",
  style: FORM_CONTROL_STYLE,
  onFocus: (event: FocusEvent<FormControl>) => {
    event.currentTarget.style.borderColor = "var(--gold)"
  },
  onBlur: (event: FocusEvent<FormControl>) => {
    event.currentTarget.style.borderColor = "var(--border)"
  },
}
