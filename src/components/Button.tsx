import React, { memo, forwardRef } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
  // Security: strict no-danger policy
  dangerouslySetInnerHTML?: never;
}

const SPINNER_STYLE_START = { marginRight: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_END = { marginLeft: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_CENTER = { alignSelf: 'center' };

// Optimization: Pre-allocate spinner elements to prevent reconciliation overhead
const SPINNER_START = <Spinner style={SPINNER_STYLE_START} />;
const SPINNER_END = <Spinner style={SPINNER_STYLE_END} />;
const SPINNER_CENTER = <Spinner style={SPINNER_STYLE_CENTER} />;

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  loadingText = "Loading...",
  loadingPosition = "start",
  disabled,
  children,
  type = "button",
  "aria-label": ariaLabel,
  style,
  // Security: exclude dangerouslySetInnerHTML to prevent XSS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}, ref) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);
  const isStart = loadingPosition === 'start';

  // Determine which pre-allocated spinner to use
  const spinnerElement = loadingText
    ? (isStart ? SPINNER_START : SPINNER_END)
    : SPINNER_CENTER;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
        cursor: isLoading ? 'wait' : (disabled ? 'not-allowed' : style?.cursor)
      }}
      {...props}
    >
      {isLoading ? (
        <>
          {isStart && spinnerElement}
          {loadingText}
          {!isStart && spinnerElement}
        </>
      ) : (
        children
      )}
    </button>
  );
}));

Button.displayName = 'Button';
