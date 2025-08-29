import { Input } from '@heroui/react';
import clsx from 'clsx';
import React from 'react';

interface AppInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  name?: string;
  type?: string;
  value?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const sizeClasses: Record<
  string,
  { wrapper: string; input: string; label: string }
> = {
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
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const AppInput = ({ props }: { props: AppInputProps }) => {
  const {
    label,
    required,
    error,
    name,
    type = 'text',
    value,
    startContent,
    endContent,
    onFocus,
    onBlur,
    onChange,
    size = 'md',
    radius = 'md',
    className,
    ...rest
  } = props;

  const inputWrapperClassNames = clsx(
    '!bg-white dark:!bg-info-1000',
    'border border-primary-0 !backdrop_blur[35px]',
    'dark:border-primary-0 dark:!shadow-secondary',
    error && '!border-red-500 !bg-red-100 dark:bg-red-800',
    sizeClasses[size]?.wrapper,
    radiusClasses[radius],
    className,
  );

  const inputClassNames = clsx(
    'placeholder:text-secondary-1000 lg:placeholder:leading-5 placeholder:leading-normal',
    'placeholder:font-medium',
    error && 'text-red-500',
    sizeClasses[size]?.input,
  );

  const labelClassNames = clsx('leading-5', sizeClasses[size]?.label);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className={labelClassNames}>
          {label} {required && '*'}
        </span>
      )}
      <Input
        classNames={{
          inputWrapper: inputWrapperClassNames,
          input: inputClassNames,
        }}
        endContent={endContent}
        errorMessage={error}
        isRequired={required}
        name={name}
        placeholder={`Please enter ${label ?? 'value'} ...`}
        startContent={startContent}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        {...rest}
      />
    </div>
  );
};

export default AppInput;
