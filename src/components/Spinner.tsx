import React, { memo } from 'react';

const SPINNER_CHILDREN = (
  <>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      style={{ willChange: 'transform' }}
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
  // Security: exclude dangerouslySetInnerHTML to prevent XSS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}: React.SVGProps<SVGSVGElement> & { dangerouslySetInnerHTML?: never }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    {SPINNER_CHILDREN}
  </svg>
));

Spinner.displayName = 'Spinner';
