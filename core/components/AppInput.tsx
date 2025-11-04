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
  mode?: 'edit' | 'show'; // <-- اضافه شد
}

const sizeClasses: Record<string, { wrapper: string; input: string; label: string }> = {
  // ... بدون تغییر
};

const radiusClasses: Record<string, string> = {
  // ... بدون تغییر
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
    mode = 'edit', // <-- پیش‌فرض edit
    ...rest
  } = props;

  // منطق show mode
  const isShowMode = mode === 'show';

  const inputWrapperClassNames = clsx(
    '!shadow-theme-sm !font-medium border border-surface-50',
    isShowMode
      ? 'border-transparent cursor-default  bg-gradient-to-r from-white via-sky-100 to-white text-secondary-400'
      : 'border-[#DEE1E8] bg-white ',
    error && 'border-red-500 bg-red-100 dark:bg-red-800',
    sizeClasses[size]?.wrapper,
    radiusClasses[radius],
    className,
  );

  const inputClassNames = clsx(
    'placeholder:text-secondary-1000',
    'placeholder:!font-medium',
    error && 'text-red-500',
    sizeClasses[size]?.input,
    isShowMode && 'cursor-default',
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className={clsx('leading-5', sizeClasses[size]?.label)}>
          {label} {required && !isShowMode && '*'}
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
        isRequired={required && !isShowMode}
        name={name}
        placeholder={isShowMode ? '' : `Bitte ${label ?? 'value'} eingeben ...`}
        startContent={startContent}
        type={type}
        value={value}
        variant={variant}
        onBlur={isShowMode ? undefined : onBlur}
        onChange={isShowMode ? undefined : onChange}
        onFocus={isShowMode ? undefined : onFocus}
        isDisabled={isShowMode}
        {...rest}
      />
    </div>
  );
};
