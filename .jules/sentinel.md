## 2026-02-05 - Missing Security Linting
**Vulnerability:** The project lacked automated checks for dangerous React patterns like `dangerouslySetInnerHTML`, leaving it exposed to potential XSS vulnerabilities if developers accidentally used them.
**Learning:** Standard configuration presets like `plugin:react/recommended` do not always enable all security-relevant rules (e.g., `react/no-danger` is often off). Assumptions about "recommended" configs can lead to security gaps.
**Prevention:** Explicitly configured `react/no-danger: "error"` in `.eslintrc.json` to enforce security standards at the linting level.
