import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ isLoading, disabled, children, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
