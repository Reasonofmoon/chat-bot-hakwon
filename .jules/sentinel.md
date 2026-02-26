## 2025-02-15 - Safe By Design: Explicit Children Exclusion
**Vulnerability:** React components that spread `props` to DOM elements but are not intended to render children (like icons or spinners) can accidentally render injected children if passed. While React usually prioritizes JSX children, explicit exclusion prevents ambiguity and potential injection vectors.
**Learning:** `React.SVGProps` includes `children`. Even if a component hardcodes its SVG content, consumers can pass `children` via props. Explicitly omitting `children` from the props interface and destructuring it (to exclude from spread) guarantees safety.
**Prevention:** For non-container components, use `Omit<Props, 'children'>` and destructure `children` to ensure it is never passed to the DOM.

## 2026-02-26 - Security Linting Gaps: formAction
**Vulnerability:** The default `react/jsx-no-script-url` ESLint rule configuration only checks `href` and `xlink:href` attributes, missing `formAction` which can execute `javascript:` URLs if not sanitized.
**Learning:** Security linting rules often require explicit configuration to cover all potential attack vectors, especially for attributes that behave similarly to links but are less common.
**Prevention:** Explicitly configure `react/jsx-no-script-url` to check `formAction` on `button`, `input`, and relevant custom components in `.eslintrc.json`.
