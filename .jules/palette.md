## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-12 - Fallback for Icon-Only Loading State
**Learning:** When `loadingText` is explicitly removed (e.g., set to `null`) for an icon-only loading state, the button can become inaccessible if no `aria-label` is provided.
**Action:** Automatically inject a fallback `aria-label="Loading"` when `isLoading` is true, `loadingText` is empty, and no other accessible name is present.
