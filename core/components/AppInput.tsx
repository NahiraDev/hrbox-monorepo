import { Input } from '@heroui/react';
import clsx from 'clsx';

interface AppInputProps {
  label?: string;
  required?: boolean;
  error?: any;
  name: string;
  type?: string;
  variant?: any;
  color?: any;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  labelClassName?: string;
  placeHolderClass?: string;
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

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const AppInput = ({ props }: { props: AppInputProps }) => {
  const {
    label,
    required = true,
    error,
    name,
    type = 'text',
    variant = 'solid',
    color,
    startContent,
    endContent,
    onFocus,
    onBlur,
    onChange,
    value,
    size = 'md',
    radius = 'md',
    className,
    labelClassName,
    placeHolderClass,
    ...rest
  } = props;

  const inputWrapperClassNames = clsx(
    'bg-white !shadow-theme-sm border-1 border-[#DEE1E8]',
    'transition-all duration-200',
    'hover:border-[#B8BCC8]',
    'focus-within:border-primary focus-within:shadow-lg',
    error && 'border-red-500 bg-red-50 focus-within:border-red-500',
    sizeClasses[size]?.wrapper,
    radiusClasses[radius],
    className,
  );

  const inputClassNames = clsx(
    'placeholder:text-secondary-1000 placeholder:font-medium',
    placeHolderClass,
    error && 'text-red-500',
    sizeClasses[size]?.input,
  );

  const labelClassNames = clsx(
    'leading-5 text-secondary-1000',
    sizeClasses[size]?.label,
    labelClassName
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className={labelClassNames}>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <Input
        classNames={{
          inputWrapper: inputWrapperClassNames,
          input: inputClassNames,
        }}
        color={color}
        endContent={endContent}
        errorMessage={error}
        isRequired={required}
        name={name}
        placeholder={`Please enter ${label ?? 'value'} ...`}
        startContent={startContent}
        type={type}
        value={value}
        variant={variant}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        {...rest}
      />
    </div>
  );
};
