import React, { memo, forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  // Security: explicitly prevent XSS by excluding dangerouslySetInnerHTML
  dangerouslySetInnerHTML?: never;
}

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  disabled,
  children,
  type = "button",
  // Security: explicitly prevent XSS by excluding dangerouslySetInnerHTML
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
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
