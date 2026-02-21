# Bolt's Journal

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.

## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2025-02-23 - SVG Performance: strokeOpacity vs opacity
**Learning:** Using `opacity` on an SVG element with `fill="none"` applies to the entire layer, potentially creating unnecessary compositing layers. Using `strokeOpacity` is visually equivalent for stroked elements but avoids this overhead.
**Action:** Always prefer `strokeOpacity` (and `fillOpacity`) over `opacity` for SVG elements when only specific properties need transparency.

## 2025-02-23 - Element Hoisting for Performance
**Learning:** Hoisting static React elements (e.g., `<Spinner style={...} />`) to module-level constants prevents `React.createElement` allocation on every render and allows React to skip reconciliation for those subtrees when the parent re-renders, as the element reference remains identical.
**Action:** Identify static sub-components within render methods and hoist them to constants if their props are static or derived from module-level constants.
