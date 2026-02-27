## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2026-02-02 - Accessible Loading States
**Learning:** Hardcoded state strings (like "Loading...") enforce a single language/context and break icon-only designs.
**Action:** Expose props like `loadingText` to allow consumers to provide localized strings or null for icon-only loading states (while maintaining ARIA labels).

## 2026-02-03 - Flexible Loading Indicators
**Learning:** Hardcoding the spinner position restricts design options, especially for directional actions (like "Next Step ->") where the spinner should naturally appear at the end.
**Action:** Expose a `loadingPosition` prop ('start' | 'end') to allow consumers to place the loading indicator where it makes semantic and visual sense.

## 2026-02-04 - Visual Feedback for Button States
**Learning:** Native button disabled state lacks distinct cursor feedback (`cursor: not-allowed`) by default in many browsers, and loading states need explicit `cursor: wait` to indicate processing.
**Action:** Implement a style precedence pattern (Loading > Disabled > Default) using `useMemo` and static constants to enforce correct cursors while respecting user overrides for other properties.

## 2026-02-27 - Preventing Accidental Button Text Selection
**Learning:** Users rapidly clicking buttons (e.g., counters, game controls) often accidentally select the button text, breaking the interaction flow. Also, `touch-action: manipulation` removes the 300ms tap delay on mobile.
**Action:** Apply `user-select: none` and `touch-action: manipulation` by default to all button primitives, but allow these to be overridden via props for edge cases (like copyable codes).
