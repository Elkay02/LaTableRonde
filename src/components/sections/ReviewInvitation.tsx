import ActionButton from "@/components/ui/ActionButton"
import { GOOGLE_REVIEW_URL } from "@/data/site"

export default function ReviewInvitation() {
  return (
    <section
      className="px-5 sm:px-8 py-12 md:py-16 text-center"
      style={{ background: "var(--gold)", color: "var(--ink)" }}
    >
      <h2
        className="font-heading mb-3"
        style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 400 }}
      >
        Share Your Experience
      </h2>
      <p className="font-body mb-6" style={{ color: "var(--ink)" }}>
        Joined us for an event? We would love to hear about it.
      </p>
      <ActionButton
        variant="dark"
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 sm:px-10 py-4"
      >
        Leave a Google Review
      </ActionButton>
    </section>
  )
}
