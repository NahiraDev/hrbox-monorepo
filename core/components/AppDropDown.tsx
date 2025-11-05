import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { useState } from 'react';
import clsx from 'clsx';

interface AppDropDownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface AppDropDownProps {
  title?: string;
  item: AppDropDownItem[];
  className?: string;
  EndIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  error?: any;
  label?: string;
  required?: boolean;
  labelClassName?: string;
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

const AppDropDown = ({ props }: { props: AppDropDownProps }) => {
  const {
    title,
    item,
    className,
    EndIcon,
    startIcon,
    size = 'md',
    radius = 'md',
    error,
    label,
    required = false,
    labelClassName,
  } = props;

  const [selected, setSelected] = useState<AppDropDownItem | null>(
    item.length > 0 ? item[0] : null
  );

  const handleSelect = (key: string) => {
    const found = item.find((item) => item.key === key);
    if (found) {
      setSelected(found);
    }
  };

  const buttonClassNames = clsx(
    'bg-white !shadow-theme-sm border-1 border-[#DEE1E8]',
    'transition-all duration-200',
    'hover:border-[#B8BCC8]',
    'focus:border-primary focus:shadow-lg',
    'data-[hover=true]:bg-white',
    error && 'border-red-500 bg-red-50',
    sizeClasses[size]?.button,
    radiusClasses[radius],
    className,
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
      <Dropdown>
        <DropdownTrigger>
          <Button className={buttonClassNames} variant="bordered">
            {startIcon && <span>{startIcon}</span>}
            {title ? (
              title
            ) : selected ? (
              <span className="flex flex-row items-center gap-1">
                {selected.icon}
                {selected.label}
              </span>
            ) : null}
            {EndIcon && <span>{EndIcon}</span>}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="flex flex-row justify-between"
          items={item}
          onAction={(key) => handleSelect(key as string)}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              className="flex w-full flex-row justify-center"
              classNames={{
                base: 'hover:bg-[#DCF0F940] transition-colors duration-200',
              }}
            >
              <span className="flex flex-row items-center gap-1">
                {item.icon}
                {item.label}
              </span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default AppDropDown;
