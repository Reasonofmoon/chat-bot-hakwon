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

## 2026-02-10 - Button Style Optimization
**Learning:** In frequently used primitive components like `Button`, spreading a default object literal (e.g. `style={{...}}`) creates a new reference on every render, causing React to reconcile style properties even if they haven't changed.
**Action:** Extract default styles to a module-level constant (e.g. `BASE_BUTTON_STYLE`) and use conditional spread to pass the stable reference when no override is provided, optimizing the common case.
