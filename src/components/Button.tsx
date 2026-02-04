import { memo } from 'react';
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: ReactNode;
  /**
   * React 19 allows ref to be passed as a prop.
   */
  ref?: Ref<HTMLButtonElement>;
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
  ...props
}: ButtonProps) => {
  // Ensure we have an accessible name when loading with no text
  const ariaLabel = props['aria-label'];
  const hasAccessibleName = ariaLabel || props['aria-labelledby'];
  const effectiveAriaLabel = !hasAccessibleName && isLoading && !loadingText ? "Loading" : ariaLabel;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
      aria-label={effectiveAriaLabel}
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
