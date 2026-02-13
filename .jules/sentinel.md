## 2026-02-13 - Safe By Design: Preventing XSS in Core Components
**Vulnerability:** The `Button` component spread all props to the DOM element, allowing consumers to pass `dangerouslySetInnerHTML` and execute arbitrary scripts (XSS).
**Learning:** React primitives that spread `...props` prioritize flexibility over security by default. Without explicit exclusion, dangerous props propagate to the DOM.
**Prevention:** Core UI components must explicitly destructure and exclude `dangerouslySetInnerHTML` from spread props, typing it as `never`, to prevent XSS.
