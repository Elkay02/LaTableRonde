import { SERVICE_PILLARS } from "@/data/services"
import { getPagePath } from "@/hooks/usePageNavigation"
import type { NavigationProps } from "@/types/navigation"

type ServicePillarsProps = NavigationProps & { cardClassName: string }

export default function ServicePillars({ cardClassName, onNav }: ServicePillarsProps) {
  return (
    <div
      style={{
        background: "#ffffff",

        borderTop: "1px solid var(--border)",

        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-0">
        {SERVICE_PILLARS.map((p, i) => (
          <div key={i} className={`service-pillar ${cardClassName}`}>
            <span
              className="font-display mb-5"
              style={{
                color: "var(--gold)",

                fontSize: "2.2rem",

                lineHeight: 1,
              }}
            >
              {p.num}
            </span>
            <h3
              className="font-display tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--ink)", fontSize: "0.85rem" }}
            >
              {p.title}
            </h3>
            <div
              style={{
                width: 30,

                height: 1,

                background: "var(--gold)",

                marginBottom: 18,
              }}
            />
            <p
              className="font-body leading-loose"
              style={{
                color: "var(--charcoal)",

                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              }}
            >
              {p.desc}
            </p>
            <a
              href={`${getPagePath("services")}#${p.id}`}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                event.preventDefault()
                onNav("services", p.id)
              }}
              className="font-display mt-auto pt-6 inline-flex min-h-11 items-center self-start gap-2 text-sm text-gold underline underline-offset-4 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
              aria-label={`Learn more about ${p.title}`}
            >
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
