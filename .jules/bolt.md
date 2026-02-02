# Bolt's Journal

## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.

## 2026-02-02 - React 19 Ref Optimization
**Learning:** React 19 treats `ref` as a standard prop, eliminating the need for `forwardRef` wrappers. This simplifies the component tree and reduces HOC overhead.
**Action:** Removed `forwardRef` from `Button` component while maintaining `memo` and `displayName`. Verified with `tsc`.
