## 2025-01-30 - Legacy Config for ESLint Security Plugin
**Vulnerability:** The default configuration for `eslint-plugin-security` (v3+) uses Flat Config, which breaks legacy `.eslintrc.json` setups.
**Learning:** When adding `eslint-plugin-security` to legacy ESLint projects, use `plugin:security/recommended-legacy` instead of `plugin:security/recommended`.
**Prevention:** Always verify plugin exports in `node_modules` or documentation when integrating into legacy environments.
