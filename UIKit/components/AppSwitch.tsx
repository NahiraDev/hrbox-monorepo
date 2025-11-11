import { Switch, SwitchProps } from '@heroui/react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import clsx from 'clsx';
import { forwardRef } from "react";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppSwitchProps extends SwitchProps {
  label?: string;
  formMode?: FormMode;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full';
}

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

/**
 * ✅ AppSwitch - updated with FormMode
 */
export const AppSwitch = forwardRef<HTMLInputElement, AppSwitchProps>(
  (
    {
      label,
      formMode = FormMode.CREATE,
      isSelected,
      onChange,
      onBlur,
      value,
      size = 'md',
      radius = 'full',
      className,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const lang = useAppSelector((state) => state.language.lang);
    const isViewMode = formMode === FormMode.VIEW;

    return (
      <div className={clsx(
        'flex items-center gap-2',
        isViewMode && 'pointer-events-none opacity-75'
      )}>
        <Switch
          ref={ref}
          classNames={{
            thumb: clsx(
              'shadow-lg transition-all duration-300',
              'dark:bg-info-1000 dark:shadow-lg',
              'group-data-[selected=true]:ms-2.5',
              sizeThumb[size],
              isSelected && (lang === 'en' ? '!mr-auto' : '!ml-auto'),
            ),
            wrapper: clsx(
              'flex items-center justify-start transition-all duration-500',
              'bg-neutral-200 dark:bg-neutral-700',
              'group-data-[selected=true]:bg-primary-400',
              sizeWrapper[size],
              `rounded-${radius}`,
              className,
            ),
          }}
          isSelected={isSelected}
          isDisabled={isViewMode || isDisabled}
          onValueChange={onChange}
          onBlur={onBlur}
          {...rest}
        >
          {label && (
            <span className="text-sm font-semibold text-secondary-900 dark:text-white">
              {label}
            </span>
          )}
        </Switch>
      </div>
    );
  }
);

AppSwitch.displayName = 'AppSwitch';