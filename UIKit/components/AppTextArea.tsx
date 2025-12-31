import { Textarea, TextAreaProps } from "@heroui/react";
import clsx from "clsx";
import React, { forwardRef, useMemo } from "react";
import { FormMode } from "./types";

interface AppTextAreaProps extends Omit<TextAreaProps, "onChange" | "onBlur" | "onFocus"> {
  label?: string;
  required?: boolean;
  error?: string | boolean;
  name: string;
  formMode?: FormMode;
  isDisabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
}

export const AppTextArea = forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  (
    {
      label,
      required = false,
      error,
      name,
      formMode = FormMode.CREATE,
      isDisabled = false,
      onFocus,
      onBlur,
      onChange,
      helperText,
      containerClassName,
      errorClassName,
      className,
      ...rest
    },
    ref
  ) => {
    const modeStyles = useMemo(() => {
      const baseTextarea = "text-sm font-medium transition-all duration-200 rounded-lg";
      const baseWrapper = "min-h-[100px] !px-3 !py-2.5";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)]",
              "border border-[#DCF0F9] dark:border-primary-800",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800"
            ),
            textarea: clsx(baseTextarea, "text-neutral-600 dark:text-neutral-300 cursor-default"),
            isDisabled: true
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "focus-within:border-primary"
            ),
            textarea: clsx(baseTextarea, "text-secondary-900 dark:text-white"),
            isDisabled: false
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-white dark:bg-secondary-1000 border border-[#DCF0F9]",
              "dark:border-[#04425C]",
              "dark:focus-within:border-surface"
            ),
            textarea: clsx(baseTextarea, "text-secondary-900 dark:text-white"),
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

    const textareaClasses = clsx(
      modeStyles.textarea,
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

        <Textarea
          ref={ref}
          id={name}
          name={name}
          isDisabled={isViewMode || isDisabled}
          isInvalid={hasError}
          classNames={{
            inputWrapper: wrapperClasses,
            input: textareaClasses,
            errorMessage: clsx(
              "text-xs font-medium",
              "text-danger dark:text-danger-400",
              errorClassName
            )
          }}
          className="shadow-[0_0_0_0_rgba(0,0,0,0)]"
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