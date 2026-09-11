import { IMG } from "@/data/images"
import GoldDivider from "@/components/ui/GoldDivider"
import PageBanner from "@/components/ui/PageBanner"
import IconExcellence from "@/components/icons/IconExcellence"
import IconHeritage from "@/components/icons/IconHeritage"
import IconPrecision from "@/components/icons/IconPrecision"
import IconPassion from "@/components/icons/IconPassion"

export default function AboutPage() {
  return (
    <div>
      <PageBanner title="About Us" subtitle="Who Are We" bgImage={IMG.about} />
      <div
        className="py-24 px-8 lg:px-16"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p
              className="font-display tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--gold)", fontSize: "0.75rem" }}
            >
              Our Story
            </p>
            <h2
              className="font-heading mb-5"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                lineHeight: 1.35,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              Born From a Passion
              <br />
              For Lebanese Hospitality
            </h2>
            <GoldDivider />
            <div
              className="font-body leading-loose space-y-5 mt-6"
              style={{
                color: "var(--charcoal)",
                fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              }}
            >
              <p>
                La Table Ronde was founded in 2024 with a singular vision: to
                elevate catering in Lebanon by blending the rich traditions of
                Lebanese cuisine with the excitement of live culinary theatre.
              </p>
              <p>
                We believe that food is the heart of every gathering, and that
                truly great catering goes beyond the plate. It is about the
                sizzle of the grill, the warmth of the fire, and the shared joy
                of a meal crafted right before your eyes. Every event we serve
                is a reflection of that belief.
              </p>
              <p>
                Rooted in Lebanon and driven by hospitality, our team brings
                together skilled chefs, gracious service staff, and meticulous
                event coordination to deliver experiences that guests remember
                long after the last plate is cleared.
              </p>
            </div>
          </div>
          <div className="relative" style={{ height: 540 }}>
            <img
              src={IMG.about}
              alt="Candlelit table arrangement"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute -bottom-5 -left-5 hidden md:block"
              style={{
                width: 100,
                height: 100,
                border: "2px solid var(--gold)",
                opacity: 0.4,
              }}
            />
          </div>
        </div>
      </div>

      <div className="py-24 px-8 lg:px-16" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="font-display tracking-[0.4em] uppercase mb-3"
              style={{ color: "var(--gold)", fontSize: "0.75rem" }}
            >
              What We Stand For
            </p>
            <h2
              className="font-heading"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <IconExcellence />,
                title: "Excellence",
                desc: "We hold every detail to the highest standard, from sourcing the finest ingredients to the presentation of every dish.",
              },
              {
                icon: <IconHeritage />,
                title: "Authenticity",
                desc: "Our menus draw on the depth of Lebanese culinary heritage, honouring tradition while welcoming contemporary flair.",
              },
              {
                icon: <IconPrecision />,
                title: "Precision",
                desc: "Every event is planned with meticulous care, coordinating chefs, staff, and logistics seamlessly from start to finish.",
              },
              {
                icon: <IconPassion />,
                title: "Passion",
                desc: "Every dish we prepare and every station we light is driven by a genuine love for food and hospitality, the ingredient that turns good catering into something truly memorable.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="p-7 flex flex-col items-start"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                }}
              >
                <div className="mb-5">{v.icon}</div>
                <h3
                  className="font-display tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--ink)", fontSize: "0.75rem" }}
                >
                  {v.title}
                </h3>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "var(--gold)",
                    marginBottom: 16,
                  }}
                />
                <p
                  className="font-body text-sm leading-loose"
                  style={{ color: "var(--charcoal)" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: 440 }}>
        <img
          src={IMG.chef}
          alt="Chef at live cooking station"
          className="w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,26,26,0.88) 40%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center px-12 md:px-20 lg:px-32">
          <div style={{ maxWidth: 520 }}>
            <p
              className="font-display tracking-[0.35em] uppercase mb-3"
              style={{ color: "var(--gold)", fontSize: "0.75rem" }}
            >
              Live. Crafted. Served.
            </p>
            <h2
              className="font-display tracking-[0.06em] uppercase mb-5"
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              }}
            >
              The Art of
              <br />
              Live Cooking
            </h2>
            <p
              className="font-body leading-loose"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              }}
            >
              Our live stations transform catering into theatre. Each fire lit,
              each cut made, in full view of your guests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
