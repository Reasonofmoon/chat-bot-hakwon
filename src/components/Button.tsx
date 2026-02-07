import React, { memo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const spinnerStyle = { marginRight: '0.5em', alignSelf: 'center' };
const centerStyle = { alignSelf: 'center' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  ref,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={
        ariaLabel ||
        (isLoading && !loadingText ? "Loading" : undefined)
      }
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner style={loadingText ? spinnerStyle : centerStyle} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
