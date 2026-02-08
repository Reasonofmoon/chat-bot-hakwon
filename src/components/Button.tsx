import React, { memo, forwardRef } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
}

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  isLoading,
  loadingText = "Loading...",
  loadingPosition = 'start',
  disabled,
  children,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      {...props}
    >
      {isLoading ? (
        <>
          {loadingPosition === 'start' && (
            <Spinner
              style={{
                alignSelf: 'center',
                marginRight: loadingText ? '0.5em' : undefined,
              }}
            />
          )}
          {loadingText}
          {loadingPosition === 'end' && (
            <Spinner
              style={{
                alignSelf: 'center',
                marginLeft: loadingText ? '0.5em' : undefined,
              }}
            />
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
}));

Button.displayName = 'Button';
