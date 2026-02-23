## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-03 - Flexible Loading Indicators
**Learning:** Hardcoding the spinner position restricts design options, especially for directional actions (like "Next Step ->") where the spinner should naturally appear at the end.
**Action:** Expose a `loadingPosition` prop ('start' | 'end') to allow consumers to place the loading indicator where it makes semantic and visual sense.

## 2026-02-05 - State-Based Style Enforcement
**Learning:** UX states like "loading" or "disabled" require specific cursor feedback (`wait`, `not-allowed`) which is often missed by consumers or overridden by generic utility classes.
**Action:** Enforce critical state styles via inline styles that take precedence over user-provided classes/styles, while still allowing deliberate overrides if absolutely necessary.
