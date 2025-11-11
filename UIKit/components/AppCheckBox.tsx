import { Checkbox, CheckboxProps } from '@heroui/react';
import { forwardRef } from "react";
import { FormMode } from "@hrbox/uikit/components/types";
import { clsx } from "clsx";

interface AppCheckBoxProps extends CheckboxProps {
  formMode?: FormMode;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeCheckbox: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const AppCheckBox = forwardRef<HTMLInputElement, AppCheckBoxProps>(
  (
    {
      formMode = FormMode.CREATE,
      size = 'md',
      radius = 'md',
      children,
      className,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const isViewMode = formMode === FormMode.VIEW;

    return (
      <Checkbox
        ref={ref}
        classNames={{
          wrapper: clsx(sizeCheckbox[size], `rounded-${radius}`, className),
          label: 'text-sm font-medium text-secondary-900 dark:text-white',
        }}
        isDisabled={isViewMode || isDisabled}
        {...rest}
      >
        {children}
      </Checkbox>
    );
  }
);

AppCheckBox.displayName = 'AppCheckBox';