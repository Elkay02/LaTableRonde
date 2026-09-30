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

The form posts to `/api/inquiries`, a Cloudflare Worker handler that calls the [Cloudflare Email Service REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/). All seven fields are included in a plain-text email, with the visitor's email as Reply-To. FormSubmit and its activation link are no longer used. The public contact address remains `hello@la-tableronde.com`; the receiving inbox is configured separately.

The live site is a **Workers Static Assets** deployment, not Cloudflare Pages. Its former assets-only deployment cannot accept runtime variables or bindings. Deploying `worker/index.ts` alongside `dist` using `wrangler.jsonc` enables the runtime needed by the form. The “Workers 0” card in the dashboard describes connected Workers, not whether this project is a Worker.

### Deploy the Worker code

Commit and push these changes to the connected repository. In **latableronde → Settings → Builds**, use build command `npm run build` and deploy command `npx wrangler deploy` from the repository root. Remove any old deploy command that uploads only `dist` or uses `wrangler pages deploy`. The config targets the existing Worker name `latableronde`; retain its existing custom domain in the dashboard. No DNS migration is required.

After the deployment finishes, **Settings → Runtime variables and secrets** should allow adding configuration. The endpoint will return a configuration error until the email variables below are set. Static website pages continue to work.

### Cloudflare setup (required before delivery works)

1. **Preserve Google Workspace:** `hello@la-tableronde.com` is an existing Gmail inbox. Keep the root `smtp.google.com` MX record, Google SPF/DKIM, and Google verification records. Do not enable Cloudflare Email Routing on the root domain or remove conflicting Google records. For a separate sender, configure Email Routing on an unused subdomain such as `forms.la-tableronde.com` using [Cloudflare's subdomain settings](https://developers.cloudflare.com/email-service/configuration/subdomains/). Check that all proposed mail records belong to that subdomain; if the dashboard requires changing root MX records or upgrading, stop and resolve that account setup before continuing. Subdomain setup has not been verified in this account.
2. Add and verify `hello@la-tableronde.com` (or your preferred real inbox) under **Email Routing → Destination Addresses**. Sending to verified destinations through the API is [free on all plans](https://developers.cloudflare.com/email-service/platform/pricing/), including when only Email Routing is configured. This does not require forwarding the root domain to Cloudflare. Do not enable paid arbitrary-recipient sending for this form.
3. Create an API token scoped to this account with **Email Sending: Edit** permission.
4. After deploying the Worker code, open **Workers & Pages → latableronde → Settings → Runtime variables and secrets**, and add these for **Production**:

   | Name | Type | Value |
   | --- | --- | --- |
   | `CF_ACCOUNT_ID` | Text | Your Cloudflare account ID (not zone ID) |
   | `CF_EMAIL_API_TOKEN` | Secret | The token from step 3 |
   | `INQUIRY_FROM` | Text | `inquiries@forms.la-tableronde.com`, once that sender subdomain is configured |
   | `INQUIRY_TO` | Text | `hello@la-tableronde.com`, once verified as a destination |

   Never prefix these with `VITE_` or commit credentials. Preview deployments need separate configuration if you want them to send email; leaving them unset disables delivery there.
5. Save and deploy the runtime configuration. `keep_vars` in `wrangler.jsonc` preserves dashboard variables on subsequent deployments; credentials must stay out of source control. The assets-only warning should no longer appear after deploying the Worker code.
6. Submit a real inquiry from the deployed `/contact` page. Check the inbox and spam folder, all seven fields, and that Reply addresses the visitor. This manual delivery check is required; automated tests mock Cloudflare and do not send emails.

The endpoint validates fields, bounds the request body, checks the browser origin, and includes a honeypot for basic bot filtering. For protection against repeated automated requests, configure a Cloudflare rate-limiting rule for POST `/api/inquiries` on the production hostname. Origin checks and the honeypot alone are not comprehensive spam prevention.

Success means Cloudflare reports the recipient delivered or queued. A bounce, failed API response, missing configuration, or timeout produces an error and preserves the visitor's entries. Queued email may still fail later; monitor Cloudflare email logs. A timeout can occur after acceptance, so retrying can result in a duplicate.

### Local verification

Run `npm run typecheck`, `npm run test:inquiries`, and `npm run build`. Plain Vite/Figma previews do not execute the Worker, so email submission there will show the retry/email fallback rather than pretend to succeed. To exercise the backend locally, build first and use `npx wrangler dev` from the repository root. Put the four server variables in a local `.dev.vars` file (ignored by Git). Using real credentials sends real email.

`wrangler.jsonc` routes `/api` and `/api/*` to the Worker before the SPA fallback. Static assets are served directly, and prerendered page URLs retain their no-trailing-slash format. The router also delegates non-API requests to the assets binding if invoked.
