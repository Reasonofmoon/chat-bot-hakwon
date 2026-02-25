import React, { memo, useMemo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
  // Security: strict no-danger policy
  dangerouslySetInnerHTML?: never;
  // React 19: ref is now a prop
  ref?: React.Ref<HTMLButtonElement>;
}

const SPINNER_STYLE_START = { marginRight: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_END = { marginLeft: '0.5em', alignSelf: 'center' };
const SPINNER_STYLE_CENTER = { alignSelf: 'center' };

const BASE_BUTTON_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const LOADING_STYLE: React.CSSProperties = { ...BASE_BUTTON_STYLE, cursor: 'wait' };
const DISABLED_STYLE: React.CSSProperties = { ...BASE_BUTTON_STYLE, cursor: 'not-allowed' };
const DEFAULT_STYLE: React.CSSProperties = { ...BASE_BUTTON_STYLE, cursor: 'pointer' };

// Security: Hoist regex to prevent reallocation on every render
const JAVASCRIPT_PROTOCOL_REGEX = /^\s*javascript:/i;

// Hoist Spinner elements to avoid allocation on every render
const SPINNER_START_EL = <Spinner style={SPINNER_STYLE_START} />;
const SPINNER_END_EL = <Spinner style={SPINNER_STYLE_END} />;
const SPINNER_CENTER_EL = <Spinner style={SPINNER_STYLE_CENTER} />;

// Optimized with React.memo to prevent unnecessary re-renders
// Optimized: Removed forwardRef wrapper as it is no longer needed in React 19, reducing component tree depth.
export const Button = memo(({
  isLoading,
  loadingText = "Loading...",
  loadingPosition = "start",
  disabled,
  children,
  type = "button",
  "aria-label": ariaLabel,
  style,
  // Security: exclude dangerouslySetInnerHTML to prevent XSS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dangerouslySetInnerHTML,
  ref,
  formAction,
  ...props
}: ButtonProps) => {
  // Security: prevent execution of javascript: URLs even if framework handles it
  if (typeof formAction === 'string' && JAVASCRIPT_PROTOCOL_REGEX.test(formAction)) {
    throw new Error('Security: javascript: URLs are not allowed in formAction.');
  }

  const effectiveAriaLabel = ariaLabel || (isLoading && !loadingText ? "Loading" : undefined);
  const isStart = loadingPosition === 'start';

  // Determine spinner element based on position and presence of text
  const spinnerElement = loadingText
    ? (isStart ? SPINNER_START_EL : SPINNER_END_EL)
    : SPINNER_CENTER_EL;

  const cursor = isLoading ? 'wait' : (disabled ? 'not-allowed' : 'pointer');

  // Memoize style object to ensure referential stability.
  // Optimization: use static style objects when no custom style is provided to avoid allocation.
  const mergedStyle = useMemo(() => {
    if (style) {
      return {
        ...BASE_BUTTON_STYLE,
        ...style,
        cursor
      };
    }
    if (cursor === 'wait') return LOADING_STYLE;
    if (cursor === 'not-allowed') return DISABLED_STYLE;
    return DEFAULT_STYLE;
  }, [cursor, style]);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={effectiveAriaLabel}
      style={mergedStyle}
      formAction={formAction}
      {...props}
    >
      {isLoading ? (
        <>
          {isStart && spinnerElement}
          {loadingText}
          {!isStart && spinnerElement}
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
