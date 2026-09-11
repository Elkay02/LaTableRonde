# La Table Ronde

React, Vite, and Tailwind CSS site for La Table Ronde.

## Source layout

- `src/App.tsx` owns the active page and scroll reset on navigation.
- `src/pages/` contains Home, About, Services, Gallery, and Contact.
- `src/components/layout/` contains the shared navigation and footer.
- `src/components/ui/` contains page banners, dividers, and Instagram links.
- `src/components/sections/` contains the service pillars shared by Home and Services.
- `src/components/carousels/` contains the gallery and testimonial carousels, including their interaction and timer logic.
- `src/components/forms/` contains the inquiry form and reusable fields. Form state stays inside `InquiryForm`; submission displays the existing local confirmation.
- `src/components/icons/` contains the original SVG icons.
- `src/data/` contains shared navigation labels, contact details, image URLs, service descriptions, and testimonials.
- `src/types/` contains shared navigation types.
- `src/index.css` owns fonts, theme values, global styles, and animations.

Pages use the existing state-based navigation. Edit shared content in `src/data/` and page-specific content in its page component.

## Development

Use the Node and pnpm versions declared in `.mise.toml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
```

Figma Make provides its own running development server. Source edits appear in its preview automatically.
