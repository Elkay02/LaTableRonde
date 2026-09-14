import usePageNavigation from "@/hooks/usePageNavigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import ServicesPage from "@/pages/ServicesPage"
import GalleryPage from "@/pages/GalleryPage"
import ContactPage from "@/pages/ContactPage"

export default function App() {
  const { page, navigate } = usePageNavigation()
  return (
    <div
      id="page-scroll"
      className="size-full overflow-y-auto"
      style={{ background: "var(--cream)" }}
    >
      <Navbar current={page} onNav={navigate} />
      <main>
        {page === "home" && <HomePage onNav={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "services" && <ServicesPage onNav={navigate} />}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer onNav={navigate} />
    </div>
  )
}
