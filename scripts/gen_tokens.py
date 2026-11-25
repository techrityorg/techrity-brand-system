"""Generate prefixed repo token JSON + CSS from a Claude Design System tokens.json.

Usage:
  python3 gen_tokens.py <source tokens.json> <repo tokens.json> <out css> <prefix> <title>

The source is the tokens.json exported from the brand's Claude Design System.
The repo JSON keeps its own header (brand, prefix, parent) and gets the source's
colour, type, spacing, radius and meta; the CSS is rebuilt from it.
"""
import json
import sys


def build_css(a, P, title, json_name):
    def var(name):
        # Avoid --t4g-t4g-dark when a token already carries the brand prefix.
        return f'--{name}' if name.startswith(P + '-') else f'--{P}-{name}'

    def cls(name):
        return name if name.startswith(P + '-') else f'{P}-{name}'

    th = [t['id'] for t in a['color']['themes']]
    L = [f'/* {title} design tokens: generated from {json_name}. '
         f'Variables are prefixed --{P}- so parent and child brands never collide. */', '']
    for i, t in enumerate(th):
        L.append((f':root, [data-{P}-theme="{t}"]' if i == 0 else f'[data-{P}-theme="{t}"]') + ' {')
        for x in a['color']['tokens']:
            v = x['value']
            if isinstance(v, dict):
                if t in v:
                    L.append(f'  {var(x["name"])}: {v[t]};')
            elif i == 0:
                L.append(f'  {var(x["name"])}: {v};')
        L += ['}', '']
    L.append(':root {')
    for k, v in a['type']['families'].items():
        L.append(f'  --{P}-font-{k}: {v};')
    for f in ('spacing', 'radius'):
        for x in a[f]['tokens']:
            L.append(f'  {var(x["name"])}: {x["value"]};')
    bps = a.get('meta', {}).get('breakpoints')
    if bps:
        L.append('  /* Breakpoints (reference values; CSS variables cannot be used inside @media). */')
        for b in bps:
            L.append(f'  --{P}-bp-{b["name"]}: {b["width"]}px;')
    L += ['}', '']
    for g in a['type']['groups']:
        fam = g.get('family', next(iter(a['type']['families'])))
        for s in g['styles']:
            ls = f' letter-spacing: {s["letterSpacing"]};' if s.get('letterSpacing') else ''
            tt = f' text-transform: {s["textTransform"]};' if s.get('textTransform') else ''
            L.append(f'.{cls(s["name"])} {{ font-family: var(--{P}-font-{s.get("family", fam)}); '
                     f'font-size: {s["fontSize"]}; line-height: {s["lineHeight"]}; '
                     f'font-weight: {s["fontWeight"]};{ls}{tt} }}')
    mob = [g for g in a['type']['groups'] if g['name'].endswith('(mobile)')]
    tablet = next((b['width'] for b in (bps or []) if b['name'] == 'tablet'), None)
    if mob and tablet:
        L += ['', f'/* Below the {tablet}px tablet breakpoint, desktop heading classes take the mobile sizes. */',
              f'@media (max-width: {tablet - 1}px) {{']
        for s in mob[0]['styles']:
            base = cls(s['name'].replace('-mobile', ''))
            L.append(f'  .{base} {{ font-size: {s["fontSize"]}; line-height: {s["lineHeight"]}; }}')
        L.append('}')
    return '\n'.join(L) + '\n'


def main():
    src, repo_json, out_css, P, title = sys.argv[1:6]
    a = json.load(open(src))
    old = json.load(open(repo_json))
    out = {k: old[k] for k in ('$schema-note', 'brand', 'prefix', 'parent', 'name')}
    out['version'] = old.get('version', 1) + 1
    for k in ('meta', 'color', 'type', 'spacing', 'radius'):
        if k in a:
            out[k] = a[k]
    with open(repo_json, 'w') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write('\n')
    css = build_css(a, P, title, repo_json.split('/')[-1])
    open(out_css, 'w').write(css)
    print(out_css, sum(l.startswith('  --') for l in css.splitlines()), 'vars')


if __name__ == '__main__':
    main()
