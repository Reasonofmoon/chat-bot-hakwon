## 2025-01-30 - Bootstrapping Accessibility
**Learning:** Starting a project with `eslint-plugin-jsx-a11y` enforcement prevents accessibility debt from accumulating.
**Action:** Ensure all new projects have this configured in `.eslintrc.json` or `eslint.config.js` immediately.

## 2025-02-15 - Configurable Loading States
**Learning:** Hardcoded "Loading..." strings in components like buttons prevent localization and context-specific feedback (e.g., "Saving...").
**Action:** Always expose a `loadingText` prop (defaulting to "Loading...") in interactive components to allow consumers to customize the feedback message.

## 2025-10-26 - Cursor Feedback for Button States
**Learning:** Default browser cursor behavior for disabled buttons often lacks clarity. Explicitly setting `cursor: wait` for loading and `cursor: not-allowed` for disabled states provides immediate visual feedback.
**Action:** Always map interactive component states to specific cursor styles in the component's style logic.
