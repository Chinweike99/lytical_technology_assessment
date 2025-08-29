
import React, { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determine if the input is active (focused or has value)
    const isActive = isFocused || (!!props.value && props.value.toString().length > 0);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const baseClassName = `
      w-full
      px-3
      py-2
      border
      border-gray-300
      rounded-md
      shadow-sm
      placeholder-gray-400
      disabled:bg-gray-50
      disabled:text-gray-500
      outline-none
      disabled:cursor-not-allowed
      ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className="w-full relative">
        {label && isActive && (
          <label className="absolute -top-2 left-2 px-1 bg-white text-xs font-medium text-gray-700 z-10">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={baseClassName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}  
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
