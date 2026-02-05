## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-03 - Accessible Icon-Only Loading
**Learning:** Removing text for icon-only loading states can leave buttons with no accessible name if `aria-label` isn't provided.
**Action:** Provide a fallback visually-hidden "Loading" label when `loadingText` is null to ensure screen readers announce the state.

## 2026-02-05 - Logical Properties & Alignment
**Learning:** Using `margin-inline-end` instead of `margin-right` ensures components work automatically in RTL contexts. Combining `vertical-align: middle` (for inline) and `align-self: center` (for flex) creates robust alignment across different layout contexts.
**Action:** Default to logical CSS properties and support both inline/flex alignment for shared primitives like Buttons/Icons.
