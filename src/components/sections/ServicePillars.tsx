import { SERVICE_PILLARS } from "@/data/services"

type ServicePillarsProps = { cardClassName: string }

export default function ServicePillars({ cardClassName }: ServicePillarsProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-0">
        {SERVICE_PILLARS.map((p, i) => (
          <div
            key={i}
            className={cardClassName}
            style={{
              borderRight: i === 0 ? "1px solid var(--border)" : "none",
            }}
          >
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
          </div>
        ))}
      </div>
    </div>
  )
}
