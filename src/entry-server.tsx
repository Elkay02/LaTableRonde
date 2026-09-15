import { renderToString } from "react-dom/server"
import App from "./App"
import type { Page } from "./types/navigation"

export default function render(page: Page) {
  return renderToString(<App initialPage={page} />)
}
