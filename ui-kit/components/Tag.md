# Tag

A story or category filter chip ("ALL STORY"). Set in uppercase 12.8px.

- **Inactive:** `neutral-variant-90` fill with `neutral-variant-30` text (6.3:1). The kit's inactive text, #85828a, was only 2.6:1, so this system uses the darker tone.
- **Active:** `brand-lavender` fill with `black` text (5.3:1). The near-black `neutral-10` would give only 4.3:1, which fails AA at this size.
- **You supply:** `children`, `active`, `onClick`. It renders a toggle button with `aria-pressed`.
