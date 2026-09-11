export default function PageBanner({
  title,
  subtitle,
  bgImage,
}: {
  title: string
  subtitle?: string
  bgImage?: string
}) {
  return (
    <div
      className="relative pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,26,0.55), rgba(26,26,26,0.75))",
        }}
      />
      <div className="relative text-center px-8">
        <p
          className="font-display tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--gold)", fontSize: "0.85rem" }}
        >
          La Table Ronde
        </p>
        <h1
          className="font-display tracking-[0.1em] uppercase mb-4"
          style={{ color: "#ffffff", fontSize: "clamp(2.2rem, 6vw, 3.5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <div className="flex items-center gap-3 justify-center mt-5">
            <div style={{ width: 50, height: 1, background: "var(--gold)" }} />
            <p
              className="font-heading italic"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              }}
            >
              {subtitle}
            </p>
            <div style={{ width: 50, height: 1, background: "var(--gold)" }} />
          </div>
        )}
      </div>
    </div>
  )
}
