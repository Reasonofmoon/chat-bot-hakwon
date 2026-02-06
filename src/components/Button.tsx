import React, { memo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  /**
   * Ref is forwarded to the underlying button element.
   * In React 19, ref is available as a prop.
   */
  ref?: React.Ref<HTMLButtonElement>;
}

const spinnerStyle = { marginInlineEnd: '0.5em', alignSelf: 'center', verticalAlign: 'middle' };
const centerStyle = { alignSelf: 'center', verticalAlign: 'middle' };
const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

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
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner style={loadingText ? spinnerStyle : centerStyle} />
          {loadingText || <span style={srOnlyStyle}>Loading</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
