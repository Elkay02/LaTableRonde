import { useState, useEffect, useRef, useCallback } from "react"
import { GALLERY_IMAGES } from "@/data/images"

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])

  const startTimer = useCallback(() => {
    if (reducedMotion) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % GALLERY_IMAGES.length),
      5000,
    )
  }, [reducedMotion])

  useEffect(() => {
    if (!paused) startTimer()
    else if (timerRef.current) clearInterval(timerRef.current)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, startTimer])

  useEffect(() => {
    const strip = stripRef.current
    const thumb = thumbRefs.current[current]
    if (!strip || !thumb) return
    strip.scrollTo({
      left: thumb.offsetLeft + thumb.offsetWidth / 2 - strip.offsetWidth / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    })
  }, [current, reducedMotion])

  const goTo = (i: number) => {
    setCurrent(i)
    startTimer()
  }
  const prev = () =>
    goTo((current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  const next = () => goTo((current + 1) % GALLERY_IMAGES.length)

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev()
    if (e.key === "ArrowRight") next()
  }
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const transitionDur = reducedMotion ? "0ms" : "400ms"

  return (
    <div
      className="py-4 px-4 md:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node))
          setPaused(false)
      }}
    >
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKey}
        className="relative flex items-center justify-center mx-auto outline-none"
        style={{ maxWidth: 940 }}
      >
        <button
          onClick={prev}
          aria-label="Previous image"
          className="gallery-arrow"
          style={{
            position: "relative",
            zIndex: 10,
            width: 52,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polyline
              points="17,5 9,14 17,23"
              stroke="var(--gold)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div style={{ flex: 1, maxWidth: 820, position: "relative" }}>
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: -12,
              left: -12,
              width: 44,
              height: 44,
              borderTop: "1.5px solid var(--gold)",
              borderLeft: "1.5px solid var(--gold)",
              opacity: 0.5,
              zIndex: 2,
            }}
          />
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              bottom: -12,
              right: -12,
              width: 44,
              height: 44,
              borderBottom: "1.5px solid var(--gold)",
              borderRight: "1.5px solid var(--gold)",
              opacity: 0.5,
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === current ? 1 : 0,
                  transition: `opacity ${transitionDur} ease`,
                  pointerEvents: i === current ? "auto" : "none",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          aria-label="Next image"
          className="gallery-arrow"
          style={{
            position: "relative",
            zIndex: 10,
            width: 52,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polyline
              points="11,5 19,14 11,23"
              stroke="var(--gold)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip — no counter */}
      <div className="mx-auto mt-6" style={{ maxWidth: 820 }}>
        <div
          ref={stripRef}
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "4px 2px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              ref={(el) => {
                thumbRefs.current[i] = el
              }}
              onClick={() => goTo(i)}
              style={{
                flexShrink: 0,
                width: 72,
                height: 50,
                borderRadius: 5,
                overflow: "hidden",
                padding: 0,
                border: "none",
                cursor: "pointer",
                outline:
                  i === current
                    ? "2px solid var(--gold)"
                    : "2px solid transparent",
                outlineOffset: 2,
                opacity: i === current ? 1 : 0.55,
                transition: "opacity 0.2s, outline 0.2s",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
