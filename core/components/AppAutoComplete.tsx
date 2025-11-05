import type { Key } from 'react';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import clsx from 'clsx';

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

const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

export const AppAutoComplete = ({ props }: { props: any }) => {
  const {
    name,
    label,
    required = false,
    displayKey = 'Name',
    valueKey = 'Id',
    data = [],
    formik,
    error,
    variant = 'flat',
    className,
    classNames: customClassNames,
    color,
    size = 'md',
    radius = 'md',
    labelClassName,
    ...rest
  } = props;

  const labelId = `${name}-label`;
  const selectedValue = formik?.values?.[name];
  const selectedItem = data.find((item: any) => String(item[valueKey]) === String(selectedValue));
  const selectedKey = selectedItem ? String(selectedItem[valueKey]) : null;

  const handleSelectionChange = (key: Key | null) => {
    if (!formik || typeof formik.setFieldValue !== 'function') return;
    formik.setFieldValue(name, key ?? '');
  };

  // 👇 این classNames ها رو تغییر بدید
  const baseClassNames = clsx(
    '!shadow-none', // 👈 shadow پیش‌فرض رو حذف کنید
    className,
  );

  const inputWrapperClassNames = clsx(
    error && '!border-red-500 !bg-red-50',
    sizeClasses[size]?.wrapper,
    radiusClasses[radius],
  );

  const inputClassNames = clsx(
    'placeholder:text-secondary-1000 placeholder:font-medium',
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
        <label className={labelClassNames} id={labelId}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Autocomplete
        aria-labelledby={label ? labelId : undefined}
        className={baseClassNames} // 👈 از baseClassNames استفاده کنید
        classNames={{
          base: clsx('!shadow-none', customClassNames?.base), // 👈 shadow رو حذف کنید
          listboxWrapper: customClassNames?.listboxWrapper,
          popoverContent: customClassNames?.popoverContent,
          selectorButton: customClassNames?.selectorButton,
          inputWrapper: inputWrapperClassNames && customClassNames?.inputWrapper,
          input: inputClassNames,
        }}
        color={color}
        selectedKey={selectedKey}
        variant={variant}
        onSelectionChange={handleSelectionChange}
        placeholder={`Please select ${label ?? 'option'} ...`}
        {...rest}
      >
        {data.map((option: any) => {
          const key = option[valueKey];
          const displayLabel = getValueByPath(option, displayKey) || '';

          return <AutocompleteItem key={key}>{displayLabel}</AutocompleteItem>;
        })}
      </Autocomplete>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};
