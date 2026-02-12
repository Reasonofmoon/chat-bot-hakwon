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

## 2025-02-24 - Style Prop Memoization
**Learning:** Merging style objects inside a component (e.g. `{ ...baseStyle, ...props.style }`) creates a new reference on every render, which can defeat `React.memo` optimizations in child components or native elements (forcing prop reconciliation).
**Action:** Wrap merged style objects in `useMemo` when `props.style` is expected to be stable, to preserve referential equality and skip unnecessary reconciliation.
