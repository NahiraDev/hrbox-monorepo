import React, { useMemo } from "react";
import type { RadioGroupProps } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { clsx } from "clsx";
import { FormMode } from "@hrbox/uikit/components/types";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface AppRadioProps extends Omit<RadioGroupProps, "children"> {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  name: string;
  formMode?: FormMode;
  isDisabled?: boolean;
  options: RadioOption[];
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
  orientation?: "horizontal" | "vertical";
}

const AppRadioComponent = React.forwardRef<HTMLDivElement, AppRadioProps>(
  (
    {
      label,
      required = true,
      error,
      name,
      formMode = "view",
      isDisabled = false,
      options,
      helperText,
      containerClassName,
      errorClassName,
      className,
      orientation = "vertical",
      ...rest
    },
    ref
  ) => {
    const modeStyles = useMemo(() => {
      const baseRadio = "text-sm font-medium transition-all duration-200";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              "bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)]",
              "border border-[#DCF0F9] dark:border-primary-800 rounded-lg p-3",
              "cursor-default"
            ),
            radio: clsx(
              baseRadio,
              "text-neutral-600 dark:text-neutral-300",
              "cursor-default opacity-80"
            ),
            radioControl: "cursor-default",
            isDisabled: true
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]",
              "border border-transparent rounded-lg p-3",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "focus-within:border-primary"
            ),
            radio: clsx(baseRadio, "text-secondary-900 dark:text-white"),
            radioControl: "cursor-pointer data-[selected=true]:bg-primary data-[selected=true]:border-primary",
            isDisabled: false
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              "bg-white dark:bg-secondary-1000",
              "border border-[#DCF0F9] dark:border-[#04425C]",
              "rounded-lg p-3",
              "focus-within:border-surface dark:focus-within:border-surface"
            ),
            radio: clsx(baseRadio, "text-secondary-900 dark:text-white"),
            radioControl: "cursor-pointer data-[selected=true]:bg-primary data-[selected=true]:border-primary",
            isDisabled: false
          };
      }
    }, [formMode]);

    const hasError = Boolean(error);
    const isViewMode = formMode === FormMode.VIEW;

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      hasError &&
      !isViewMode &&
      "border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20",
      className
    );

    return (
      <div className={clsx("flex flex-col gap-1.5", containerClassName)} ref={ref}>
        {label && (
          <label
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

        <RadioGroup
          name={name}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          orientation={orientation}
          className={wrapperClasses}
          classNames={{
            wrapper: orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2",
            errorMessage: clsx(
              "text-xs font-medium mt-1",
              "text-danger dark:text-danger-400",
              errorClassName
            )
          }}
          errorMessage={hasError ? error : ""}
          {...rest}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              classNames={{
                base: clsx(
                  "inline-flex items-center",
                  "hover:bg-transparent",
                  "cursor-pointer",
                  isViewMode && "cursor-default"
                ),
                wrapper: clsx(
                  modeStyles.radioControl,
                  "border-2",
                  hasError && !isViewMode && "border-danger dark:border-danger-500"
                ),
                label: clsx(
                  modeStyles.radio,
                  hasError && !isViewMode && "text-danger dark:text-danger-400"
                ),
                description: "text-xs text-neutral-500 dark:text-neutral-400"
              }}
              description={option.description}
            >
              {option.label}
            </Radio>
          ))}
        </RadioGroup>

        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppRadioComponent.displayName = "AppRadio";

export const AppRadio = AppRadioComponent;