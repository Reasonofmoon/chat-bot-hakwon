## 2025-02-25 - Accessible Loading Fallback
**Learning:** When replacing button text with a spinner for an icon-only loading state, the button loses its accessible name, violating WCAG.
**Action:** In component logic, detect when `isLoading` is true AND text is hidden/empty. Inject a fallback `aria-label="Loading"` only if no other accessible name (`aria-label` or `aria-labelledby`) is provided by the consumer.
