import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import clsx from "clsx";
import React, { forwardRef, useMemo } from "react";
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

  //   // ADD THIS 👇
  // options?: Array<{
  //   id: string | number;
  //   label: string;
  //   value?: string | number;
  //   [key: string]: any;
  // }>;
}

const sizeClasses: Record<
  string,
  { wrapper: string; label: string; inputWrapper: string }
> = {
  sm: {
    wrapper: "h-8 px-2 text-xs",
    label: "text-xs font-medium",
    inputWrapper: "text-xs",
  },
  md: {
    wrapper: "h-10 px-3 text-sm",
    label: "text-sm font-medium",
    inputWrapper: "text-sm",
  },
  lg: {
    wrapper: "h-12 px-4 text-base",
    label: "text-base font-semibold",
    inputWrapper: "text-base",
  },
};

export const AppAutoComplete = forwardRef<
  HTMLInputElement,
  AppAutoCompleteProps
>(
  (
    {
      name,
      label,
      required = false,
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
      size = "md",
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const isViewMode = formMode === FormMode.VIEW;
    const hasError = Boolean(error);

    const modeStyles = useMemo(() => {
      const baseWrapper = sizeClasses[size]?.wrapper || sizeClasses.md.wrapper;

      switch (formMode) {
        case FormMode.VIEW:
          return {
            inputWrapper: clsx(
              baseWrapper,
              "bg-neutral-50 dark:bg-neutral-900",
              "border border-neutral-200 dark:border-neutral-700",
              "cursor-default"
            ),
          };
        case FormMode.EDIT:
          return {
            inputWrapper: clsx(
              baseWrapper,
              "bg-panel-surface dark:bg-neutral-800",
              "border-1.5 border-primary-200 dark:border-primary-700",
              "focus-within:border-primary"
            ),
          };
        case FormMode.CREATE:
        default:
          return {
            inputWrapper: clsx(
              baseWrapper,
              "bg-none text-primary",
              "",
              "focus-within:border-primary"
            ),
          };
      }
    }, [formMode, size]);

    return (
      <div className={clsx("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            className={clsx(
              sizeClasses[size]?.label,
              "text-secondary-900 dark:text-white"
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
          classNames={{
            base: clsx("flex flex-col gap-1.5 ", containerClassName),
            listboxWrapper: "z-50 max-h-64 ",
            listbox: "bg-white dark:bg-neutral-900 rounded-md shadow-lg",
            popoverContent: "p-1",
            selectorButton: clsx(
              modeStyles.inputWrapper,
              hasError && !isViewMode && "border-danger bg-danger-50 dark:bg-danger-900/20"
            ),
          }}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
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
              className="text-secondary-900 dark:text-white"
            >
              {item[displayKey]}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        {hasError && <span className="text-xs text-danger">{error}</span>}
        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppAutoComplete.displayName = "AppAutoComplete";
