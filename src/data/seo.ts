import siteConfiguration from "../../.figma/make/site.json"
import type { Page } from "@/types/navigation"

type PageSeo = { title: string; description: string }

const DEFAULT_SEO: PageSeo = {
  title: siteConfiguration.title,
  description: siteConfiguration.description,
}

// Pages without an entry share the site-wide title and description.
const PAGE_SEO: Partial<Record<Page, PageSeo>> = {
  services: {
    title: "Our Services - La Table Ronde",
    description:
      "Discover our catering services, from live cooking stations to full end-to-end catering, tailored to create a seamless experience for every event across Lebanon.",
  },
  about: {
    title: "About Us - La Table Ronde",
    description:
      "La Table Ronde was established to elevate the catering experience for guests, combining exceptional food, live stations and thoughtful service to make every event memorable.",
  },
  gallery: {
    title: "Gallery - La Table Ronde",
    description:
      "Explore La Table Ronde through our gallery, showcasing our food, live catering stations, setups and memorable events.",
  },
  contact: {
    title: "Contact Us - La Table Ronde",
    description:
      "Planning an event? Get in touch with La Table Ronde to discuss your vision, catering needs and create an experience tailored to you.",
  },
}

export function getPageSeo(page: Page): PageSeo {
  return PAGE_SEO[page] ?? DEFAULT_SEO
}
