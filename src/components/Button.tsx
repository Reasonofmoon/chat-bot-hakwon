import React, { memo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
  // Security: strict no-danger policy
  dangerouslySetInnerHTML?: never;
  /**
   * Ref to the button element.
   * In React 19, ref is passed as a prop and forwardRef is not required.
   */
  ref?: React.Ref<HTMLButtonElement>;
}

const SPINNER_STYLE_START = { marginRight: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_END = { marginLeft: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_CENTER = { alignSelf: 'center' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
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
  ref,
  ...props
}: ButtonProps) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);
  const isStart = loadingPosition === 'start';

  // Determine spinner style based on position and presence of text
  const spinnerStyle = loadingText
    ? (isStart ? SPINNER_STYLE_START : SPINNER_STYLE_END)
    : SPINNER_STYLE_CENTER;

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
          {isStart && <Spinner style={spinnerStyle} />}
          {loadingText}
          {!isStart && <Spinner style={spinnerStyle} />}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
