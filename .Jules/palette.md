## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2025-02-15 - Configurable Loading States
**Learning:** Hardcoded "Loading..." strings in components like buttons prevent localization and context-specific feedback (e.g., "Saving...").
**Action:** Always expose a `loadingText` prop (defaulting to "Loading...") in interactive components to allow consumers to customize the feedback message.
