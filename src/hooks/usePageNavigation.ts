import { useCallback, useEffect, useState } from "react"
import type { Page } from "@/types/navigation"
import { PAGE_PATHS, SITE_ORIGIN } from "@/data/routes"

// Preserve the deployment prefix used by Figma Make or a subdirectory host.
const basePath = new URL(
  import.meta.env.BASE_URL,
  typeof window === "undefined" ? SITE_ORIGIN : window.location.origin,
).pathname.replace(/\/$/, "")

function getPagePath(page: Page) {
  return `${basePath}${PAGE_PATHS[page]}`
}

function readPage(): Page {
  const pathname = window.location.pathname.replace(/\/+$/, "")
  return (
    (Object.keys(PAGE_PATHS) as Page[]).find(
      (page) => getPagePath(page).replace(/\/+$/, "") === pathname,
    ) ?? "home"
  )
}

function scrollToTop() {
  document.getElementById("page-scroll")?.scrollTo({ top: 0 })
}

export default function usePageNavigation(initialPage?: Page) {
  const [page, setPage] = useState<Page>(() => initialPage ?? readPage())

  const navigate = useCallback((nextPage: Page) => {
    const path = getPagePath(nextPage)
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path)
    }
    setPage(nextPage)
    scrollToTop()
  }, [])

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    const handlePopState = () => {
      setPage(readPage())
      scrollToTop()
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  return { page, navigate }
}
