import { Switch, SwitchProps } from "@heroui/react";
import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppSwitchProps extends Omit<SwitchProps, "size" | "onChange"> {
  name: string;
  label?: string;
  required?: boolean;
  formMode?: FormMode;
  size?: "sm" | "md" | "lg";
  error?: string | boolean;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
  onChange?: (isSelected: boolean) => void;
}

export const AppSwitch = forwardRef<HTMLInputElement, AppSwitchProps>(
  (
    {
      name,
      label,
      required = false,
      formMode = FormMode.CREATE,
      isSelected,
      onChange,
      onBlur,
      size = "md",
      error,
      helperText,
      containerClassName,
      errorClassName,
      className,
      isDisabled,
      classNames,
      ...rest
    },
    ref
  ) => {
    const isViewMode = formMode === FormMode.VIEW;
    const hasError = Boolean(error);

    const modeStyles = useMemo(() => {
      const baseWrapper = "transition-all duration-200";
      const baseThumb = "transition-all duration-200";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)]",
              "border border-[#DCF0F9] dark:border-primary-800"
            ),
            thumb: clsx(baseThumb, "bg-neutral-400 dark:bg-neutral-500")
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]"
            ),
            thumb: baseThumb
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-white dark:bg-secondary-1000"
            ),
            thumb: baseThumb
          };
      }
    }, [formMode]);

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      hasError && !isViewMode && "border-danger dark:border-danger-500",
      className
    );

    const thumbClasses = clsx(
      modeStyles.thumb,
      hasError && !isViewMode && "bg-danger dark:bg-danger-500"
    );

    return (
      <div className={clsx("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              "text-sm font-semibold leading-none",
              "text-secondary-900 dark:text-white",
              "transition-colors duration-200"
            )}
          >
            {label}
            {required && !isViewMode && (
              <span className="text-danger ml-1">*</span>
            )}
          </label>
        )}

        <Switch
          ref={ref}
          id={name}
          name={name}
          isSelected={isSelected}
          isDisabled={isViewMode || isDisabled}
          onValueChange={onChange}
          size={size}
          classNames={{
            wrapper: wrapperClasses,
            thumb: thumbClasses,
            ...classNames
          }}
          {...rest}
        />

        {hasError && typeof error === "string" && (
          <p className={clsx(
            "text-xs font-medium",
            "text-danger dark:text-danger-400",
            errorClassName
          )}>
            {error}
          </p>
        )}

        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppSwitch.displayName = "AppSwitch";