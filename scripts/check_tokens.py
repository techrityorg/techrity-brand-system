"""Check every brand's design tokens before they ship.

Run from the repo root:  python3 scripts/check_tokens.py
Fails (exit 1) if:
  - a brand's CSS no longer matches what gen_tokens.py builds from its tokens.json
  - a brand is missing one of the six shared semantic roles in any theme
  - a colour, spacing or radius token has no usage note, or a type style has no sample or usage
  - a semantic text colour (ink, heading, muted, accent) is below WCAG AA 4.5:1 on its theme's surface
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_tokens import build_css  # noqa: E402

BRANDS = [
    ('design-tokens/techrity.tokens.json', 'design-tokens/techrity.css', 'techrity', 'Techrity'),
    ('brands/tech-for-good/design-tokens/tech-for-good.tokens.json',
     'brands/tech-for-good/design-tokens/tech-for-good.css', 't4g', 'Tech for Good'),
    ('brands/made-for-good/design-tokens/made-for-good.tokens.json',
     'brands/made-for-good/design-tokens/made-for-good.css', 'm4g', 'Made For Good'),
]
ROLES = ['surface', 'ink', 'heading', 'muted', 'accent', 'hairline']
TEXT_ROLES = ['ink', 'heading', 'muted', 'accent']


def luminance(hex_):
    h = hex_.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def is_hex(v):
    return isinstance(v, str) and v.startswith('#') and len(v) == 7


def main():
    errors = []
    for json_path, css_path, prefix, title in BRANDS:
        t = json.load(open(json_path))
        if open(css_path).read() != build_css(t, prefix, title, os.path.basename(json_path)):
            errors.append(f'{css_path}: out of date; rerun scripts/gen_tokens.py')
        themes = [x['id'] for x in t['color']['themes']]
        sem = {x['name']: x['value'] for x in t['color']['tokens'] if isinstance(x['value'], dict)}
        for role in ROLES:
            for th in themes:
                if th not in sem.get(role, {}):
                    errors.append(f'{title}: semantic role "{role}" missing in theme "{th}"')
        for th in themes:
            bg = sem.get('surface', {}).get(th)
            for role in TEXT_ROLES:
                fg = sem.get(role, {}).get(th)
                if is_hex(bg) and is_hex(fg) and contrast(fg, bg) < 4.5:
                    errors.append(f'{title} [{th}]: {role} {fg} on {bg} is {contrast(fg, bg):.2f}:1 (< 4.5)')
        for group in ('spacing', 'radius'):
            for x in t[group]['tokens']:
                if not x.get('usage'):
                    errors.append(f'{title}: {group} token "{x["name"]}" has no usage note')
        for x in t['color']['tokens']:
            if not x.get('usage'):
                errors.append(f'{title}: colour token "{x["name"]}" has no usage note')
        for g in t['type']['groups']:
            for s in g['styles']:
                if not s.get('sample') or not s.get('usage'):
                    errors.append(f'{title}: type style "{s["name"]}" needs a sample and usage')
    if errors:
        print('Token check failed:')
        for e in errors:
            print('  -', e)
        sys.exit(1)
    print(f'Token check passed for {len(BRANDS)} brands.')


if __name__ == '__main__':
    main()
