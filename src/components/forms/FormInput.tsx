import type { ComponentProps } from "react"
import FormField from "./FormField"
import { FORM_CONTROL_PROPS } from "./formControls"

type FormInputProps = ComponentProps<"input"> & { label: string }

export default function FormInput({ label, ...props }: FormInputProps) {
  return (
    <FormField label={label}>
      <input {...FORM_CONTROL_PROPS} {...props} />
    </FormField>
  )
}
