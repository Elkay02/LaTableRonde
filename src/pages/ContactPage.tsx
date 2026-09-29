import ActionButton from "@/components/ui/ActionButton"
import ReviewInvitation from "@/components/sections/ReviewInvitation"
import { IMG } from "@/data/images"
import { CONTACT } from "@/data/site"
import PageBanner from "@/components/ui/PageBanner"
import InstagramIcon from "@/components/icons/InstagramIcon"
import InstagramLink from "@/components/ui/InstagramLink"
import InquiryForm from "@/components/forms/InquiryForm"
import WhatsAppLink from "@/components/ui/WhatsAppLink"
import WhatsAppIcon from "@/components/icons/WhatsAppIcon"
import LocationIcon from "@/components/icons/LocationIcon"

export default function ContactPage() {
  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="We Would Love to Hear From You"
        bgImage={IMG.contactBanner}
      />

      <div
        className="py-14 md:py-24 px-5 sm:px-8 lg:px-16"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p
                className="font-display tracking-[0.3em] uppercase mb-3"
                style={{
                  color: "var(--gold)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Reach Us
              </p>
              <h2
                className="font-heading mb-4"
                style={{
                  color: "var(--ink)",
                  fontWeight: 400,
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  lineHeight: 1.35,
                }}
              >
                Let's Create Something
                <br />
                Memorable
              </h2>
              <div
                style={{ width: 40, height: 1, background: "var(--gold)" }}
              />
            </div>
            {[
              {
                icon: <WhatsAppIcon />,
                label: "Phone / WhatsApp",
                whatsapp: true,
                value: CONTACT.phone,
                href: null,
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email",
                value: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
              },
              {
                icon: <LocationIcon />,
                label: "Location",
                value: CONTACT.location,
                href: CONTACT.mapsUrl,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p
                    className="font-display tracking-[0.18em] uppercase mb-1"
                    style={{ color: "var(--charcoal)", fontSize: "0.65rem" }}
                  >
                    {item.label}
                  </p>
                  {item.whatsapp ? (
                    <WhatsAppLink
                      showIcon={false}
                      className="font-body text-sm"
                      style={{ color: "var(--ink)" }}
                    />
                  ) : item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href === CONTACT.mapsUrl ? "_blank" : undefined
                      }
                      rel={
                        item.href === CONTACT.mapsUrl
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-body text-sm transition-opacity duration-200 hover:opacity-70"
                      style={{
                        color: "var(--ink)",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="font-body text-sm"
                      style={{ color: "var(--ink)" }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div>
              <p
                className="font-display tracking-[0.18em] uppercase mb-4"
                style={{ color: "var(--charcoal)", fontSize: "0.65rem" }}
              >
                Follow Us
              </p>
              <InstagramLink
                className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
                style={{ cursor: "pointer" }}
              >
                <InstagramIcon size={18} />
                <span
                  className="font-display tracking-[0.18em] uppercase"
                  style={{
                    color: "var(--ink)",
                    fontSize: "0.65rem",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    fontWeight: 600,
                  }}
                >
                  @latableronde.lb
                </span>
              </InstagramLink>
            </div>
          </div>

          <div className="md:col-span-3">
            <InquiryForm />
          </div>
        </div>
      </div>

      <ReviewInvitation />

      {/* Join Our Team */}
      <div
        className="px-5 sm:px-8 lg:px-16 py-10 md:py-14"
        style={{ background: "#ffffff", borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2
              className="font-heading mb-4"
              style={{
                color: "var(--gold)",
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              }}
            >
              Join Our Team
            </h2>
            <p
              className="font-body leading-loose"
              style={{
                color: "var(--charcoal)",
                maxWidth: 520,
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              }}
            >
              Whether you are a seasoned chef, a hospitality professional, or
              someone who simply loves great food and great service, we would
              love to hear from you.
            </p>
          </div>
          <div className="flex-shrink-0">
            <ActionButton
              variant="gold"
              href={`mailto:${CONTACT.email}?subject=CV Submission — La Table Ronde`}
              className="inline-block px-5 sm:px-10 py-4"
              style={{
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Submit Your CV
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}
