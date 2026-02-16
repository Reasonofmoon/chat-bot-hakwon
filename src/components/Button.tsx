import React, { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

const BASE_STYLE: React.CSSProperties = { userSelect: 'none' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  style,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      style={style ? { ...BASE_STYLE, ...style } : BASE_STYLE}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
});

Button.displayName = 'Button';
