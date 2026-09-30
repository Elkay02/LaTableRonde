# La Table Ronde

React, Vite, and Tailwind CSS site for La Table Ronde.

## Source layout

- `src/App.tsx` renders the active page and shared layout.
- `src/hooks/usePageNavigation.ts` synchronizes the active page with the URL, browser history, and scroll reset.
- `src/pages/` contains Home, About, Services, Gallery, and Contact.
- `src/components/layout/` contains the shared navigation and footer.
- `src/components/ui/` contains page banners, dividers, and Instagram links.
- `src/components/sections/` contains the service pillars shared by Home and Services.
- `src/components/carousels/` contains the gallery and testimonial carousels, including their interaction and timer logic.
- `src/components/forms/` contains the inquiry form and reusable fields, including sending, success, and retry states.
- `src/services/inquiries.ts` submits inquiries to the Worker handler in `worker/inquiries.ts`.
- `worker/index.ts` routes API requests and serves the built site through the assets binding; `wrangler.jsonc` configures the existing `latableronde` Worker.
- `src/components/icons/` contains the original SVG icons.
- `src/data/` contains shared navigation labels, contact details, image URLs, service descriptions, and testimonials.
- `src/types/` contains shared navigation types.
- `src/index.css` owns fonts, theme values, global styles, and animations.

Page URLs are `/`, `/about`, `/services`, `/gallery`, and `/contact`. Navigation supports direct links, refresh, and the browser's Back and Forward buttons, including deployment under a base path. Edit shared content in `src/data/` and page-specific content in its page component.

Production hosting must serve `index.html` for page URLs (an SPA fallback/rewrite) so direct links and refresh work. Vite's development and preview servers provide this fallback automatically.

## Development

Use the Node and pnpm versions declared in `.mise.toml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
```

Figma Make provides its own running development server. Source edits appear in its preview automatically.

## Gallery photos

The gallery uses 30 local WebP photos in `src/assets/gallery/`, with smaller copies in `src/assets/gallery/thumbnails/`. Photo order and descriptions are defined in `src/data/images.ts`. The carousel loads the current and adjacent full-size photos, retaining visited slides for smooth transitions.

The full-resolution originals, including the two HEIC files, are preserved in `gallery-originals/`. This folder is ignored by Git and is not included in the production build; back it up separately. The WebP photos and thumbnails are the files to commit and deploy.

## Contact form email delivery

The form posts to `/api/inquiries`. The Cloudflare Worker sends all seven fields through the [Resend email API](https://resend.com/docs/api-reference/emails/send-email) to `hello@la-tableronde.com`. The visitor's address is set as Reply-To so replies from Gmail go to the visitor. No Cloudflare Email Routing, Cloudflare Email Sending, or FormSubmit activation is required.

### Setup

1. In Resend, add **la-tableronde.com** under Domains and enable **sending**. Add the exact DNS records Resend provides in Cloudflare and wait for Verified status. Keep the existing Google root MX, SPF, DKIM, and verification records. Resend's sending setup uses its own DKIM selector and a return-path subdomain (typically `send`) for SPF and bounce MX records. Do not enable Resend receiving or replace the root Google MX. A separate sender subdomain is optional; this setup uses the main domain.
2. Revoke any API key shared in chat or committed to source. Create a replacement Resend key with sending permission for this domain. Never put it in React code or a `VITE_` variable.
3. In **Workers & Pages > latableronde > Settings > Runtime variables and secrets**, add:

   | Name | Type | Value |
   | --- | --- | --- |
   | `RESEND_API_KEY` | Secret | Your replacement Resend API key |
   | `INQUIRY_FROM` | Text | `hello@la-tableronde.com` |
   | `INQUIRY_TO` | Text | `hello@la-tableronde.com` |

4. Deploy the updated repository with build command `npm run build` and deploy command `npx wrangler deploy`. Save/deploy the runtime settings too. Existing `CF_ACCOUNT_ID` and `CF_EMAIL_API_TOKEN` variables are no longer used and can be removed. The existing `latableronde` Worker and custom domain are retained; `keep_vars` preserves dashboard variables across deployments.
5. Submit an inquiry from the live `/contact` page. Confirm all fields arrive in Gmail (check spam) and that Reply targets the visitor. Resend's email logs show subsequent delivery or bounce events. Automated tests mock the provider and never send mail.

`onboarding@resend.dev` in Resend's starter example is a test sender with recipient restrictions. Production uses your verified `hello@la-tableronde.com` sender. A successful API response means Resend accepted the message, not guaranteed inbox delivery. Failed requests keep the entered values. A timeout after acceptance followed by a manual retry may produce a duplicate.

The endpoint validates fields, limits request size, checks origin, and uses a honeypot. These checks are basic bot filtering, not comprehensive spam protection. Configure a Cloudflare rate-limiting rule for POST `/api/inquiries` if needed to protect your sending quota.

### Local verification

Run `npm run typecheck`, `npm run test:inquiries`, and `npm run build`. Plain Vite/Figma previews do not execute the Worker. To run the backend locally, build and run `npx wrangler dev`. Put the three runtime variables in an ignored `.dev.vars` file; real credentials send real email.

`wrangler.jsonc` targets the Workers Static Assets deployment. It routes `/api` and `/api/*` before the SPA fallback, serves static assets directly, and preserves prerendered page URLs without trailing slashes.
