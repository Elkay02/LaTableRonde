import { useEffect } from "react"
import usePageNavigation, {
  PAGE_FADE_IN_DELAY_MS,
  PAGE_FADE_IN_MS,
  PAGE_FADE_OUT_MS,
} from "@/hooks/usePageNavigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import ServicesPage from "@/pages/ServicesPage"
import GalleryPage from "@/pages/GalleryPage"
import ContactPage from "@/pages/ContactPage"
import type { Page } from "@/types/navigation"
import { getPageSeo } from "@/data/seo"

export default function App({ initialPage }: { initialPage?: Page }) {
  const { page, outgoing, navigate } = usePageNavigation(initialPage)
  // While a page change crossfades, the previous page stays mounted on top.
  const visiblePages =
    outgoing && outgoing.page !== page ? [page, outgoing.page] : [page]

  useEffect(() => {
    const { title, description } = getPageSeo(page)
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description)
  }, [page])

  return (
    <div
      id="page-scroll"
      className="size-full overflow-y-auto"
      style={{ background: "var(--cream)" }}
    >
      <Navbar current={page} onNav={navigate} />
      {visiblePages.map((shownPage) => {
        const leaving = shownPage !== page
        const transition = !outgoing ? "" : leaving ? "leaving" : "entering"

        return (
          <div
            key={shownPage}
            className={`page-transition${transition ? ` page-transition--${transition}` : ""}`}
            style={
              !outgoing
                ? undefined
                : leaving
                  ? {
                      top: -outgoing.scrollTop,
                      minHeight: `calc(100vh + ${outgoing.scrollTop}px)`,
                      animationDuration: `${PAGE_FADE_OUT_MS}ms`,
                    }
                  : {
                      animationDuration: `${PAGE_FADE_IN_MS}ms`,
                      animationDelay: `${PAGE_FADE_IN_DELAY_MS}ms`,
                    }
            }
            inert={leaving}
            aria-hidden={leaving || undefined}
          >
            <main>
              {shownPage === "home" && <HomePage onNav={navigate} />}
              {shownPage === "about" && <AboutPage />}
              {shownPage === "services" && <ServicesPage onNav={navigate} />}
              {shownPage === "gallery" && <GalleryPage />}
              {shownPage === "contact" && <ContactPage />}
            </main>
            <Footer onNav={navigate} />
          </div>
        )
      })}
    </div>
  )
}
