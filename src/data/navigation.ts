import type { Page } from "@/types/navigation"

interface NavigationLink {
  label: string
  page: Page
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: "Home", page: "home" },
  { label: "About Us", page: "about" },
  { label: "Our Services", page: "services" },
  { label: "Gallery", page: "gallery" },
  { label: "Contact Us", page: "contact" },
]
