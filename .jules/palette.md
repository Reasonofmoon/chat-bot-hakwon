## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-18 - Accessible Name on Dynamic Content
**Learning:** When a button's content is replaced dynamically (e.g., by a loading spinner with `loadingText={null}`), the element can lose its accessible name, confusing screen reader users.
**Action:** Always verify that interactive elements retain an accessible name (via `aria-label` or visible text) in all states, especially when content is replaced.
