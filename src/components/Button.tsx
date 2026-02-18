import { memo, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: ReactNode;
}

const spinnerStyle = { marginRight: '0.5em', alignSelf: 'center' };
const centerStyle = { alignSelf: 'center' };

// Pre-allocate Spinner elements to avoid object allocation and skip reconciliation
// when loadingText stability doesn't change
const spinnerWithText = <Spinner style={spinnerStyle} />;
const spinnerCentered = <Spinner style={centerStyle} />;

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  ref,
  // explicit exclusion of dangerous prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ...props
}: ButtonProps & { ref?: Ref<HTMLButtonElement>; dangerouslySetInnerHTML?: never }) => {
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
          {loadingText ? spinnerWithText : spinnerCentered}
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
