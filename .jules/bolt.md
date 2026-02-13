# Bolt's Journal

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.

## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2025-02-23 - React 19 Ref Prop Optimization
**Learning:** In React 19, `forwardRef` is no longer necessary for function components, even when wrapped in `React.memo`. Passing `ref` as a standard prop reduces the component tree depth (removing the `ForwardRef` fiber) and simplifies the API surface without sacrificing functionality.
**Action:** Default to using `ref` as a prop for all new components and refactor legacy `forwardRef` usage when touching existing components in React 19+ environments.
