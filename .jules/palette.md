## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-02 - Default ARIA Labels for Dynamic Content
**Learning:** When visible text is dynamically removed (e.g., during loading), the element loses its accessible name unless an `aria-label` is provided.
**Action:** In component logic, fallback to a default `aria-label` (e.g., "Loading") if the visible text is removed and no explicit `aria-label` is provided by the consumer.
