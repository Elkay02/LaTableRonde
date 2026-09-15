export type Page = "home" | "about" | "services" | "gallery" | "contact"

export type NavigationProps = { onNav: (page: Page, section?: string) => void }
