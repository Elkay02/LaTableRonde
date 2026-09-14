import { useState, useEffect, type CSSProperties } from "react"
import logoTransparent from "@/imports/La_Table_Ronde_logo_transparent.png"
import { NAVIGATION_LINKS } from "@/data/navigation"
import type { Page, NavigationProps } from "@/types/navigation"

export default function Navbar({
  current,
  onNav,
}: { current: Page } & NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [current])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const scrollContainer = document.getElementById("page-scroll")
    const previousOverflow = scrollContainer?.style.overflowY ?? ""
    if (scrollContainer) scrollContainer.style.overflowY = "hidden"
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      if (scrollContainer) scrollContainer.style.overflowY = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [menuOpen])
  useEffect(() => {
    const el = document.getElementById("page-scroll")
    if (!el) return
    const h = () => setScrolled(el.scrollTop > 60)
    el.addEventListener("scroll", h)
    return () => el.removeEventListener("scroll", h)
  }, [])

  const navBg =
    current === "home" && !scrolled && !menuOpen
      ? "transparent"
      : "rgba(26,26,26,0.97)"

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: navBg,
        borderBottom:
          scrolled || current !== "home"
            ? "1px solid rgba(249,193,10,0.15)"
            : "none",
      }}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-16 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            onNav("home")
            setMenuOpen(false)
          }}
          className="cursor-pointer flex-shrink-0"
        >
          <img
            src={logoTransparent}
            alt="La Table Ronde"
            style={{ width: 58, height: 58, objectFit: "contain" }}
          />
        </button>
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {NAVIGATION_LINKS.map((l) => (
            <button
              key={l.page}
              onClick={() => onNav(l.page)}
              className="navigation-link font-display tracking-[0.18em] uppercase relative pb-1"
              aria-current={current === l.page ? "page" : undefined}
              style={
                {
                  "--navigation-color":
                    current === l.page
                      ? "var(--gold)"
                      : "rgba(255,255,255,0.8)",
                  fontSize: "0.63rem",
                  whiteSpace: "nowrap",
                } as CSSProperties
              }
            >
              {l.label}
              <span
                className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: 1,
                  background: "var(--gold)",
                  transform: current === l.page ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </button>
          ))}
        </div>
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 min-w-11 min-h-11 cursor-pointer"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1,
                background: "var(--gold)",
              }}
            />
          ))}
        </button>
      </div>
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation-menu md:hidden"
          style={{
            background: "rgba(26,26,26,0.98)",
            borderTop: "1px solid rgba(249,193,10,0.15)",
          }}
        >
          {NAVIGATION_LINKS.map((l) => (
            <button
              key={l.page}
              onClick={() => {
                onNav(l.page)
                setMenuOpen(false)
              }}
              className="navigation-link block w-full text-left px-5 sm:px-8 py-4 font-display tracking-[0.2em] uppercase border-b"
              aria-current={current === l.page ? "page" : undefined}
              style={
                {
                  "--navigation-color":
                    current === l.page
                      ? "var(--gold)"
                      : "rgba(255,255,255,0.7)",
                  borderColor: "rgba(249,193,10,0.1)",
                  fontSize: "0.65rem",
                } as CSSProperties
              }
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
