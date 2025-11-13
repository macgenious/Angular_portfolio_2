# Frontend Enhancements Plan

## Scope & Assumptions

* Apply improvements to `arduino/`, `deepseek_api/`, `java/`, and `pokedex/` pages.

* Focus on HTML/CSS only; do not alter project JavaScript logic.

* Unify visual theme, fix broken asset references, and improve performance and accessibility.

## Cross‑Page Improvements

1. Consistent Branding & Theme

* Standardize CSS variables (colors, fonts) and header/footer look

* Replace CSS `@import` of Google Fonts with `<link>` tags + `preconnect` in HTML

* Add `display=swap` (already used) and ensure font fallbacks

1. Layout & Responsiveness

* Convert layouts to Flexbox/Grid where appropriate

* Add shared responsive breakpoints (≤768px, ≤480px)

* Improve spacing, alignment, and visual hierarchy

1. Accessibility (WCAG 2.1 AA)

* Use semantic landmarks (`header`, `nav`, `main`, `footer`) with `aria-label`s

* Add visible focus states for links/buttons

* Add “Skip to content” link for keyboard users

* Ensure sufficient color contrast and meaningful `alt` text

* Respect `prefers-reduced-motion` to reduce animations

1. Performance Optimization

* Lazy‑load images (`loading="lazy"`, `decoding="async"`)

* Fix broken asset paths to avoid 404s (`../images/*` → `../imgs/*`; cursor.css path)

* Move web font load to HTML head with `preconnect` to minimize blocking

* Ensure large images use responsive sizes where possible

1. Content & CTAs

* Improve typography (line‑height, font sizes, headings)

* Add clear, consistent CTA buttons (Back to Portfolio, View More Projects)

* Ensure consistent section headings and descriptions

## Page‑Specific Changes

* Arduino

  * Fix banner image path and add lazy loading

  * Update nav for accessibility; unify button styles

  * Add responsive grid to info/code sections

* Deepseek\_API

  * Optimize banner image (lazy, decoding)

  * Tidy code sample block styles; improve chat demo markup semantics

  * Responsive adjustments to demo container

* Java

  * Correct `cursor.css` path and banner handling

  * Improve project description typography and spacing

  * Add responsive behavior to two‑column layout

* Pokedex

  * Optimize banner image handling (lazy, decoding)

  * Improve code sample container and layout grid

  * Responsive refinements and CTA consistency

## Quality Assurance

* Test on mobile, tablet, desktop breakpoints

* Verify in Chrome, Firefox, Edge, Safari (where applicable)

* Check for broken links/assets; validate HTML/CSS (W3C)

* Manually review keyboard navigation and focus order

## Deliverables

* Updated HTML/CSS in all four project folders

* Document changes and any dependencies by adding a “Frontend Enhancements” section to `README.md` (no new external dependencies beyond Google Fonts preconnect)

## Notes Discovered During Audit

* Several pages reference `../images/grid-bg.png` which is absent; will switch to available `imgs/` assets

* Some pages reference `../main_page/styles/cursor.css`; correct path is likely `../styles/cursor.css`

* Script tags differ (`script.js` vs `main.js`); we will not modify JS logic but will avoid new JS changes

