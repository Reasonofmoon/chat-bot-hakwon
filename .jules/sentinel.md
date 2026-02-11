## 2026-02-12 - [Unfiltered Prop Spreading Vulnerability]
**Vulnerability:** Core UI components (`Button`, `Spinner`) spread all props (`...props`) directly to DOM elements, including `dangerouslySetInnerHTML`. This allowed consumers to inject arbitrary HTML, bypassing React's XSS protections.
**Learning:** React's `dangerouslySetInnerHTML` bypasses default escaping. When building reusable components, simply spreading `props` creates a "Safe By Design" violation, as it implicitly allows this dangerous prop unless explicitly blocked.
**Prevention:** Explicitly destructure `dangerouslySetInnerHTML` from props and type it as `never` (or omit it from the interface) in all primitive UI components to enforce a strict no-danger policy by default.

## 2026-02-12 - [Missing Security Linting Enforcement]
**Vulnerability:** While components were manually patched to exclude `dangerouslySetInnerHTML`, the codebase lacked automated enforcement, allowing new components to reintroduce the vulnerability.
**Learning:** Manual code reviews and patterns are insufficient for long-term security. Automated tooling (linting) is required to guarantee "Safe By Design" policies are followed consistently.
**Prevention:** Enable `react/no-danger` rule with "error" severity in `.eslintrc.json` to automatically flag and prevent usage of `dangerouslySetInnerHTML` across the entire codebase.
