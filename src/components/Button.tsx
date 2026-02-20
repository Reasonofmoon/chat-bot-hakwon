import React, { memo, forwardRef, useMemo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const BASE_STYLE: React.CSSProperties = { userSelect: 'none' };
// Pre-compute standard styles to avoid allocation on every render
const LOADING_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'wait' };
const DISABLED_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'not-allowed' };
const POINTER_STYLE: React.CSSProperties = { ...BASE_STYLE, cursor: 'pointer' };

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
    // If custom style is provided, we must merge, but ensure state styles take precedence for cursor
    if (style) {
      return {
        ...BASE_STYLE,
        ...style,
        // State overrides user cursor to ensure correct feedback
        cursor: isLoading ? 'wait' : disabled ? 'not-allowed' : (style.cursor ?? 'pointer'),
      };
    }
    // Optimization: Return static object for standard states to avoid allocation
    if (isLoading) return LOADING_STYLE;
    if (disabled) return DISABLED_STYLE;
    return POINTER_STYLE;
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
