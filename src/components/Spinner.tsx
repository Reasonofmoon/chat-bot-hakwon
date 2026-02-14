import { memo, type SVGProps } from 'react';

// Extracted static children to prevent object allocation on every render
const spinnerChildren = (
  <>
    {/* Use strokeOpacity instead of opacity to avoid creating a compositing layer */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
  </>
);

export const Spinner = memo(({
  // explicit exclusion of dangerous prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}: SVGProps<SVGSVGElement> & { dangerouslySetInnerHTML?: never }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    {spinnerChildren}
  </svg>
));

Spinner.displayName = 'Spinner';
