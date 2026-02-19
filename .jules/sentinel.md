## 2025-02-15 - Safe By Design: Explicit Children Exclusion
**Vulnerability:** React components that spread `props` to DOM elements but are not intended to render children (like icons or spinners) can accidentally render injected children if passed. While React usually prioritizes JSX children, explicit exclusion prevents ambiguity and potential injection vectors.
**Learning:** `React.SVGProps` includes `children`. Even if a component hardcodes its SVG content, consumers can pass `children` via props. Explicitly omitting `children` from the props interface and destructuring it (to exclude from spread) guarantees safety.
**Prevention:** For non-container components, use `Omit<Props, 'children'>` and destructure `children` to ensure it is never passed to the DOM.

## 2025-02-15 - Safe By Design: React 19 XSS Mitigation & Linting Enforcement
**Vulnerability:** Usage of `javascript:` URLs in props (like `formAction`, `href`) and `dangerouslySetInnerHTML` bypasses React's default XSS protection.
**Learning:** React 19 automatically strips `javascript:` URLs from `formAction` (verified via runtime test), providing a default safety layer. However, explicit enforcement via linting (`react/jsx-no-script-url`, `react/no-danger`) is crucial for defense-in-depth, catching issues at build time, and covering edge cases or future refactors.
**Prevention:** Enable `react/jsx-no-script-url` and `react/no-danger` in ESLint configuration to prevent accidental introduction of XSS vectors.
