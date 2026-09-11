import { IMG } from "@/data/images"
import GoldDivider from "@/components/ui/GoldDivider"
import PageBanner from "@/components/ui/PageBanner"
import GalleryCarousel from "@/components/carousels/GalleryCarousel"
import TestimonialsCarousel from "@/components/carousels/TestimonialsCarousel"

export default function GalleryPage() {
  return (
    <div>
      <PageBanner
        title="Gallery"
        subtitle="Our Highlights"
        bgImage={IMG.finedining}
      />
      <div
        className="py-20 px-8 lg:px-16 text-center"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading mb-5"
            style={{
              color: "var(--ink)",
              fontWeight: 400,
              lineHeight: 1.35,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            }}
          >
            Moments We Have Crafted
          </h2>
          <GoldDivider />
          <p
            className="font-body leading-loose mt-4 mx-auto"
            style={{
              color: "var(--charcoal)",
              maxWidth: 600,
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
            }}
          >
            A glimpse into the events, stations, and culinary experiences we
            have had the privilege of bringing to life. Each image tells the
            story of a moment transformed into a memory.
          </p>
        </div>
      </div>
      <div style={{ background: "var(--cream)", paddingBottom: "5rem" }}>
        <GalleryCarousel />
      </div>
      <TestimonialsCarousel />
    </div>
  )
}
