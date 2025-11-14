import React, { useMemo } from 'react';
import { Input } from '@heroui/react';
import { clsx } from 'clsx';
import type { InputProps } from '@heroui/react';
import { FormMode } from "@hrbox/uikit/components/types";

interface AppInputProps extends Omit<InputProps, 'onChange' | 'onBlur' | 'onFocus'> {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  name: string;
  formMode?: FormMode;
  isDisabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const AppInputComponent = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      required = true,
      error,
      name,
      formMode = FormMode.CREATE,
      isDisabled = false,
      onFocus,
      onBlur,
      onChange,
      helperText,
      containerClassName,
      errorClassName,
      className,
      startContent,
      endContent,
      ...rest
    },
    ref
  ) => {
    const modeStyles = useMemo(() => {
      const baseInput = 'text-sm font-medium transition-all duration-200 rounded-lg';
      const baseWrapper = '!h-10 !px-3 !py-2.5';

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-neutral-50 dark:bg-neutral-900',
              'border-1 border-neutral-200 dark:border-neutral-700',
              'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ),
            input: clsx(baseInput, 'text-neutral-600 dark:text-neutral-300 cursor-default'),
            isDisabled: true,
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-panel-surface dark:bg-neutral-800',
              'border-1.5 border-primary-200 dark:border-primary-700',
              'hover:border-primary-300 dark:hover:border-primary-600',
              'focus-within:border-panel-primary focus-within:shadow-md'
            ),
            input: clsx(baseInput, 'text-secondary-900 dark:text-white'),
            isDisabled: false,
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-white dark:bg-neutral-800',
              'dark:border-neutral-600',
              'hover:border-primary-300 dark:hover:border-primary-600',
              'focus-within:border-panel-primary focus-within:shadow-lg'
            ),
            input: clsx(baseInput, 'text-secondary-900 dark:text-white'),
            isDisabled: false,
          };
      }
    }, [formMode]);

    const hasError = Boolean(error);
    const isViewMode = formMode === FormMode.VIEW;

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      hasError &&
      !isViewMode &&
      'border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20 rounded-lg',
      className
    );

    const inputClasses = clsx(
      modeStyles.input,
      hasError && !isViewMode && 'text-danger dark:text-danger-400',
      'placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-[#DCF0F9]'
    );

    return (
      <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              'text-sm font-semibold leading-none',
              'text-secondary-900 dark:text-white',
              'transition-colors duration-200'
            )}
          >
            {label}
            {required && !isViewMode && (
              <span className="text-danger ml-1">*</span>
            )}
          </label>
        )}

        {/* Input */}
        <Input
          ref={ref}
          id={name}
          name={name}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          classNames={{
            inputWrapper: wrapperClasses,
            input: inputClasses,
            errorMessage: clsx(
              'text-xs font-medium',
              'text-danger dark:text-danger-400',
              errorClassName
            ),
          }}
          startContent={startContent}
          endContent={endContent}
          errorMessage={hasError ? error : ''}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />

        {/* Helper Text */}
        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppInputComponent.displayName = 'AppInput';

export const AppInput = AppInputComponent;