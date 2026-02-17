## 2026-02-17 - Safe-by-Design UI Components

**Vulnerability:**
React components that spread `...props` to underlying DOM elements blindly accept `dangerouslySetInnerHTML`, creating potential XSS vectors if consumers pass unsanitized input.

**Learning:**
Even in a component library where consumers are trusted, "Defense in Depth" requires core primitives to be secure by default. Types alone are insufficient as they can be bypassed; runtime protection is necessary.

**Prevention:**
Explicitly destructure and exclude `dangerouslySetInnerHTML` from spread props in all core UI components. Type it as `never` in the interface to provide build-time feedback.
