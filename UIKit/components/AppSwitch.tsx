import {Switch, SwitchProps} from '@heroui/react';
import {useAppSelector} from '@hrbox/core/redux/hooks';
import clsx from 'clsx';
import {forwardRef} from "react";
import {FormMode} from "@hrbox/uikit/components/types";

interface AppSwitchProps extends Omit<SwitchProps, 'size'> {
    label?: string;
    formMode?: FormMode;
    size?: 'sm' | 'md' | 'lg';
}


export const AppSwitch = forwardRef<HTMLInputElement, AppSwitchProps>(
    (
        {
            label,
            formMode = FormMode.CREATE,
            isSelected,
            onChange,
            onBlur,
            size = 'md',
            className,
            isDisabled,
            classNames,
            ...rest
        },
        ref
    ) => {
        const isViewMode = formMode === FormMode.VIEW;

        return (
            <div className={clsx(
                'flex items-center gap-2',
                isViewMode && 'pointer-events-none opacity-75',
                className
            )}>
                <Switch
                    ref={ref}
                    isSelected={isSelected}
                    isDisabled={isViewMode || isDisabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    size={size}
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