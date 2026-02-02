# Bolt's Journal

## 2025-02-20 - Component Library Optimization
**Learning:** In a component library without a consuming app, `React.memo` is a proactive optimization. While technically "premature" without a bottleneck, it is a standard for shared primitives to prevent downstream re-renders.
**Action:** When working on isolated components, justify `memo` as an enabler for consumer performance, even if local impact is unmeasurable.

## 2025-02-23 - Initial Setup
**Learning:** Performance journals are critical for tracking insights.
**Action:** Created this file to track future critical learnings.

## 2025-02-24 - Filesystem Consistency
**Learning:** Inconsistent directory casing (e.g., `.Jules` vs `.jules`) causes merge conflicts and confusion.
**Action:** Standardize on `.jules` (lowercase) for all configuration directories to avoid issues on case-insensitive filesystems.
