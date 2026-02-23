import React, { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

// Optimization: Removed forwardRef to simplify component structure and align with React 19 patterns.
export const Button = memo(({
  isLoading,
  disabled,
  children,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
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
});

Button.displayName = "Button";
