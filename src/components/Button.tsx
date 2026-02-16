import React, { memo, forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const BASE_STYLE: React.CSSProperties = { userSelect: 'none' };

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
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      style={{
        ...BASE_STYLE,
        cursor: isLoading ? 'wait' : disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}));

Button.displayName = 'Button';
