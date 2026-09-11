import type { ReactNode } from "react"

const FormLabel = ({ children }: { children: ReactNode }) => (
  <label
    className="font-display tracking-[0.18em] uppercase block mb-2"
    style={{ color: "var(--charcoal)", fontSize: "0.68rem" }}
  >
    {children}
  </label>
)

export default FormLabel
