import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type { Page } from "@/types/navigation"

import { PAGE_PATHS, SITE_ORIGIN } from "@/data/routes"

// The previous page fades out while the new one fades in slightly behind it.
export const PAGE_FADE_OUT_MS = 1000
export const PAGE_FADE_IN_MS = 1100
export const PAGE_FADE_IN_DELAY_MS = 450
const PAGE_TRANSITION_MS = Math.max(
  PAGE_FADE_OUT_MS,
  PAGE_FADE_IN_DELAY_MS + PAGE_FADE_IN_MS,
)

type OutgoingPage = { page: Page; scrollTop: number }

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
  const [outgoing, setOutgoing] = useState<OutgoingPage | null>(null)
  const outgoingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const changeLocation = useCallback(
    (next: typeof location) => {
      if (next.page === location.page) {
        setLocation(next)
        return
      }

      if (outgoingTimer.current !== null) clearTimeout(outgoingTimer.current)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setOutgoing(null)
        setLocation(next)
        return
      }

      // Keep the previous page on top, frozen at its scroll position, while it
      // fades out and the destination fades in underneath.
      setOutgoing({
        page: location.page,
        scrollTop: document.getElementById("page-scroll")?.scrollTop ?? 0,
      })
      setLocation(next)
      outgoingTimer.current = setTimeout(() => {
        setOutgoing(null)
        outgoingTimer.current = null
      }, PAGE_TRANSITION_MS)
    },
    [location.page],
  )

  useEffect(
    () => () => {
      if (outgoingTimer.current !== null) clearTimeout(outgoingTimer.current)
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

  return { page: location.page, outgoing, navigate }
}
