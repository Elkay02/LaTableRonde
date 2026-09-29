import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type { Page } from "@/types/navigation"

import { PAGE_PATHS, SITE_ORIGIN } from "@/data/routes"

// Preserve the deployment prefix used by Figma Make or a subdirectory host.

const basePath = new URL(
  import.meta.env.BASE_URL,

  typeof window === "undefined" ? SITE_ORIGIN : window.location.origin,
).pathname.replace(/\/$/, "")

export function getPagePath(page: Page) {
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

function scrollToSection(section: string) {
  const target = section ? document.getElementById(section) : null

  if (target) {
    target.scrollIntoView({ block: "start", behavior: "instant" })
  } else {
    document
      .getElementById("page-scroll")
      ?.scrollTo({ top: 0, behavior: "instant" })
  }
}

export default function usePageNavigation(initialPage?: Page) {
  const [location, setLocation] = useState(() => ({
    page: initialPage ?? readPage(),

    section: typeof window === "undefined" ? "" : window.location.hash.slice(1),
  }))
  const [transition, setTransition] = useState<"idle" | "leaving" | "entering">(
    "idle",
  )
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const changeLocation = useCallback(
    (next: typeof location) => {
      if (exitTimer.current !== null) clearTimeout(exitTimer.current)

      if (
        next.page === location.page ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTransition("idle")
        setLocation(next)
        return
      }

      // Keep the outgoing page and its scroll position until it is fully faded.
      setTransition("leaving")
      exitTimer.current = setTimeout(() => {
        setLocation(next)
        setTransition("entering")
        exitTimer.current = null
      }, 320)
    },
    [location.page],
  )

  useEffect(
    () => () => {
      if (exitTimer.current !== null) clearTimeout(exitTimer.current)
    },
    [],
  )

  const navigate = useCallback(
    (nextPage: Page, section = "") => {
      const path = `${getPagePath(nextPage)}${section ? `#${section}` : ""}`

      if (`${window.location.pathname}${window.location.hash}` !== path) {
        window.history.pushState(null, "", path)
      }

      changeLocation({ page: nextPage, section })
    },
    [changeLocation],
  )

  // Wait until React has mounted the destination before finding its section.

  useLayoutEffect(() => {
    scrollToSection(location.section)
  }, [location])

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = "manual"

    const handlePopState = () => {
      changeLocation({
        page: readPage(),
        section: window.location.hash.slice(1),
      })
    }

    window.addEventListener("popstate", handlePopState)

    window.addEventListener("hashchange", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)

      window.removeEventListener("hashchange", handlePopState)

      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [changeLocation])

  return { page: location.page, navigate, transition }
}
