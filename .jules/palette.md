## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-09 - Flexible Loading Indicator Placement
**Learning:** Enforcing a single position for loading indicators (e.g., always left) creates visual dissonance in right-aligned flows (like "Next ->").
**Action:** Expose a `loadingPosition` prop to allow consumers to place the spinner contextually (start vs end), preserving the button's visual weight and directionality.

## 2026-02-14 - Accessible Loading Label Priority
**Learning:** When a button enters a loading state with visible text (e.g., "Loading..."), an existing `aria-label` (e.g., "Submit") overrides this text, causing screen readers to announce "Submit" instead of the current status.
**Action:** Conditionally suppress `aria-label` when `isLoading` is true and `loadingText` is visible, ensuring the status is announced.
