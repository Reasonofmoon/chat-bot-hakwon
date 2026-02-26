import React, { memo, useMemo } from 'react';
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

const BASE_BUTTON_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
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
}: ButtonProps) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);
  const isStart = loadingPosition === 'start';

  // Determine spinner style based on position and presence of text
  const spinnerStyle = loadingText
    ? (isStart ? SPINNER_STYLE_START : SPINNER_STYLE_END)
    : SPINNER_STYLE_CENTER;

  // Optimize style object allocation:
  // 1. If no custom style and no state override, use static base style (though cursor might need reset)
  // 2. Wrap creation in useMemo to maintain referential equality when inputs are stable
  const buttonStyle = useMemo(() => {
    const cursorState = isLoading ? 'wait' : (disabled ? 'not-allowed' : style?.cursor);

    // If no custom styles and no cursor override needed, we could potentially return a static object,
    // but we need to merge the computed cursor.
    return {
      ...BASE_BUTTON_STYLE,
      ...style,
      cursor: cursorState
    };
  }, [isLoading, disabled, style]);

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
});

Button.displayName = 'Button';
