import type { ReactNode } from "react"
import FormLabel from "./FormLabel"

interface FormFieldProps {
  label: string
  children: ReactNode
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      {children}
    </div>
  )
}
