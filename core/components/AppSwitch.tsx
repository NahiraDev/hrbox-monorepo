import { cn, Switch } from '@heroui/react';

import { useAppSelector } from '../redux';

const sizeWrapper: Record<string, string> = {
  sm: '!w-[30px] !h-[18px]',
  md: '!w-[40px] !h-[22px]',
  lg: '!w-[50px] !h-[28px]',
};

const sizeThumb: Record<string, string> = {
  sm: '!w-3 !h-3',
  md: '!w-4 !h-4',
  lg: '!w-5 !h-5',
};

const sizeLabel: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const AppSwitch = ({ props }: { props: any }) => {
  const {
    isSelected,
    onChange,
    value,
    label,
    size = 'sm',
    radius = 'full',
    className,
    ...rest
  } = props;

  const lang = useAppSelector((state) => state.language.lang);

  return (
    <Switch
      classNames={{
        thumb: cn(
          'shadow-lg transition-all duration-300 ease-in-out transform',
          'dark:bg-info-1000 dark:shadow-lg',
          'group-data-[selected=true]:ms-2.5',
          'scale-100',
          isSelected && (lang === 'en' ? '!mr-auto' : '!ml-auto'),
          sizeThumb[size],
        ),
        wrapper: cn(
          'flex items-center justify-start transition-all duration-500 ease-in-out',
          'bg-neutral-200 text-info-1000 dark:bg-neutral-100',
          'group-data-[selected=true]:bg-primary-400',
          sizeWrapper[size],
          radiusClasses[radius],
          className,
        ),
      }}
      isSelected={isSelected}
      size={size}
      onValueChange={onChange}
      onBlur={handleChange}
      value={value}
      {...rest}
    >
      <span
        className={cn('text-secondary-1000 font-semibold', sizeLabel[size])}
      >
        {label}
      </span>
    </Switch>
  );
};

export default AppSwitch;
