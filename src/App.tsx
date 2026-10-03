import { useEffect } from "react"
import usePageNavigation from "@/hooks/usePageNavigation"
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
  const { page, navigate, transition } = usePageNavigation(initialPage)

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
      <div
        key={page}
        className={`page-transition page-transition--${transition}`}
      >
        <main>
          {page === "home" && <HomePage onNav={navigate} />}
          {page === "about" && <AboutPage />}
          {page === "services" && <ServicesPage onNav={navigate} />}
          {page === "gallery" && <GalleryPage />}
          {page === "contact" && <ContactPage />}
        </main>
        <Footer onNav={navigate} />
      </div>
    </div>
  )
}
