import type { ComponentProps } from "react"
import { CONTACT, WHATSAPP_URL } from "@/data/site"
import WhatsAppIcon from "@/components/icons/WhatsAppIcon"

type WhatsAppLinkProps = Pick<ComponentProps<"a">, "className" | "style">

export default function WhatsAppLink({
  className = "",
  style,
}: WhatsAppLinkProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      className={`inline-flex items-center gap-2 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70 ${className}`}
      style={{ color: "inherit", ...style }}
    >
      <WhatsAppIcon />
      <span>{CONTACT.phone}</span>
    </a>
  )
}
