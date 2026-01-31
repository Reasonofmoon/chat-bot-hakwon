import React, { memo, forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  disabled,
  children,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}));

Button.displayName = 'Button';
