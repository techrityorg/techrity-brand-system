# Button

The web UI's call-to-action: **primary** (`ui-cyan`, dark text) for the one thing a section asks for, such as *Donate*, *Sign Up*, *Apply Now* or *View Full Story*.

- **Variants:** `primary` (ui-cyan) · `outline` (black outline, e.g. *Shop*; fills brand purple on hover, because white on lavender is only 4.0:1) · `purple` (brand purple) · `ghost` (soft panel, e.g. *Make a Request →*) · `link` (text only)
- **Shapes:** `pill` (nav and header actions), `rounded` (8px; forms and dropdown triggers), `square` (full-width card CTAs)
- **Contrast:** text on `ui-cyan` is always `neutral-10` (11.4:1). White on cyan is only 1.5:1.
- **Content:** verb first, Title Case, as in the kit ("Make a Request", "View Full Story"). One primary per view.
- **You supply:** `children` label, an optional `icon` (`arrow-right`, `caret-down`, `cart`, `external`), and `href` to render a link.
