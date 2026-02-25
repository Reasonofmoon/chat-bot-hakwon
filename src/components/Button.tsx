import React, { memo, useMemo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const spinnerStyle = { marginRight: '0.5em', alignSelf: 'center' };
const centerStyle = { alignSelf: 'center' };

const LOADING_CURSOR = { cursor: 'wait' };
const DISABLED_CURSOR = { cursor: 'not-allowed' };

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  ref,
  style,
  'aria-label': ariaLabel,
  // explicit exclusion of dangerous prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement>; dangerouslySetInnerHTML?: never }) => {
  const mergedStyle = useMemo(() => {
    if (isLoading) {
      return style ? { ...style, ...LOADING_CURSOR } : LOADING_CURSOR;
    }
    if (disabled) {
      return style ? { ...style, ...DISABLED_CURSOR } : DISABLED_CURSOR;
    }
    return style;
  }, [isLoading, disabled, style]);

  const effectiveLabel = (isLoading && !loadingText && !ariaLabel) ? "Loading" : ariaLabel;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveLabel}
      style={mergedStyle}
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
