## 2025-10-26 - Enforcing Safe By Design Policy
**Vulnerability:** The project had a written "Safe By Design" policy in `SECURITY.md` explicitly prohibiting `dangerouslySetInnerHTML`, but this policy was not enforced by automated tooling. This allowed potential violations to slip through code review.
**Learning:** Written policies are insufficient without automated enforcement. Security rules must be codified in the CI/CD pipeline (e.g., via ESLint) to ensuring compliance and preventing regressions.
**Prevention:** Configured `react/no-danger` to `"error"` in `.eslintrc.json` to automatically reject any usage of `dangerouslySetInnerHTML` across the codebase.
