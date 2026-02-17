import React, { memo } from 'react';
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

// Pre-allocate spinner elements to avoid object allocation and JSX creation on every render
const SPINNER_START = <Spinner style={SPINNER_STYLE_START} />;
const SPINNER_END = <Spinner style={SPINNER_STYLE_END} />;
const SPINNER_CENTER = <Spinner style={SPINNER_STYLE_CENTER} />;

const BASE_BUTTON_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
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
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);
  const isStart = loadingPosition === 'start';

  // Select the appropriate spinner element to avoid allocation
  const spinnerElement = loadingText
    ? (isStart ? SPINNER_START : SPINNER_END)
    : SPINNER_CENTER;

  // Select the appropriate base style constant to avoid object allocation on every render
  const baseStyle = isLoading
    ? LOADING_STYLE
    : (disabled ? DISABLED_STYLE : INTERACTIVE_STYLE);

  // If style prop is provided, merge it with baseStyle. Otherwise use baseStyle directly.
  // This preserves referential equality when no custom styles are passed.
  const buttonStyle = style ? { ...baseStyle, ...style } : baseStyle;

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
          {isStart && spinnerElement}
          {loadingText}
          {!isStart && spinnerElement}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
