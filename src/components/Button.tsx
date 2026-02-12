import React, { memo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  dangerouslySetInnerHTML?: never;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  // Ensure accessible label for icon-only loading state
  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];
  const fallbackLabel = (isLoading && !loadingText && !ariaLabel && !ariaLabelledBy) ? 'Loading' : undefined;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
      aria-label={ariaLabel || fallbackLabel}
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
