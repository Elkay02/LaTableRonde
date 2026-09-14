import logoTransparent from "@/imports/La_Table_Ronde_logo_transparent.png"
import { CONTACT } from "@/data/site"
import { NAVIGATION_LINKS } from "@/data/navigation"
import InstagramLink from "@/components/ui/InstagramLink"
import InstagramIcon from "@/components/icons/InstagramIcon"
import WhatsAppLink from "@/components/ui/WhatsAppLink"
import type { NavigationProps } from "@/types/navigation"
import type { CSSProperties } from "react"

export default function Footer({ onNav }: NavigationProps) {
  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(249,193,10,0.12)",
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <img
              src={logoTransparent}
              alt="La Table Ronde"
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                marginBottom: 12,
              }}
            />
            <span
              className="block font-display tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--gold)", fontSize: "0.68rem" }}
            >
              La Table Ronde
            </span>
            <p
              className="font-body text-sm leading-loose"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: 320 }}
            >
              Full end-to-end catering services and live stations.
              <br />
              Established 2024, Lebanon.
            </p>
          </div>
          <div>
            <p
              className="font-display tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--gold)", fontSize: "0.65rem" }}
            >
              Navigation
            </p>
            <div className="space-y-3">
              {NAVIGATION_LINKS.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => onNav(page)}
                  className="navigation-link block font-body text-sm"
                  style={
                    {
                      "--navigation-color": "rgba(255,255,255,0.45)",
                    } as CSSProperties
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p
              className="font-display tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--gold)", fontSize: "0.65rem" }}
            >
              Contact
            </p>
            <div
              className="space-y-3 font-body text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className="block transition-opacity duration-200 hover:opacity-70"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                {CONTACT.email}
              </a>
              <WhatsAppLink />
              <InstagramLink
                className="flex items-center gap-2 pt-2 transition-opacity duration-200 hover:opacity-70"
                style={{ cursor: "pointer" }}
              >
                <InstagramIcon size={15} />
                <span
                  className="font-display tracking-[0.18em] uppercase"
                  style={{ color: "var(--gold)", fontSize: "0.6rem" }}
                >
                  @latableronde.lb
                </span>
              </InstagramLink>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
          }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p
            className="font-body text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            © 2024 La Table Ronde. All rights reserved.
          </p>
          <p
            className="font-display tracking-[0.3em] uppercase"
            style={{ color: "rgba(249,193,10,0.35)", fontSize: "0.55rem" }}
          >
            Lebanon's Premier Live Catering Experience
          </p>
        </div>
      </div>
    </footer>
  )
}
