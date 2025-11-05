import { Textarea } from '@heroui/react';
import clsx from 'clsx';

const sizeClasses: Record<string, { wrapper: string; input: string; label: string }> = {
  sm: {
    wrapper: 'min-h-[80px] px-2 py-2 text-xs',
    input: 'text-xs',
    label: 'text-xs font-medium',
  },
  md: {
    wrapper: 'min-h-[100px] px-3 py-2 text-sm',
    input: 'text-sm',
    label: 'text-sm font-medium',
  },
  lg: {
    wrapper: 'min-h-[120px] px-4 py-3 text-base',
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

export const AppTextArea = ({ props }: { props: any }) => {
  const {
    label,
    required = false,
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
      <Textarea
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
