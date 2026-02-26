## 2025-02-15 - Safe By Design: Explicit Children Exclusion
**Vulnerability:** React components that spread `props` to DOM elements but are not intended to render children (like icons or spinners) can accidentally render injected children if passed. While React usually prioritizes JSX children, explicit exclusion prevents ambiguity and potential injection vectors.
**Learning:** `React.SVGProps` includes `children`. Even if a component hardcodes its SVG content, consumers can pass `children` via props. Explicitly omitting `children` from the props interface and destructuring it (to exclude from spread) guarantees safety.
**Prevention:** For non-container components, use `Omit<Props, 'children'>` and destructure `children` to ensure it is never passed to the DOM.
