## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-09 - Flexible Loading Indicator Placement
**Learning:** Enforcing a single position for loading indicators (e.g., always left) creates visual dissonance in right-aligned flows (like "Next ->").
**Action:** Expose a `loadingPosition` prop to allow consumers to place the spinner contextually (start vs end), preserving the button's visual weight and directionality.

## 2026-02-12 - Style Merging Precedence
**Learning:** When using inline styles for component states (like `cursor: wait`), these must be merged *after* user-provided styles to prevent consumers from accidentally overriding critical state indicators.
**Action:** Always spread `...props.style` before applying state-specific overrides in style objects.
