import { memo, type ButtonHTMLAttributes, type CSSProperties, type ReactNode, type Ref } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const BASE_STYLE: CSSProperties = { userSelect: 'none' };

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
