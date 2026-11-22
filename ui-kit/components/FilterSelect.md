# FilterSelect

The dropdown trigger used to filter project and story lists ("All ▾"): a white pill at rest, and `ui-cyan` when a filter is applied or the menu is open.

- **You supply:** `label`, `active`, `open` and `onClick`. The menu itself (listbox) is up to the consumer; the trigger sets `aria-haspopup` and `aria-expanded`.
