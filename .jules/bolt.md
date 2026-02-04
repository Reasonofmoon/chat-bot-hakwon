# Bolt's Journal

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.
## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2026-02-04 - React 19 ForwardRef Removal
**Learning:** React 19 eliminates the need for `forwardRef` wrappers, allowing `ref` to be passed as a standard prop. This reduces component tree depth and overhead.
**Action:** Remove `forwardRef` wrappers in favor of prop-based refs when upgrading to React 19.
