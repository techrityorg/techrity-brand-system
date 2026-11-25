# NavBar

The site header: the Techrity lavender lock-up, then nav links (About · Get Involved ▾ · Opportunities · Events · Blog), then **Shop** (outline + cart) and **Donate** (primary).

- **Links:** pass `links` as labels or `{ label, href }`. Give **Shop** and **Donate** real destinations with `shopHref` and `ctaHref`. The logo links to `homeHref` (default `/`).
- **Dropdowns:** `menus` maps a link label to its items, e.g. `{ "Get Involved": [{ label: "Volunteer", href: "/volunteer" }] }`. That label becomes a button with `aria-expanded` that opens a small menu.
- **Responsive:** the bar responds to its own width, not the window's.
  - Below 960px, the links and actions fold behind a menu button (`aria-expanded`, `aria-controls`) and stack full-width.
  - Below 1100px, the gaps tighten so the co-branded bar still fits.
  - This works the same in a page, a sidebar layout or a preview frame.
- **Co-brand:** on Tech for Good pages, pass `cobrandSrc` for the T4G mark. It sits after a hairline divider, following the family rule *Techrity first*.
- **Active link:** brand purple, with `aria-current="page"`. Hover is purple too.
- **Accessibility:** the logo's alt text is "Techrity home", and the menu button has a visually hidden label. Every control has a visible focus ring (`blue-40`), and transitions switch off for people who prefer reduced motion.
