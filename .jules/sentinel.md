# Sentinel's Journal

This journal records CRITICAL security learnings, vulnerability patterns, and architectural gaps found in the codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

## 2025-01-31 - Implicit Form Submission Risk
**Vulnerability:** Button components lacked a default `type` attribute, defaulting to `submit` in forms.
**Learning:** React buttons follow HTML defaults, which can lead to unintended form submissions and state issues.
**Prevention:** Enforce `type="button"` default in base Button components.
