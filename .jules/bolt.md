# Bolt's Journal

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.

## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2025-02-23 - SVG Stroke Optimization
**Learning:** Using `strokeOpacity` instead of `opacity` on SVG elements with only strokes avoids creating unnecessary compositing layers, improving rendering performance.
**Action:** Prefer `strokeOpacity` or `fillOpacity` over `opacity` for specific SVG attributes when applicable.
**Learning:** Extracting static JSX children (like SVG paths) to constants outside the component definition prevents object allocation on every render, even inside memoized components.
**Action:** Extract static SVG content to file-scope constants for frequently used icons or spinners.
