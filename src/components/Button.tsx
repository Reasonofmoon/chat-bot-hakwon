import React, { memo, forwardRef, useMemo } from 'react';
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

const BASE_BUTTON_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const LOADING_STYLE: React.CSSProperties = {
  ...BASE_BUTTON_STYLE,
  cursor: 'wait',
};

const DISABLED_STYLE: React.CSSProperties = {
  ...BASE_BUTTON_STYLE,
  cursor: 'not-allowed',
};

const INTERACTIVE_STYLE: React.CSSProperties = {
  ...BASE_BUTTON_STYLE,
  cursor: 'pointer',
};

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

  // Determine spinner style based on position and presence of text
  const spinnerStyle = loadingText
    ? (isStart ? SPINNER_STYLE_START : SPINNER_STYLE_END)
    : SPINNER_STYLE_CENTER;

  // Select the appropriate base style constant to avoid object allocation on every render
  const baseStyle = isLoading
    ? LOADING_STYLE
    : (disabled ? DISABLED_STYLE : INTERACTIVE_STYLE);

  // If style prop is provided, merge it with baseStyle. Otherwise use baseStyle directly.
  // This preserves referential equality when no custom styles are passed.
  // We use useMemo to ensure that even if props like 'children' change, the style object remains
  // referentially equal as long as baseStyle and style prop haven't changed, preventing
  // unnecessary reconciliation of the style prop on the native button element.
  const buttonStyle = useMemo(() => {
    return style ? { ...baseStyle, ...style } : baseStyle;
  }, [baseStyle, style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      style={buttonStyle}
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
