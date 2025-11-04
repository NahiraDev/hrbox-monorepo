import { Textarea } from '@heroui/react';
import clsx from 'clsx';



interface AppTextAreaProps {
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
  mode?: 'edit' | 'show'; // <-- اضافه شد
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

export const AppTextArea = ({ props }: { props: AppTextAreaProps }) => {
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
    mode = 'edit',
    className,
    ...rest
  } = props;


  const labelClassNames = clsx('leading-5', sizeClasses[size]?.label);


  const isShowMode = mode === 'show';

  const inputWrapperClassNames = clsx(
    '!shadow-theme-sm border-1 text-secondary-1000 !font-medium',
    isShowMode
      ? 'border-transparent cursor-default bg-gradient-to-r from-white via-sky-100 to-white text-secondary-400'
      : 'border-[#DEE1E8] bg-white',
    error && 'border-red-500 bg-red-100 dark:bg-red-800',
    sizeClasses[size]?.wrapper,
    radiusClasses[radius],
    className,
  );

  const inputClassNames = clsx(
    'placeholder:text-secondary-1000',
    'placeholder:font-medium',
    error && 'text-red-500',
    sizeClasses[size]?.input,
    isShowMode && 'cursor-default',
  );


  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className={labelClassNames}>
          {label} {required && '*'}
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
        {...(isShowMode ? { readOnly: true } : {})}
        onChange={onChange}
        onFocus={onFocus}
        {...rest}
      />
    </div>
  );
};
