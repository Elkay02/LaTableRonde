import { useState, useEffect } from "react"
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
    const el = document.getElementById("page-scroll")
    if (!el) return
    const h = () => setScrolled(el.scrollTop > 60)
    el.addEventListener("scroll", h)
    return () => el.removeEventListener("scroll", h)
  }, [])

  const navBg =
    current === "home" && !scrolled ? "transparent" : "rgba(26,26,26,0.97)"

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
      <div className="w-full max-w-screen-2xl mx-auto px-8 lg:px-16 py-3 flex items-center justify-between">
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
              className="font-display tracking-[0.18em] uppercase transition-colors duration-200 relative pb-1"
              style={{
                color:
                  current === l.page ? "var(--gold)" : "rgba(255,255,255,0.8)",
                fontSize: "0.63rem",
                whiteSpace: "nowrap",
              }}
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
          className="md:hidden flex flex-col gap-1.5 p-2"
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
          className="md:hidden"
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
              className="block w-full text-left px-8 py-4 font-display tracking-[0.2em] uppercase border-b"
              style={{
                color:
                  current === l.page ? "var(--gold)" : "rgba(255,255,255,0.7)",
                borderColor: "rgba(249,193,10,0.1)",
                fontSize: "0.65rem",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
