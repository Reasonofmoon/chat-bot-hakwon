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
const BASE_BUTTON_STYLE: React.CSSProperties = { touchAction: 'manipulation', userSelect: 'none', WebkitUserSelect: 'none' };
const LOADING_STYLE: React.CSSProperties = { cursor: 'wait' };
const DISABLED_STYLE: React.CSSProperties = { cursor: 'not-allowed' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  loadingPosition = 'start',
  disabled,
  children,
  type = "button",
  "aria-label": ariaLabel,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);

  // Separate style from other props to merge properly
  const { style, ...rest } = props;

  const computedStyle = useMemo(() => {
    // Logic: Base < User < State
    // Base styles first
    let finalStyle = BASE_BUTTON_STYLE;

    // Merge user styles (allowing override of base styles)
    if (style) {
      finalStyle = { ...finalStyle, ...style };
    }

    // Apply state styles (Loading > Disabled > Default)
    if (isLoading) {
      finalStyle = { ...finalStyle, ...LOADING_STYLE };
    } else if (disabled) {
      finalStyle = { ...finalStyle, ...DISABLED_STYLE };
    }

    return finalStyle;
  }, [isLoading, disabled, style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      style={computedStyle}
      {...rest}
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
