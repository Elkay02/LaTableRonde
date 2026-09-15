import logoTransparent from "@/imports/La_Table_Ronde_logo_transparent.png"
import ActionButton from "@/components/ui/ActionButton"
import { IMG } from "@/data/images"

import ServicePillars from "@/components/sections/ServicePillars"

import GoldDivider from "@/components/ui/GoldDivider"

import type { NavigationProps } from "@/types/navigation"

export default function HomePage({ onNav }: NavigationProps) {
  return (
    <div>
      <div
        className="home-hero relative flex flex-col overflow-hidden"
        style={{ background: "#111" }}
      >
        <img
          src={IMG.hero}
          alt="Elegant banquet table setting"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.72))",
          }}
        />

        <div className="home-hero-spacer" style={{ flexShrink: 0 }} />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full">
          <div className="mb-4 md:mb-8">
            <img
              src={logoTransparent}
              alt="La Table Ronde"
              className="home-hero-logo"
              style={{
                objectFit: "contain",

                display: "block",

                margin: "0 auto",
              }}
            />
          </div>
          <h1
            className="home-hero-title font-display tracking-[0.15em] uppercase mb-4 md:mb-6"
            style={{
              color: "var(--gold)",

              lineHeight: 1.05,
            }}
          >
            La Table
            <br />
            Ronde
          </h1>
          <p
            className="home-hero-description font-body mb-6 md:mb-12 mx-auto"
            style={{
              color: "rgba(255,255,255,0.72)",

              maxWidth: 560,
            }}
          >
            Full end-to-end catering excellence,
            <br />
            brought to life through authentic live stations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center w-full">
            <ActionButton
              onClick={() => onNav("contact")}
              className="w-64 max-w-full h-11 md:h-14 px-6 shrink-0"
            >
              Book an Event
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => onNav("services")}
              className="w-64 max-w-full h-11 md:h-14 px-6 shrink-0"
            >
              Our Services
            </ActionButton>
          </div>
        </div>

        <div className="relative flex flex-col items-center pb-3 pt-3 md:pb-10 md:pt-8 flex-shrink-0">
          <div
            className="w-px h-6 md:h-10 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <div
              className="w-full h-1/2"
              style={{
                background: "var(--gold)",

                animation: "slideDown 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div
        className="py-14 md:py-24 px-5 sm:px-8 lg:px-16"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="font-display tracking-[0.4em] uppercase mb-4"
            style={{
              color: "var(--gold)",

              fontSize: "0.8rem",

              fontWeight: 600,
            }}
          >
            Our Philosophy
          </p>
          <h2
            className="font-heading mb-6"
            style={{
              color: "var(--ink)",

              fontWeight: 400,

              lineHeight: 1.35,

              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            }}
          >
            Where Culinary Craft
            <br />
            Meets Lebanese Hospitality
          </h2>
          <GoldDivider />
          <p
            className="font-body leading-loose mt-6 mx-auto"
            style={{
              color: "var(--charcoal)",

              maxWidth: 640,

              fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
            }}
          >
            At La Table Ronde, every event is a curated experience. From
            intimate gatherings to grand celebrations, we bring the warmth of
            Lebanese tradition and the theatre of live cooking to your table,
            crafted with precision, served with grace.
          </p>
        </div>
      </div>

      {/* Two pillars */}
      <ServicePillars
        onNav={onNav}
        cardClassName="px-10 lg:px-16 py-14 flex flex-col"
      />

      {/* Gallery strip */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ height: 340 }}
      >
        {[IMG.grill, IMG.finedining, IMG.cooking, IMG.feast].map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ background: "#1a1a1a" }}
          >
            <img
              src={src}
              alt="Catering event"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              style={{ opacity: 0.8 }}
            />
          </div>
        ))}
      </div>

      {/* Gold CTA */}
      <div
        className="py-12 md:py-20 px-5 sm:px-8 text-center"
        style={{ background: "var(--gold)" }}
      >
        <p
          className="font-display tracking-[0.4em] uppercase mb-3"
          style={{ color: "var(--ink)", fontSize: "0.8rem", fontWeight: 700 }}
        >
          Ready to Host?
        </p>
        <h2
          className="font-display tracking-[0.08em] uppercase mb-6"
          style={{
            color: "var(--ink)",

            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          }}
        >
          Plan Your Next Event With Us
        </h2>
        <ActionButton
          variant="dark"
          onClick={() => onNav("contact")}
          className="px-5 sm:px-12 py-4"
        >
          Get in Touch
        </ActionButton>
      </div>
    </div>
  )
}
