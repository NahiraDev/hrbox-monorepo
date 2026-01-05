import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Autocomplete, AutocompleteItem, AutocompleteProps } from "@heroui/react";
import clsx from "clsx";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppAutoCompleteProps extends Omit<
  AutocompleteProps<any>,
  "onChange" | "onBlur" | "onFocus"
> {
  name: string;
  label?: string;
  required?: boolean;
  displayKey?: string;
  valueKey?: string;
  data?: any[];
  formMode?: FormMode;
  error?: string | boolean;
  isDisabled?: boolean;
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
      isDisabled = false,
      onBlur,
      onFocus,
      onChange,
      helperText,
      containerClassName,
      errorClassName,
      className,
      startContent,
      endContent,
      ...rest
    },
    ref
  ) => {
    const lang = useSelector((state: any) => state.language.lang);

    const modeStyles = useMemo(() => {
      const baseInput = "text-sm font-medium transition-all duration-200 rounded-lg";
      const baseWrapper = "!h-10 !px-3 !py-2.5";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "!bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] !dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)] ",
              "border border-[#DCF0F9] dark:border-primary-800",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800"
            ),
            input: clsx(baseInput, "text-neutral-600 dark:text-neutral-300 cursor-default"),
            isDisabled: true
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60] bg-white!",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "focus-within:border-primary"
            ),
            input: clsx(baseInput, "text-secondary-900 dark:text-white"),
            isDisabled: false
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-white dark:bg-secondary-1000 border border-[#DCF0F9] bg-white!",
              "dark:border-[#04425C]",
              "dark:focus-within:border-surface"
            ),
            input: clsx(baseInput, "text-secondary-900 dark:text-white"),
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
      "border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20 rounded-lg",
      className
    );

    const inputClasses = clsx(
      modeStyles.input,
      hasError && !isViewMode && "text-danger dark:text-danger-400",
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-[#DCF0F9]"
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

        <Autocomplete
          ref={ref}
          id={name}
          name={name}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          classNames={{
            inputWrapper: wrapperClasses,
            input: inputClasses,
            errorMessage: clsx(
              "text-xs font-medium",
              "text-danger dark:text-danger-400",
              errorClassName
            )
          }}
          startContent={startContent}
          endContent={endContent}
          errorMessage={hasError ? error : ""}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelectionChange={(key) => {
            if (onChange && key) onChange(key as string);
          }}
          placeholder={
            lang === "fa"
              ? `انتخاب ${label || "گزینه"}...`
              : `Select ${label || "option"}...`
          }
          {...rest}
        >
          {data.map((item) => (
            <AutocompleteItem key={item[valueKey]}>
              {item[displayKey]}
            </AutocompleteItem>
          ))}
        </Autocomplete>

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