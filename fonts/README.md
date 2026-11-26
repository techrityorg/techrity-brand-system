# Fonts

| Brand | Font | Status |
|-------|------|--------|
| Techrity (parent) | **FF Mark Pro** (`"Mark Pro"`) | Official typeface for brand, print and web UI, replacing Now. Commercial FontFont typeface (© FontShop International / Monotype). **The font files are deliberately not in this public repo.** Declarations are in [`mark-pro.css`](mark-pro.css). |
| Techrity (parent) | Poppins | Fallback wherever Mark Pro isn't installed, from [Google Fonts](https://fonts.google.com/specimen/Poppins) |
| Tech for Good | Anton, Source Code Pro | [Google Fonts](https://fonts.google.com/specimen/Anton) · [Google Fonts](https://fonts.google.com/specimen/Source+Code+Pro) |
| Made For Good | Manrope | [Google Fonts](https://fonts.google.com/specimen/Manrope) |
| Made For Good | Moderniz | Commercial. Get the licensed files before adding them. |

## Using FF Mark Pro

Ten weights, each with an italic: Hairline 250 · Thin 275 · ExtraLight 300 · Light 350 · Regular 400 · Book 450 · Medium 500 · Bold 700 · Heavy 800 · Black 900. There is **no 600**, so use Medium (500) or Bold (700).

- **Desktop and print:** install the licensed OTF files from Techrity's own copy. Design tools list the family as **Mark Pro**.
- **Web pages:** load [`mark-pro.css`](mark-pro.css) before `design-tokens/techrity.css`:
  - Every face tries `local()` first, so machines with Mark Pro installed use it with nothing else needed.
  - To serve Mark Pro to all visitors, you need a FontFont **web** licence. Put that licence's WOFF2 files in `fonts/web/` on the web server, using the file names in `mark-pro.css`. The desktop OTFs aren't licensed for web embedding.
- **Never commit the font files here.** This repo is public. `.gitignore` blocks `.otf`, `.ttf`, `.woff` and `.woff2` files under `fonts/`, so they can't be added by accident.
- Without Mark Pro, the stack falls back to **Poppins**. Layouts were checked in both: Mark Pro runs slightly narrower, and nothing overflows.
