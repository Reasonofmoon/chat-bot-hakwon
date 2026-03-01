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

## 2025-02-23 - Flyweight Pattern for Style Objects
**Learning:** For highly reused components like Buttons, creating new style bundle objects on mount (even inside `useMemo`) adds unnecessary allocation overhead. Pre-defining static style objects for common states (e.g., loading, disabled) and returning them directly avoids allocation entirely for default cases.
**Action:** Use the Flyweight pattern for style props in primitive components: define static constants for common permutations and return them directly when no overrides are present.

## 2025-02-27 - SVG Animation Performance
**Learning:** SVG animations utilizing `animateTransform` run on the main thread and can cause constant repainting.
**Action:** Always apply `will-change: transform` to the parent element (`<path>`) of `animateTransform` continuous animations to promote it to a compositor layer and enable hardware acceleration, avoiding main-thread blockages. Omit `xmlns="http://www.w3.org/2000/svg"` on inline SVGs in React to save bundle size.

## 2025-03-01 - Regex Object Allocation Overhead
**Learning:** Instantiating regular expressions inline within React render methods or `useMemo` blocks forces the JavaScript engine to re-allocate and potentially re-compile the regex object on every execution.
**Action:** Hoist static regular expressions to module-level constants outside of React components. This applies even if they are only used inside a `useMemo` block, as the block itself executes during rendering.
