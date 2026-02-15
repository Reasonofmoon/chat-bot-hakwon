## 2025-05-18 - React 19 Ref Optimization
**Learning:** Removing `forwardRef` in React 19 components reduces component tree depth and initialization overhead, but requires explicit `ref` typing in the component props intersection (e.g., `Props & { ref?: React.Ref<T> }`) to ensure TypeScript compatibility without the `forwardRef` generic.
**Action:** When migrating to React 19, systematically remove `forwardRef` wrappers from functional components and add the `ref` prop to the type signature to gain small performance wins and cleaner stack traces.
