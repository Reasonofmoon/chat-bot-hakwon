import React, { memo, forwardRef, useMemo } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  loadingPosition?: 'start' | 'end';
  // Security: strict no-danger policy
  dangerouslySetInnerHTML?: never;
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

// Hoist Spinner elements to avoid allocation on every render
const SPINNER_START_EL = <Spinner style={SPINNER_STYLE_START} />;
const SPINNER_END_EL = <Spinner style={SPINNER_STYLE_END} />;
const SPINNER_CENTER_EL = <Spinner style={SPINNER_STYLE_CENTER} />;

// Optimized with React.memo to prevent unnecessary re-renders
export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
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
  formAction,
  ...props
}, ref) => {
  // Security: Explicitly strip javascript: URLs from formAction to enforce Safe By Design.
  // While React 19 blocks execution at runtime, we prefer to remove the attribute entirely.
  const safeFormAction = useMemo(() => {
    if (typeof formAction === 'string' && /^\s*javascript:/i.test(formAction)) {
      console.warn('Security: javascript: URLs are forbidden in formAction.');
      return undefined;
    }
    return formAction;
  }, [formAction]);

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
      formAction={safeFormAction}
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
}));

Button.displayName = 'Button';
