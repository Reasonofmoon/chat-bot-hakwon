## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-09 - Flexible Loading Indicator Placement
**Learning:** Enforcing a single position for loading indicators (e.g., always left) creates visual dissonance in right-aligned flows (like "Next ->").
**Action:** Expose a `loadingPosition` prop to allow consumers to place the spinner contextually (start vs end), preserving the button's visual weight and directionality.

## 2026-02-16 - Explicit Cursor Feedback
**Learning:** Interactive elements like Buttons should explicitly set `cursor: wait` during loading states and `cursor: not-allowed` when disabled, rather than relying on browser defaults which can be ambiguous.
**Action:** Enforce state-based cursor styles in component primitives, overriding user-provided styles for these specific states to guarantee clear feedback.
