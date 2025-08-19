import { Checkbox } from '@heroui/react';
import clsx from 'clsx';

const sizeClasses: Record<string, { wrapper: string; label: string }> = {
  sm: {
    wrapper: 'w-4 h-4 text-xs',
    label: 'text-xs',
  },
  md: {
    wrapper: 'w-5 h-5 text-sm',
    label: 'text-sm',
  },
  lg: {
    wrapper: 'w-6 h-6 text-base',
    label: 'text-base',
  },
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export default function AppCheckbox({ props }: { props: any }) {
  const {
    disabled,
    isSelected,
    radius = 'md',
    size = 'md',
    children,
    className,
    onChange,
    ...rest
  } = props;

  return (
    <Checkbox
      classNames={{
        wrapper: clsx(
          sizeClasses[size]?.wrapper,
          radiusClasses[radius],
          className,
        ),
        label: clsx(
          sizeClasses[size]?.label,
        ),
      }}
      disabled={disabled}
      isSelected={isSelected}
      radius={radius}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Checkbox>
  );
}
