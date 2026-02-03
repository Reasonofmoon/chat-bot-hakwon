import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

// Optimized with React.memo to prevent unnecessary re-renders when parent components update but props remain unchanged.
export const Button = React.memo(({ isLoading, disabled, children, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
});

Button.displayName = 'Button';
