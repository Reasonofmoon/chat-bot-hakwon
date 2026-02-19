import { memo, useMemo, type ButtonHTMLAttributes, type ReactNode, type Ref, type CSSProperties } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: ReactNode;
}

const spinnerStyle = { marginRight: '0.5em', alignSelf: 'center' };
const centerStyle = { alignSelf: 'center' };
// Optimization: Prevent text selection on buttons to avoid layout thrashing and improve UX
const BASE_BUTTON_STYLE: CSSProperties = { userSelect: 'none' };

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
  // Optimization: Merge base styles with user-provided styles, memoizing the result to maintain reference stability
  const finalStyle = useMemo(() => {
    return props.style ? { ...BASE_BUTTON_STYLE, ...props.style } : BASE_BUTTON_STYLE;
  }, [props.style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
      style={finalStyle}
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
