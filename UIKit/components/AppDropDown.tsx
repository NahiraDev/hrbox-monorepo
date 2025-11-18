import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import React, { useState, useMemo, forwardRef } from "react";
import clsx from 'clsx';

export interface AppDropDownItem {
  key: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

interface AppDropDownProps {
  name?: string;
  title?: string;
  items: AppDropDownItem[];
  selectedKey?: string | number;
  className?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  error?: any;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  onChange?: (key: string | number) => void;
  onOpenChange?: (isOpen: boolean) => void;
  variant?: 'solid' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'light';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isDisabled?: boolean;
  isLoading?: boolean;
}

const sizeClasses: Record<string, { button: string; label: string }> = {
  sm: {
    button: 'h-8 px-2 text-xs',
    label: 'text-xs font-medium',
  },
  md: {
    button: 'h-10 px-3 text-sm',
    label: 'text-sm font-medium',
  },
  lg: {
    button: 'h-12 px-4 text-base',
    label: 'text-base font-semibold',
  },
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/**
 * ✅ AppDropDown - بهبور یافته
 */
export const AppDropDown = forwardRef<HTMLButtonElement, AppDropDownProps>(
  (
    {
      name,
      title,
      items = [],
      selectedKey,
      className,
      endIcon,
      startIcon,
      size = 'md',
      radius = 'md',
      error,
      label,
      required = false,
      labelClassName,
      onChange,
      onOpenChange,
      variant = 'bordered',
      color = 'default',
      isDisabled = false,
      isLoading = false,
    },
    ref
  ) => {
    const [selected, setSelected] = useState<AppDropDownItem | null>(
      items.find((item) => item.key === selectedKey) || (items.length > 0 ? items[0] : null)
    );

    // دریافت متن نمایشی
    const displayText = useMemo(() => {
      if (title) return title;
      if (selected) {
        return (
          <span className="flex items-center gap-2">
            {selected.icon && <span>{selected.icon}</span>}
            <span>{selected.label}</span>
          </span>
        );
      }
      return 'انتخاب گزینه...';
    }, [title, selected]);

    const handleSelect = (key: string | number) => {
      const found = items.find((item) => item.key === key);
      if (found) {
        setSelected(found);
        onChange?.(key);
      }
    };

    const hasError = Boolean(error);

    const buttonClassNames = clsx(
      'transition-all duration-200 font-medium',
      sizeClasses[size]?.button,
      radiusClasses[radius],
      variant === 'bordered' && clsx(
        'border border-neutral-300 dark:border-neutral-600',
        'hover:border-primary-300 dark:hover:border-primary-600',
        'focus:border-primary'
      ),
      hasError && variant === 'bordered' && 'border-danger bg-danger-50 dark:bg-danger-900/20',
      className
    );

    const labelClassNames = clsx(
      'text-sm font-semibold text-secondary-900 dark:text-white',
      sizeClasses[size]?.label,
      labelClassName
    );

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label className={labelClassNames}>
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        {/* Dropdown */}
        <Dropdown
          onOpenChange={onOpenChange}
          isDisabled={isDisabled || isLoading}
        >
          <DropdownTrigger>
            <Button
              ref={ref}
              className={buttonClassNames}
              variant={variant as any}
              color={color as any}
              isLoading={isLoading}
              endContent={endIcon || undefined}
              startContent={startIcon || undefined}
            >
              {displayText}
            </Button>
          </DropdownTrigger>

          {/* Menu */}
          <DropdownMenu
            aria-label="Select item"
            items={items}
            onAction={(key) => handleSelect(key as string | number)}
            classNames={{
              base: 'dark:bg-neutral-800 dark:border-neutral-700',
            }}
          >
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.color || 'default'}
                className="transition-colors duration-200"
                startContent={item.icon}
                description={item.description}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* Error */}
        {hasError && (
          <span className="text-xs text-danger font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AppDropDown.displayName = 'AppDropDown';