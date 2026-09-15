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
- `src/services/inquiries.ts` submits inquiries through FormSubmit and defines the recipient address.
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

Inquiries are sent to `lucienkayrouz@gmail.com` using [FormSubmit's AJAX endpoint](https://formsubmit.co/ajax-documentation). All seven form fields are included, and Reply-To is set to the visitor's email address. No API key or backend server is needed.

Before using the form publicly:

1. Submit an inquiry from the running website.
2. Open the FormSubmit activation email in `lucienkayrouz@gmail.com` (check spam too) and confirm the form.
3. Submit another inquiry and confirm it reaches the inbox. Verify activation again when moving to your production domain.

[FormSubmit requires activation](https://formsubmit.co/help) before forwarding inquiries. The UI confirms acceptance by the service; inbox delivery depends on activation and the email provider. Failed or timed-out requests keep the entered values so the visitor can retry. Development checks mock the endpoint and do not send email.
