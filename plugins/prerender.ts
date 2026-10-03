import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build, type Plugin, type ResolvedConfig } from "vite"
import react from "@vitejs/plugin-react"
import { PAGE_PATHS, SITE_ORIGIN } from "../src/data/routes"
import { getPageSeo } from "../src/data/seo"
import type { Page } from "../src/types/navigation"

/** Render the existing React pages at build time; no production server needed. */
export default function prerender(): Plugin {
  let config: ResolvedConfig

  return {
    name: "prerender-pages",
    apply: "build",
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      if (config.build.ssr) return

      const outDir = path.resolve(config.root, config.build.outDir)
      const renderDir = path.resolve(config.root, ".tmp-seo-render")
      const template = await readFile(path.join(outDir, "index.html"), "utf8")
      const outlet = '<div id="root"></div>'
      if (!template.includes(outlet)) {
        throw new Error("Missing React root for prerendering")
      }

      // A separate SSR bundle resolves imported images to the same asset URLs
      // as the client build. Keep this build-only module outside the deploy dir.
      await build({
        configFile: false,
        root: config.root,
        base: config.base,
        mode: config.mode,
        plugins: [react()],
        resolve: { alias: config.resolve.alias },
        build: {
          ssr: path.resolve(config.root, "src/entry-server.tsx"),
          outDir: renderDir,
          emptyOutDir: false,
          copyPublicDir: false,
          minify: false,
          assetsDir: config.build.assetsDir,
          rollupOptions: { output: { entryFileNames: "renderer.mjs" } },
        },
      })

      const { default: render } = await import(
        `${pathToFileURL(path.join(renderDir, "renderer.mjs")).href}?t=${Date.now()}`
      ) as { default: (page: Page) => string }

      for (const [page, route] of Object.entries(PAGE_PATHS)) {
        // Cloudflare Pages and Vite serve /about.html at the clean URL /about.
        const fileName = route === "/" ? "index.html" : `${route.slice(1)}.html`
        await writeFile(
          path.join(outDir, fileName),
          withPageHead(template, page as Page, route).replace(
            outlet,
            () => `<div id="root">${render(page as Page)}</div>`,
          ),
        )
      }
      config.logger.info(`Prerendered ${Object.keys(PAGE_PATHS).length} pages.`)
    },
  }
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/** Give each prerendered page its own title, description and canonical URL. */
function withPageHead(template: string, page: Page, route: string) {
  const { title, description } = getPageSeo(page)
  const url = `${SITE_ORIGIN}${route}`
  const setMeta = (html: string, attribute: string, value: string) =>
    html.replace(
      new RegExp(`(<meta ${attribute} content=")[^"]*(")`),
      (_, start: string, end: string) => `${start}${escapeAttribute(value)}${end}`,
    )

  let html = template.replace(
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeAttribute(title)}</title>`,
  )
  html = setMeta(html, 'name="description"', description)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  return html.replace(
    "</head>",
    () =>
      `<link rel="canonical" href="${url}">\n<meta property="og:url" content="${url}">\n</head>`,
  )
}
