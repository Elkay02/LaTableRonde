import type { ComponentProps } from "react"
import { INSTAGRAM_URL } from "@/data/site"

type InstagramLinkProps = Omit<ComponentProps<"a">, "href" | "onClick">

export default function InstagramLink(props: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      onClick={(event) => {
        event.preventDefault()
        window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")
      }}
      {...props}
    />
  )
}
