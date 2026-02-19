# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Safe By Design Policy

All core UI primitives in this repository must be "Safe By Design". This means they must explicitly prohibit the use of `dangerouslySetInnerHTML` to prevent Cross-Site Scripting (XSS) vulnerabilities.

- `dangerouslySetInnerHTML` must be typed as `never` in component props.
- `dangerouslySetInnerHTML` must be destructured and excluded from spread props.

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security vulnerability, please report it privately.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to security-reports@example.com.

You should receive a response within 48 hours.
