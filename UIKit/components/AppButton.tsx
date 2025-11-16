import { Button } from '@heroui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

const sizeClasses: Record<string, string> = {
  xs: 'px-2 py-1 text-xs h-fit',
  sm: 'px-3 py-1.5 text-sm h-fit',
  md: 'px-4 py-2 text-base h-fit',
  lg: 'px-5 py-2.5 text-lg h-fit',
  xl: 'px-6 py-3 text-xl h-fit',
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

interface AppButtonProps {
  content?: React.ReactNode;
  fullWidth?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isIconOnly?: boolean;
  radius?: keyof typeof radiusClasses;
  disableRipple?: boolean;
  size?: keyof typeof sizeClasses;
  type?:any;
  variant?: string;
  color?: string;
  className?:string;
  isLoading?:boolean;
  isDisabled?:boolean;
  onPress?: () => void;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      content,
      fullWidth = false,
      size = 'md',
      radius = 'md',
      variant = 'solid',
      type = 'button',
      color,
      className,
      isLoading = false,
      isDisabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={clsx(
          'font-medium transition-all h-fit duration-200',
          'flex items-center justify-center min-w-fit gap-2',
          sizeClasses[size as keyof typeof sizeClasses],
          radiusClasses[radius],
          fullWidth && 'w-full',
          isLoading && 'opacity-70',
          className
        )}
        color={color as any}
        variant={variant as any}
        type={type}
        radius={radius as any}
        size={size as any}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...rest}
      >
        {content}
      </Button>
    );
  }
);

AppButton.displayName = 'AppButton';


