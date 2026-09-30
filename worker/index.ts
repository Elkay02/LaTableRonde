import handleInquiry, { type InquiryEnv } from "./inquiries"

interface Env extends InquiryEnv {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname
    if (pathname === "/api/inquiries") return handleInquiry({ request, env })
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return Response.json({ success: false, error: "Not found" }, {
        status: 404, headers: { "Cache-Control": "no-store" },
      })
    }
    return env.ASSETS.fetch(request)
  },
}
