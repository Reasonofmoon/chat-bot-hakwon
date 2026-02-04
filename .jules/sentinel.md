## 2025-02-20 - Missing Security Linting
**Vulnerability:** The project lacked automated security scanning (SAST) for common vulnerabilities.
**Learning:** Even in small component libraries, security linting is essential to catch issues like unsafe regex or object injection early.
**Prevention:** Added `eslint-plugin-security` to the CI/CD pipeline (via `pnpm lint`).
