import { Select, SelectItem, SelectProps } from '@heroui/react';
import React, { forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { FormMode } from '@hrbox/uikit/components/forms';

export interface SelectOption {
  key: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface AppSelectProps extends Omit<SelectProps, 'onChange' | 'onBlur' | 'onFocus'> {
  name: string;
  label?: string;
  required?: boolean;
  formMode?: FormMode;
  options: SelectOption[];
  error?: string | boolean;
  helperText?: string;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (value: string | number) => void;
  containerClassName?: string;
  selectedKey?: string | number;
}

const sizeClasses: Record<string, { wrapper: string; input: string; label: string }> = {
  sm: {
    wrapper: 'h-8 px-2 text-xs',
    input: 'text-xs',
    label: 'text-xs font-medium',
  },
  md: {
    wrapper: 'h-10 px-3 text-sm',
    input: 'text-sm',
    label: 'text-sm font-medium',
  },
  lg: {
    wrapper: 'h-12 px-4 text-base',
    input: 'text-base',
    label: 'text-base font-semibold',
  },
};

/**
 * ✅ AppSelect - HeroUI Select with FormMode support
 */
export const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  (
    {
      name,
      label,
      required = false,
      formMode = FormMode.CREATE,
      options = [],
      error,
      helperText,
      onBlur,
      onFocus,
      onChange,
      containerClassName,
      size = 'md',
      selectedKey,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const isViewMode = formMode === FormMode.VIEW;
    const hasError = Boolean(error);

    // استایل بر اساس mode
    const modeStyles = useMemo(() => {
      const baseWrapper = sizeClasses[size]?.wrapper || sizeClasses.md.wrapper;

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-neutral-50 dark:bg-neutral-900',
              'border border-neutral-200 dark:border-neutral-700',
              'cursor-default'
            ),
            input: clsx(sizeClasses[size]?.input, 'text-neutral-600 dark:text-neutral-400'),
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-panel-surface dark:bg-neutral-800',
              'border-1.5 border-primary-200 dark:border-primary-700',
              'focus-within:border-panel-primary'
            ),
            input: clsx(sizeClasses[size]?.input, 'text-secondary-900 dark:text-white'),
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              'bg-white dark:bg-neutral-800',
              'border border-neutral-300 dark:border-neutral-600',
              'focus-within:border-panel-primary'
            ),
            input: clsx(sizeClasses[size]?.input, 'text-secondary-900 dark:text-white'),
          };
      }
    }, [formMode, size]);

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      hasError && !isViewMode && 'border-danger bg-danger-50 dark:bg-danger-900/20',
      'rounded-lg'
    );

    const inputClasses = clsx(
      modeStyles.input,
      hasError && !isViewMode && 'text-danger dark:text-danger-400'
    );

    return (
      <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
        {/* Label */}
        {label && (
          <label className="text-sm font-semibold text-secondary-900 dark:text-white">
            {label}
            {required && !isViewMode && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        {/* Select */}
        <Select
          ref={ref}
          name={name}
          selectedKeys={selectedKey ? [String(selectedKey)] : []}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            if (onChange && key) {
              onChange(key as string);
            }
          }}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          onFocus={onFocus}
          onBlur={onBlur}
          classNames={{
            trigger: wrapperClasses,
            value: inputClasses,
            popoverContent: 'dark:bg-neutral-800',
          }}
          placeholder={`انتخاب ${label || 'گزینه'}...`}
          {...rest}
        >
          {options.map((option) => (
            <SelectItem
              key={option.key}
              value={option.key}
              className="text-secondary-900 dark:text-white"
              startContent={option.icon}
              description={option.description}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>

        {/* Error */}
        {hasError && (
          <span className="text-xs text-danger">{error}</span>
        )}

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

AppSelect.displayName = 'AppSelect';