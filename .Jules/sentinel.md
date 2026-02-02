## 2026-02-02 - Missing Automated Security Scanning
**Vulnerability:** The project lacked automated security linting, making it vulnerable to accidental introduction of security issues like ReDoS or unsafe object injection.
**Learning:** Even simple component libraries can introduce security risks via unsafe regex or property access patterns. Manual review is insufficient.
**Prevention:** Added `eslint-plugin-security` to the ESLint configuration to automatically catch common security patterns during development and CI.
