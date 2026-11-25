/* @ds-bundle: {"format":4,"namespace":"Techrity","components":[{"name":"Button"},{"name":"Tag"},{"name":"FilterSelect"},{"name":"NavBar"},{"name":"PathwayCard"},{"name":"StoryCard"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  /* Icons: drawn to match the Phosphor "regular" set used in the UI kit (24px grid). */
  function Icon(props) {
    var paths = {
      'arrow-right': 'M40 128h176M144 56l72 72-72 72',
      'arrow-up-right': 'M64 192L192 64M88 64h104v104',
      'caret-down': 'M208 96l-80 80-80-80',
      'caret-up': 'M48 160l80-80 80 80',
      'cart': 'M24 40h24l32 120h112l24-88H62M96 208a12 12 0 1 0 0.1 0M184 208a12 12 0 1 0 0.1 0',
      'external': 'M216 104V40h-64M136 120l80-80M184 144v64a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V80a8 8 0 0 1 8-8h64',
      'x': 'M200 56L56 200M200 200L56 56',
      'list': 'M40 128h176M40 64h176M40 192h176'
    };
    return h('svg', { className: cx('tr-icon', props.className), viewBox: '0 0 256 256', width: props.size || 16, height: props.size || 16, 'aria-hidden': 'true', focusable: 'false' },
      h('path', { d: paths[props.name], fill: 'none', stroke: 'currentColor', strokeWidth: 20, strokeLinecap: 'round', strokeLinejoin: 'round' }));
  }

  function Button(props) {
    var variant = props.variant || 'primary', shape = props.shape || 'pill';
    var rest = Object.assign({}, props); delete rest.variant; delete rest.shape; delete rest.icon; delete rest.className; delete rest.children; delete rest.href;
    var kids = [h('span', { key: 'l' }, props.children)];
    if (props.icon) kids.push(h(Icon, { key: 'i', name: props.icon }));
    var cls = cx('tr-btn', 'tr-btn-' + variant, 'tr-shape-' + shape, props.className);
    return props.href ? h('a', Object.assign({ className: cls, href: props.href }, rest), kids)
                      : h('button', Object.assign({ type: 'button', className: cls }, rest), kids);
  }

  function Tag(props) {
    return h('button', { type: 'button', className: cx('tr-tag', props.active && 'is-active'), 'aria-pressed': !!props.active, onClick: props.onClick }, props.children);
  }

  function FilterSelect(props) {
    return h('button', { type: 'button', className: cx('tr-filter', props.active && 'is-active'), 'aria-haspopup': 'listbox', 'aria-expanded': !!props.open, onClick: props.onClick },
      h('span', null, props.label || 'All'), h(Icon, { name: props.open ? 'caret-up' : 'caret-down', size: 18 }));
  }

  /* links: strings or { label, href }. menus: { "Get Involved": [{ label, href }] } turns that link into a dropdown. */
  function NavBar(props) {
    var useState = React.useState;
    var mobileState = useState(false), mobileOpen = mobileState[0], setMobileOpen = mobileState[1];
    var menuState = useState(null), openMenu = menuState[0], setOpenMenu = menuState[1];
    var links = (props.links || ['About', 'Get Involved', 'Opportunities', 'Events', 'Blog']).map(function (l) { return typeof l === 'string' ? { label: l, href: '#' } : l; });
    var menus = props.menus || { 'Get Involved': [{ label: 'Volunteer', href: '#' }, { label: 'Mentor', href: '#' }, { label: 'Partner with us', href: '#' }] };
    var navId = props.id || 'tr-nav-menu';
    return h('div', { className: 'tr-nav-wrap' }, h('nav', { className: cx('tr-nav', mobileOpen && 'is-open'), 'aria-label': 'Main' },
      h('a', { className: 'tr-nav-brand', href: props.homeHref || '/' },
        h('img', { src: props.logoSrc, alt: 'Techrity home', height: 28 }),
        props.cobrandSrc ? h('span', { className: 'tr-nav-divider', 'aria-hidden': 'true' }) : null,
        props.cobrandSrc ? h('img', { src: props.cobrandSrc, alt: props.cobrandAlt || 'Tech for Good', height: 28 }) : null),
      h('button', { type: 'button', className: 'tr-nav-toggle', 'aria-expanded': mobileOpen, 'aria-controls': navId, onClick: function () { setMobileOpen(!mobileOpen); } },
        h(Icon, { name: mobileOpen ? 'x' : 'list', size: 24 }), h('span', { className: 'tr-sr-only' }, mobileOpen ? 'Close menu' : 'Open menu')),
      h('div', { className: 'tr-nav-panel', id: navId },
        h('ul', { className: 'tr-nav-links' }, links.map(function (l) {
          var items = menus[l.label], isActive = props.active === l.label;
          if (items) {
            var open = openMenu === l.label;
            return h('li', { key: l.label, className: 'tr-nav-item' },
              h('button', { type: 'button', className: cx('tr-nav-link', isActive && 'is-active'), 'aria-expanded': open, onClick: function () { setOpenMenu(open ? null : l.label); } },
                l.label, h(Icon, { name: open ? 'caret-up' : 'caret-down', size: 14 })),
              open ? h('ul', { className: 'tr-nav-menu' }, items.map(function (it) { return h('li', { key: it.label }, h('a', { href: it.href || '#' }, it.label)); })) : null);
          }
          return h('li', { key: l.label, className: 'tr-nav-item' }, h('a', { href: l.href || '#', className: cx('tr-nav-link', isActive && 'is-active'), 'aria-current': isActive ? 'page' : undefined }, l.label));
        })),
        h('div', { className: 'tr-nav-actions' },
          h(Button, { variant: 'outline', icon: 'cart', href: props.shopHref || '#' }, 'Shop'),
          h(Button, { variant: 'primary', href: props.ctaHref || '#' }, props.ctaLabel || 'Donate')))));
  }

  function PathwayCard(props) {
    return h('a', { className: cx('tr-pathway', 'tr-pathway-' + (props.tone || 'gray')), href: props.href || '#' },
      h('div', { className: 'tr-pathway-top' }, h('span', { className: 'tr-pathway-index' }, props.index || '01'), h(Icon, { name: 'arrow-up-right', size: 20 })),
      h('div', null, h('h3', { className: 'tr-pathway-title' }, props.title), h('p', { className: 'tr-pathway-desc' }, props.description)));
  }

  function StoryCard(props) {
    return h('article', { className: 'tr-story' },
      props.programme ? h('p', { className: 'tr-story-programme' }, props.programme) : null,
      props.imageSrc ? h('img', { className: 'tr-story-img', src: props.imageSrc, alt: props.imageAlt || '' }) : h('div', { className: 'tr-story-img tr-story-img-empty', 'aria-hidden': 'true' }),
      h('blockquote', { className: 'tr-story-quote' }, '“' + props.quote + '”'),
      props.impact ? h('p', { className: 'tr-story-impact' }, h('span', null, 'Impact: '), props.impact) : null,
      props.author ? h('p', { className: 'tr-story-author' }, props.author) : null,
      h(Button, { variant: 'primary', shape: 'square', className: 'tr-story-cta', href: props.href }, props.ctaLabel || 'View Full Story'));
  }

  window.Techrity = Object.assign(window.Techrity || {}, { Button: Button, Tag: Tag, FilterSelect: FilterSelect, NavBar: NavBar, PathwayCard: PathwayCard, StoryCard: StoryCard, Icon: Icon });
})();
