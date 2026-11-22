# Fonts

| Brand | Font | Status |
|-------|------|--------|
| Techrity (parent) | **Now** | Official typeface for brand, print and web UI. Open source under the [SIL Open Font License 1.1](https://openfontlicense.org) (© 2015 Alfredo Marco Pradil, Reserved Font Name "Now"), so it can be bundled and self-hosted. Add the official files as `otf/` and `web/` (WOFF2) folders here, with `OFL.txt`, as the Rootstock pattern does. Source: [Font Library](https://fontlibrary.org/en/font/now). |
| Techrity (parent) | Poppins | Working fallback, from [Google Fonts](https://fonts.google.com/specimen/Poppins) |
| Tech for Good | Anton, Source Code Pro | [Google Fonts](https://fonts.google.com/specimen/Anton) · [Google Fonts](https://fonts.google.com/specimen/Source+Code+Pro) |
| Made For Good | Manrope | [Google Fonts](https://fonts.google.com/specimen/Manrope) |
| Made For Good | Moderniz | Commercial. Get the licensed files before adding them. |

## Self-hosting Now on the web

Once the WOFF2 files are in `fonts/web/`, declare each weight under the single family name `Now`, so the `--techrity-font-sans` stack picks it up:

```css
@font-face { font-family: "Now"; src: url("web/Now-Regular.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Now"; src: url("web/Now-Medium.woff2")  format("woff2"); font-weight: 500; font-display: swap; }
@font-face { font-family: "Now"; src: url("web/Now-Bold.woff2")    format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "Now"; src: url("web/Now-Black.woff2")   format("woff2"); font-weight: 900; font-display: swap; }
```

The kit uses Semi-Bold (600), but Now has no 600 weight, so browsers use Bold (700) instead.
