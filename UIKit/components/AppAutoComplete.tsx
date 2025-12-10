import React, { useMemo } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import clsx from "clsx";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppAutoCompleteProps
  extends Omit<AutocompleteProps<any>, "onChange" | "onBlur" | "onFocus"> {
  name: string;
  label?: string;
  required?: boolean;
  displayKey?: string;
  valueKey?: string;
  data?: any[];
  formMode?: FormMode;
  error?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string | number) => void;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const AppAutoCompleteComponent = React.forwardRef<
  HTMLInputElement,
  AppAutoCompleteProps
>(
  (
    {
      name,
      label,
      required = true,
      displayKey = "name",
      valueKey = "id",
      data = [],
      formMode = FormMode.CREATE,
      error,
      onBlur,
      onFocus,
      onChange,
      helperText,
      containerClassName,
      errorClassName,
      className,
      startContent,
      endContent,
      size = "md",
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const isViewMode = formMode === FormMode.VIEW;
    const hasError = Boolean(error);

    const modeStyles = useMemo(() => {
      const baseInput = "text-sm font-medium transition-all duration-200 rounded-lg !bg-red-400";
      const baseWrapper = "!h-10 !px-3 !py-2.5 ";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#EEF9FF_48%,var(--Surface-Main,#FFF)_95%)] shadow-sm dark:bg-[linear-gradient(90deg,var(--Surface-Main,#01101A)_5%,var(--Primary-900,#022C3D)_50%,var(--Surface-Main,#01101A)_95%)]",
              "border border-[#DCF0F9]",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800"
            ),
            input: clsx(
              baseInput,
              "text-neutral-600 dark:text-neutral-300 cursor-default"
            ),
            isDisabled: true,
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]",
              "border border-[#DCF0F9] dark:border-[#04425C]",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "focus-within:border-primary focus-within:shadow-lg"
            ),
            input: clsx(baseInput, "text-secondary-900 dark:text-white"),
            isDisabled: false,
          };
          
        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "!bg-none dark:bg-neutral-800 border border-[#DCF0F9]",
              "dark:border-[#04425C]",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "focus-within:border-primary focus-within:shadow-lg"
            ),
            input: clsx(baseInput, "text-secondary-900 dark:text-white !bg-red-400"),
            isDisabled: false,
          };
      }
    }, [formMode]);

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      hasError &&
        !isViewMode &&
        "border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20 rounded-lg",
      className
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

        {/* Autocomplete */}
        <Autocomplete
          ref={ref}
          id={name}
          name={name}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          classNames={{
            base: clsx("flex flex-col gap-1.5 "),
            selectorButton: wrapperClasses,
            listboxWrapper: "z-50 max-h-64",
            listbox: clsx(
              "bg-white dark:bg-neutral-900 rounded-md shadow-lg",
              "border border-neutral-200 dark:border-neutral-700"
            ),
            popoverContent: "p-1",
          }}
          startContent={startContent}
          endContent={endContent}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelectionChange={(key) => {
            if (onChange && key) onChange(key as string);
          }}
          placeholder={`انتخاب ${label || "گزینه"}...`}
          {...rest}
        >
          {data.map((item) => (
            <AutocompleteItem
              key={item[valueKey]}
              className={clsx(
                "text-secondary-900 dark:text-white",
                "hover:bg-primary-100 dark:hover:bg-primary-900/30",
                "data-[hover=true]:bg-primary-100 dark:data-[hover=true]:bg-primary-900/30"
              )}
            >
              {item[displayKey]}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        {/* Error Message */}
        {hasError && (
          <span
            className={clsx(
              "text-xs font-medium",
              "text-danger dark:text-danger-400",
              errorClassName
            )}
          >
            {error}
          </span>
        )}

        {/* Helper Text */}
        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppAutoCompleteComponent.displayName = "AppAutoComplete";

export const AppAutoComplete = AppAutoCompleteComponent;