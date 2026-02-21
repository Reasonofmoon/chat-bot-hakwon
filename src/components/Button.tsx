import React, { memo, useMemo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
}

// Extracted styles to prevent object allocation on every render
const SPINNER_STYLE_CENTER: React.CSSProperties = { alignSelf: 'center' };
const SPINNER_STYLE_START: React.CSSProperties = { alignSelf: 'center', marginRight: '0.5em' };
const SPINNER_STYLE_END: React.CSSProperties = { alignSelf: 'center', marginLeft: '0.5em' };
const BASE_BUTTON_STYLE: React.CSSProperties = {
  userSelect: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  loadingPosition = 'start',
  disabled,
  children,
  type = "button",
  "aria-label": ariaLabel,
  style,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);

  const computedStyle = useMemo(() => {
    const stateStyle: React.CSSProperties = {};
    if (isLoading) {
      stateStyle.cursor = 'wait';
    } else if (disabled) {
      stateStyle.cursor = 'not-allowed';
    }

    return { ...BASE_BUTTON_STYLE, ...style, ...stateStyle };
  }, [isLoading, disabled, style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      style={computedStyle}
      {...props}
    >
      {isLoading ? (
        <>
          {loadingPosition === 'start' && (
            <Spinner
              style={loadingText ? SPINNER_STYLE_START : SPINNER_STYLE_CENTER}
            />
          )}
          {loadingText}
          {loadingPosition === 'end' && (
            <Spinner
              style={loadingText ? SPINNER_STYLE_END : SPINNER_STYLE_CENTER}
            />
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
