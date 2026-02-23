import React, { memo, forwardRef, useMemo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const BASE_STYLE: React.CSSProperties = { userSelect: 'none' };
const LOADING_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'wait' };
const DISABLED_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'not-allowed' };
const DEFAULT_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'pointer' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  style,
  ...props
}, ref) => {
  const computedStyle = useMemo(() => {
    if (isLoading) {
      return style ? { ...LOADING_STYLE, ...style } : LOADING_STYLE;
    }
    if (disabled) {
      return style ? { ...DISABLED_STYLE, ...style } : DISABLED_STYLE;
    }
    return style ? { ...DEFAULT_STYLE, ...style } : DEFAULT_STYLE;
  }, [isLoading, disabled, style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      style={computedStyle}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}));

Button.displayName = 'Button';
