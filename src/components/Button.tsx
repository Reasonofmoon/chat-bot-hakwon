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
  // If loading with visible text, suppress aria-label so screen reader reads the text
  const shouldSuppressAriaLabel = isLoading && loadingText;
  const effectiveAriaLabel = shouldSuppressAriaLabel
    ? undefined
    : (ariaLabel || (isLoading ? "Loading" : undefined));
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
        userSelect: 'none',
        cursor: isLoading ? 'wait' : (disabled ? 'not-allowed' : 'pointer'),
        ...style
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
}));

Button.displayName = 'Button';
