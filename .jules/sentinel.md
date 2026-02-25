## 2026-02-12 - [Unfiltered Prop Spreading Vulnerability]
**Vulnerability:** Core UI components (`Button`, `Spinner`) spread all props (`...props`) directly to DOM elements, including `dangerouslySetInnerHTML`. This allowed consumers to inject arbitrary HTML, bypassing React's XSS protections.
**Learning:** React's `dangerouslySetInnerHTML` bypasses default escaping. When building reusable components, simply spreading `props` creates a "Safe By Design" violation, as it implicitly allows this dangerous prop unless explicitly blocked.
**Prevention:** Explicitly destructure `dangerouslySetInnerHTML` from props and type it as `never` (or omit it from the interface) in all primitive UI components to enforce a strict no-danger policy by default.

## 2026-02-24 - [Unsafe URL Handling in Prop Spreading]
**Vulnerability:** Core UI components (`Button`) spread `...props` to the underlying DOM element, allowing unchecked `javascript:` URLs in sensitive attributes like `formAction` (even if React mitigates execution, explicitly blocking it is safer).
**Learning:** Framework-level XSS protections (like React 19's formAction sanitization) are a fallback, not a substitute for explicit validation. Relying solely on the framework creates a potential vulnerability if the behavior changes or is bypassed.
**Prevention:** Explicitly destructure and validate URL-accepting props (like `formAction`, `href`) in primitive components to enforce strict protocol allowlists (e.g. reject `javascript:`), failing securely by throwing an error if invalid input is detected.
