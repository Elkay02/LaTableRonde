import { useState, useEffect, useRef, useCallback } from "react"
import { GALLERY_IMAGES } from "@/data/images"

interface TouchPoint {
  x: number
  y: number
}

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState(
    () => new Set([0, 1, GALLERY_IMAGES.length - 1]),
  )
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStart = useRef<TouchPoint | null>(null)

  useEffect(() => {
    // Keep visited slides mounted for crossfades and preload adjacent photos.
    setLoadedSlides((loaded) => {
      const next = new Set(loaded)
      next.add(current)
      next.add((current + 1) % GALLERY_IMAGES.length)
      next.add((current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
      return next
    })
  }, [current])

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
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

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
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const diffX = touchStart.current.x - e.changedTouches[0].clientX
    const diffY = touchStart.current.y - e.changedTouches[0].clientY
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? next() : prev()
    }
    touchStart.current = null
  }

  const transitionDur = reducedMotion ? "0ms" : "400ms"

  return (
    <div className="gallery-carousel py-4 px-4 md:px-8">
      <div
        tabIndex={0}
        onKeyDown={handleKey}
        className="relative flex items-center justify-center mx-auto outline-none"
        style={{ maxWidth: 940 }}
      >
        <button
          onClick={prev}
          aria-label="Previous image"
          className="gallery-arrow image-carousel-arrow image-carousel-arrow--previous"
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

        <div
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: "var(--gallery-image-width)",
            position: "relative",
          }}
        >
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
            onTouchCancel={() => {
              touchStart.current = null
            }}
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
                {(loadedSlides.has(i) || i === current) && (
                  <img
                    src={img.src}
                    alt={img.alt}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          aria-label="Next image"
          className="gallery-arrow image-carousel-arrow image-carousel-arrow--next"
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
      <div
        className="mx-auto mt-6"
        style={{ maxWidth: "var(--gallery-image-width)" }}
      >
        <div
          ref={stripRef}
          style={{
            position: "relative",
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
                src={img.thumbnail}
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
