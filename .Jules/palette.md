## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2025-01-31 - Focus Management in Reusable Components
**Learning:** Reusable components like Button must use `forwardRef` to allow consumers to manage focus (e.g., for modal closing or error handling).
**Action:** Ensure all interactive primitives export `forwardRef`.
