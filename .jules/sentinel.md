## 2026-02-12 - [Unfiltered Prop Spreading Vulnerability]
**Vulnerability:** Core UI components (`Button`, `Spinner`) spread all props (`...props`) directly to DOM elements, including `dangerouslySetInnerHTML`. This allowed consumers to inject arbitrary HTML, bypassing React's XSS protections.
**Learning:** React's `dangerouslySetInnerHTML` bypasses default escaping. When building reusable components, simply spreading `props` creates a "Safe By Design" violation, as it implicitly allows this dangerous prop unless explicitly blocked.
**Prevention:** Explicitly destructure `dangerouslySetInnerHTML` from props and type it as `never` (or omit it from the interface) in all primitive UI components to enforce a strict no-danger policy by default.

## 2026-02-20 - [Missing Secret Exclusion in Git]
**Vulnerability:** The project's `.gitignore` file omitted crucial exclusions for environment files (`.env`, `.env.*`) and debug logs, exposing sensitive credentials and build artifacts to version control.
**Learning:** Default `.gitignore` templates often focus on build outputs but miss operational security files like `.env`, which are the primary source of secret leakage in modern apps.
**Prevention:** Enforce a strict `.gitignore` policy that explicitly excludes all potential secret files (`.env*`, `*.pem`, `*.key`) and debug logs before the first commit.
