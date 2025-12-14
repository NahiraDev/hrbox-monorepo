import { Textarea, TextAreaProps } from "@heroui/react";
import clsx from "clsx";
import React, { forwardRef, useMemo } from "react";
import { FormMode } from "./types";
import "./index.css";
interface AppTextAreaProps extends Omit<
  TextAreaProps,
  "onChange" | "onBlur" | "onFocus"
> {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  name: string;
  formMode?: FormMode;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onChange?: (e: React.ChangeEvent) => void;
  helperText?: any;
  containerClassName?: string;
}

const sizeClasses: Record<
  string,
  { wrapper: string; input: string; label: string }
> = {
  sm: {
    wrapper: "min-h-[80px] px-2 py-2 text-xs",
    input: "text-xs",
    label: "text-xs font-medium",
  },
  md: {
    wrapper: "min-h-[100px] px-3 py-2 text-sm",
    input: "text-sm",
    label: "text-sm font-medium",
  },
  lg: {
    wrapper: "min-h-[120px] px-4 py-3 text-base",
    input: "text-base",
    label: "text-base font-semibold",
  },
};

/**
 * ✅ AppTextArea - updated with FormMode
 */
export const AppTextArea = forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  (
    {
      label,
      required = false,
      error,
      name,
      formMode = FormMode.CREATE,
      onFocus,
      onBlur,
      onChange,
      helperText,
      containerClassName,
      size = "md",
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const modeStyles = useMemo(() => {
      const baseWrapper = sizeClasses[size]?.wrapper || sizeClasses.md.wrapper;

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[#EEF9FF] dark:bg-[#01101a]",
              "border border-[#DEE1E8] dark:border-neutral-700",
              "cursor-default"
            ),
            input: clsx(
              sizeClasses[size]?.input,
              "text-neutral-600 dark:text-neutral-400"
            ),
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-panel-surface dark:bg-neutral-800",
              "border-1.5 border-primary-200 dark:border-primary-700",
              "focus-within:border-primary"
            ),
            input: clsx(
              sizeClasses[size]?.input,
              "text-secondary-900 dark:text-white"
            ),
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-white dark:bg-neutral-800",
              "border border-[#DEE1E8] dark:border-neutral-600",
              "focus-within:border-primary"
            ),
            input: clsx(
              sizeClasses[size]?.input,
              "text-secondary-900 dark:text-white"
            ),
          };
      }
    }, [formMode, size]);

    const hasError = Boolean(error);
    const isViewMode = formMode === FormMode.VIEW;

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

        <Textarea
          ref={ref}
          classNames={{
            inputWrapper: clsx(
              modeStyles.wrapper,
              hasError && !isViewMode && "border-danger  dark:bg-danger-900/20"
            ),
            input: clsx(
              modeStyles.input,
              hasError && !isViewMode && "text-danger"
            ),
          }}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          errorMessage={hasError ? error : ""}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />

        {helperText && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppTextArea.displayName = "AppTextArea";
