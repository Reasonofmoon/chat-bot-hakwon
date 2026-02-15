import React, { memo } from 'react';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  dangerouslySetInnerHTML?: never;
  children?: never;
}

export const Spinner = memo(({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...props
}: SpinnerProps) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
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
  </svg>
));

Spinner.displayName = 'Spinner';
