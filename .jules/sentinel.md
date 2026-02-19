## 2026-02-05 - Missing Security Linting
**Vulnerability:** The project lacked automated checks for dangerous React patterns like `dangerouslySetInnerHTML`, leaving it exposed to potential XSS vulnerabilities if developers accidentally used them.
**Learning:** Standard configuration presets like `plugin:react/recommended` do not always enable all security-relevant rules (e.g., `react/no-danger` is often off). Assumptions about "recommended" configs can lead to security gaps.
**Prevention:** Explicitly configured `react/no-danger: "error"` in `.eslintrc.json` to enforce security standards at the linting level.

## 2026-02-05 - Secure UI Primitives
**Vulnerability:** Primitive components (Button, Spinner) allowed arbitrary props spreading, enabling the injection of `dangerouslySetInnerHTML` even if not explicitly intended by the component API.
**Learning:** Even with linting rules, component libraries can unknowingly facilitate XSS if they blindly spread props. Explicitly stripping dangerous props at the component level provides defense-in-depth.
**Prevention:** Updated `Button` and `Spinner` to explicitly destructure and discard `dangerouslySetInnerHTML` and typed it as `never`.
