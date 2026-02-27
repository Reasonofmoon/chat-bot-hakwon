## 2026-02-12 - [Unfiltered Prop Spreading Vulnerability]
**Vulnerability:** Core UI components (`Button`, `Spinner`) spread all props (`...props`) directly to DOM elements, including `dangerouslySetInnerHTML`. This allowed consumers to inject arbitrary HTML, bypassing React's XSS protections.
**Learning:** React's `dangerouslySetInnerHTML` bypasses default escaping. When building reusable components, simply spreading `props` creates a "Safe By Design" violation, as it implicitly allows this dangerous prop unless explicitly blocked.
**Prevention:** Explicitly destructure `dangerouslySetInnerHTML` from props and type it as `never` (or omit it from the interface) in all primitive UI components to enforce a strict no-danger policy by default.

## 2026-02-13 - [Explicit Protocol Sanitization]
**Vulnerability:** The `Button` component allowed passing `formAction` via prop spreading. Although React 19 runtime blocks `javascript:` URLs by replacing them with an error-throwing string, the attribute itself remained in the DOM, creating noise and potential confusion. Relying solely on framework runtime protections is less robust than explicit component-level validation.
**Learning:** Even with modern framework protections (like React 19's `formAction` sanitization), implementing explicit validation at the component boundary ("Safe By Design") provides Defense in Depth, cleaner DOM output, and clearer developer feedback.
**Prevention:** Explicitly destructure sensitive URL-like props (e.g., `formAction`, `href`) and validate or sanitize them before passing to the underlying DOM element. In `Button`, we now strip `javascript:` protocol from `formAction`.
