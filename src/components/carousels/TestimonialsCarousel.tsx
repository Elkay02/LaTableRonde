import { useState, useEffect, useRef, useCallback } from "react"
import { TESTIMONIALS } from "@/data/testimonials"
import GoldDivider from "@/components/ui/GoldDivider"

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [fade, setFade] = useState(true)

  const goTo = useCallback((i: number) => {
    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current)
    }
    setFade(false)
    transitionTimerRef.current = setTimeout(() => {
      setCurrent(i)
      setFade(true)
      transitionTimerRef.current = null
    }, 260)
  }, [])

  const next = useCallback(
    () => goTo((current + 1) % TESTIMONIALS.length),
    [current, goTo],
  )
  const prev = () =>
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => {
      clearInterval(timer)
    }
  }, [next])

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <div
      className="py-20 px-8 lg:px-16"
      style={{ background: "#ffffff", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-heading"
            style={{
              color: "var(--ink)",
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
            }}
          >
            Memories We Have Forged
          </h2>
          <GoldDivider />
        </div>

        <div className="relative flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="gallery-arrow flex-shrink-0 max-md:left-0 max-md:z-10"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polyline
                points="17,5 9,14 17,23"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="flex-1 text-center px-4 md:px-10"
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.26s ease",
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="font-heading mb-4"
              style={{
                color: "var(--gold)",
                fontSize: "5rem",
                lineHeight: 0.8,
                fontWeight: 700,
                fontStyle: "normal",
              }}
            >
              &ldquo;
            </div>
            <p
              className="font-heading italic mb-6 leading-loose mx-auto"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                maxWidth: 640,
                fontWeight: 400,
              }}
            >
              {t.quote}
            </p>
            <div
              style={{
                width: 32,
                height: 1,
                background: "var(--gold)",
                margin: "0 auto 16px",
              }}
            />
            <p
              className="font-display tracking-[0.2em] uppercase"
              style={{ color: "var(--ink)", fontSize: "0.72rem" }}
            >
              {t.name}
            </p>
            <p
              className="font-body mt-1"
              style={{ color: "var(--muted)", fontSize: "0.8rem" }}
            >
              {t.event}
            </p>
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="gallery-arrow flex-shrink-0 max-md:right-0 max-md:z-10"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <polyline
                points="11,5 19,14 11,23"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? "var(--gold)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
