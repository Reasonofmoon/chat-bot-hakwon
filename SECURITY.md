# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Safe By Design Policy

To reduce the risk of Cross-Site Scripting (XSS), our UI primitives (such as `Button` and `Spinner`) explicitly do not support the `dangerouslySetInnerHTML` prop. All content should be passed via children or safe text props.

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a vulnerability, please do not report it via public GitHub issues.

Instead, please report it by emailing **security-reports@example.com**.

We will acknowledge your report within 48 hours and provide an estimated timeframe for a fix. We will keep you informed of our progress.

Thank you for helping keep this project secure!
