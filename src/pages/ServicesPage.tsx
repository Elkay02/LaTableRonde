import ActionButton from "@/components/ui/ActionButton"
import { LES_BUVEURS_INSTAGRAM_URL } from "@/data/site"
import { IMG } from "@/data/images"
import GoldDivider from "@/components/ui/GoldDivider"
import PageBanner from "@/components/ui/PageBanner"
import CocktailIcon from "@/components/icons/CocktailIcon"
import type { NavigationProps } from "@/types/navigation"

export default function ServicesPage({ onNav }: NavigationProps) {
  return (
    <div>
      <PageBanner
        title="Our Services"
        subtitle="What We Offer"
        bgImage={IMG.chef}
      />

      <div
        className="py-12 md:py-20 px-5 sm:px-8 lg:px-16 text-center"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-heading mb-5"
            style={{
              color: "var(--ink)",
              fontWeight: 400,
              lineHeight: 1.35,
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            }}
          >
            An Unmatched Culinary Experience
          </h2>
          <GoldDivider />
          <p
            className="font-body leading-loose mt-4 mx-auto"
            style={{
              color: "var(--charcoal)",
              maxWidth: 620,
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
            }}
          >
            From the first flame to the final plate, every element of your event
            is crafted with intention, delivered with grace, and experienced by
            your guests as something truly out of the ordinary.
          </p>
        </div>
      </div>

      {/* 01 Live Stations deep-dive */}
      <div
        id="live-stations"
        className="py-12 md:py-20 px-5 sm:px-8 lg:px-16"
        style={{ background: "var(--ink)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <p
              className="font-display tracking-[0.2em] uppercase mb-3"
              style={{
                color: "var(--gold)",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              01 Live Stations
            </p>
            <h2
              className="font-heading mb-5"
              style={{
                color: "#ffffff",
                fontWeight: 400,
                lineHeight: 1.35,
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              }}
            >
              An Experience at
              <br />
              Every Station
            </h2>
            <div
              style={{
                width: 50,
                height: 1,
                background: "var(--gold)",
                margin: "16px 0 24px",
              }}
            />
            <p
              className="font-body leading-loose mb-7"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              }}
            >
              Our live stations are more than food, they are theatre. Set up
              directly at your venue and operated by our skilled chefs, each
              station delivers the full experience right in front of your
              guests, cooking, carving, and serving live, transforming every
              moment into a lasting memory.
            </p>
            <p
              className="font-display tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--gold)", fontSize: "0.68rem" }}
            >
              Signature Stations
            </p>
            <ul className="space-y-3 mb-3">
              {[
                "Open-fire spit roaster",
                "Cast-iron grill",
                "Tandoor oven",
                "Artisanal oven",
                "Pasta bar",
                "Traditional saj",
                "Ice cream cart",
                "Soft serve counter",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-body"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--gold)",
                      flexShrink: 0,
                      display: "block",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="font-body italic"
              style={{
                color: "rgba(249,193,10,0.6)",
                fontSize: "0.9rem",
                paddingLeft: 42,
              }}
            >
              and more...
            </p>
          </div>
          <div className="responsive-photo relative h-[480px]">
            <img
              src={IMG.grill}
              alt="Live grilling station"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute -top-4 -right-4 hidden md:block"
              style={{
                width: 80,
                height: 80,
                border: "1.5px solid var(--gold)",
                opacity: 0.35,
              }}
            />
          </div>
        </div>
      </div>

      {/* 02 End-to-End Catering deep-dive */}
      <div
        id="end-to-end-catering"
        className="py-12 md:py-20 px-5 sm:px-8 lg:px-16"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="responsive-photo relative order-2 md:order-1 h-[480px]">
            <img
              src={IMG.finedining}
              alt="Elegant catering setup"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute -bottom-5 -left-5 hidden md:block"
              style={{
                width: 80,
                height: 80,
                border: "1.5px solid var(--gold)",
                opacity: 0.35,
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <p
              className="font-display tracking-[0.2em] uppercase mb-3"
              style={{
                color: "var(--gold)",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              02 End-to-End Catering
            </p>
            <h2
              className="font-heading mb-5"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                lineHeight: 1.35,
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              }}
            >
              A Complete Service,
              <br />
              Start to Finish
            </h2>
            <div
              style={{
                width: 50,
                height: 1,
                background: "var(--gold)",
                margin: "16px 0 24px",
              }}
            />
            <p
              className="font-body leading-loose mb-7"
              style={{
                color: "var(--charcoal)",
                fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              }}
            >
              We manage the complete catering journey, so you can focus entirely
              on your guests. From the first consultation to the final clean-up,
              we coordinate every element with precision and care.
            </p>
            <ul className="space-y-3">
              {[
                "Menu Design & Consultation",
                "Ingredient Sourcing & Procurement",
                "Kitchen Preparation & Cooking",
                "Equipment, Setup & Breakdown",
                "Service Staff Coordination",
                "Event Timeline Management",
                "Post-Event Clean-up",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-body"
                  style={{
                    color: "var(--charcoal)",
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--gold)",
                      flexShrink: 0,
                      display: "block",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bar catering partnership banner */}
      <div
        className="px-5 sm:px-8 lg:px-16 pb-0"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto" style={{ position: "relative" }}>
          <div
            className="relative px-5 sm:px-10 md:px-16 py-10"
            style={{ background: "var(--ink)", overflow: "visible" }}
          >
            {/* Bottom-right gold square: 4/5 inside, 1/5 outside */}
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
                width: 50,
                height: 50,
                border: "1.5px solid var(--gold)",
                opacity: 0.5,
              }}
            />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 md:-ml-3.5">
                <CocktailIcon />
              </div>
              <p
                className="font-body leading-loose"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                }}
              >
                We also provide{" "}
                <span
                  className="font-body"
                  style={{ color: "var(--gold)", fontWeight: 600 }}
                >
                  full bar catering services
                </span>{" "}
                in partnership with our sister brand{" "}
                <a
                  href={LES_BUVEURS_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body cursor-pointer underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                  style={{ color: "var(--gold)", fontWeight: 600 }}
                >
                  Les Buveurs
                </a>
                {", "}ensuring every aspect of your event, from the first toast
                to the last sip, is handled with the same care and expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events we cater for */}
      <div
        className="py-12 md:py-20 px-5 sm:px-8 lg:px-16"
        style={{
          background: "#ffffff",
          borderTop: "1px solid var(--border)",
          marginTop: "5rem",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="font-heading mb-4"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              }}
            >
              We Cater for Every Celebration
            </h2>
            <p
              className="font-body mx-auto"
              style={{
                color: "var(--charcoal)",
                maxWidth: 580,
                fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              }}
            >
              From an intimate garden gathering to a cherished wedding
              celebration, our team brings the same passion and precision to
              every table, for any occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {[
              {
                title: "Private Parties & Outdoor Gatherings",
                img: IMG.outdoor,
                desc: "Birthdays, anniversaries, family reunions, and casual outdoor feasts, brought to life with live stations and warm hospitality.",
              },
              {
                title: "Weddings & Engagements",
                img: IMG.wedding,
                desc: "Elegant, bespoke catering for your most cherished milestones, crafted with the detail and care that every special occasion deserves.",
              },
              {
                title: "Corporate Events",
                img: IMG.corporate,
                desc: "Professional catering for corporate dinners, team events, and product launches, seamlessly managed from start to finish.",
              },
            ].map((ev, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--cream)",
                }}
              >
                <div
                  className="overflow-hidden flex-shrink-0"
                  style={{ height: 220, background: "#1a1a1a" }}
                >
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ opacity: 0.85 }}
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3
                    className="font-display tracking-[0.1em] uppercase mb-3"
                    style={{
                      color: "var(--ink)",
                      fontSize: "0.75rem",
                      minHeight: "2.4rem",
                    }}
                  >
                    {ev.title}
                  </h3>
                  <div
                    style={{
                      width: 24,
                      height: 1,
                      background: "var(--gold)",
                      marginBottom: 14,
                    }}
                  />
                  <p
                    className="font-body text-sm leading-loose"
                    style={{ color: "var(--charcoal)" }}
                  >
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works — 4 steps */}
      <div
        className="py-12 md:py-20 px-5 sm:px-8 lg:px-16"
        style={{ background: "var(--ink)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h2
              className="font-heading mb-4"
              style={{
                color: "var(--gold)",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              }}
            >
              Working With Us
            </h2>
            <p
              className="font-body mx-auto"
              style={{
                color: "rgba(255,255,255,0.55)",
                maxWidth: 520,
                fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                lineHeight: 1.8,
              }}
            >
              We co-create your event with you, from the very first idea to the
              final detail, so that every choice reflects your vision and every
              moment feels entirely yours. Our journey together unfolds across
              four simple stages, each one bringing us closer to the event you
              have in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                num: "01",
                title: "Consult",
                desc: "We start with a conversation, understanding your vision, your event, and what you want your guests to experience.",
              },
              {
                num: "02",
                title: "Design",
                desc: "Together we build a bespoke menu and station plan, tailored to your occasion, your tastes, and your timeline.",
              },
              {
                num: "03",
                title: "Taste",
                desc: "Before your big day, we invite you to a private tasting at our premises so every detail of the menu is perfected.",
              },
              {
                num: "04",
                title: "Celebrate",
                desc: "Sit back, enjoy your day, and let us take care of everything from the first flame to the last plate.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="working-step px-5 sm:px-8 py-10 flex flex-col relative"
                style={{
                  borderBottom: "1px solid rgba(249,193,10,0.08)",
                }}
              >
                <span
                  className="font-display mb-2"
                  style={{
                    color: "rgba(249,193,10,0.2)",
                    fontSize: "3rem",
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-display tracking-[0.12em] uppercase mb-3"
                  style={{ color: "var(--gold)", fontSize: "1.05rem" }}
                >
                  {step.title}
                </h3>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(249,193,10,0.4)",
                    marginBottom: 14,
                  }}
                />
                <p
                  className="font-body text-sm leading-loose"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-12 md:py-16 px-5 sm:px-8 text-center"
        style={{
          background: "var(--cream)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          className="font-body italic text-base mb-6"
          style={{ color: "var(--charcoal)" }}
        >
          Ready to plan your event?
        </p>
        <ActionButton
          variant="gold"
          onClick={() => onNav("contact")}
          className="px-5 sm:px-12 py-4"
        >
          Request a Quote
        </ActionButton>
      </div>
    </div>
  )
}
