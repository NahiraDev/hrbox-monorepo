import React, { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { FormMode } from "@hrbox/uikit/components/types";
import { CloseCircle, DocumentText, DocumentUpload } from "iconsax-reactjs";

interface AppFileUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  formMode?: FormMode;
  error?: string | boolean;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  onBlur?: () => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
  placeholder?: string;
}

export const AppFileUpload = React.forwardRef<HTMLInputElement, AppFileUploadProps>(
  (
    {
      name,
      label,
      required = false,
      formMode = FormMode.CREATE,
      error,
      value,
      onChange,
      onBlur,
      accept,
      maxSize = 5 * 1024 * 1024,
      disabled,
      helperText,
      containerClassName,
      errorClassName,
      placeholder = "انتخاب فایل..."
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);

    const modeStyles = useMemo(() => {
      const baseWrapper = "h-auto min-h-[120px] px-3 py-4 transition-all duration-200 rounded-lg";

      switch (formMode) {
        case FormMode.VIEW:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)]",
              "border border-[#DCF0F9] dark:border-primary-800",
              "cursor-default"
            ),
            text: "text-neutral-600 dark:text-neutral-300"
          };

        case FormMode.EDIT:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]",
              "border border-[#DCF0F9]",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "cursor-pointer"
            ),
            text: "text-secondary-900 dark:text-white"
          };

        case FormMode.CREATE:
        default:
          return {
            wrapper: clsx(
              baseWrapper,
              "bg-white dark:bg-secondary-1000 border border-[#DCF0F9]",
              "dark:border-[#04425C]",
              "hover:border-primary-300 dark:hover:border-primary-600",
              "cursor-pointer"
            ),
            text: "text-secondary-900 dark:text-white"
          };
      }
    }, [formMode]);

    const hasError = Boolean(error || fileError);
    const isViewMode = formMode === FormMode.VIEW;

    const wrapperClasses = clsx(
      modeStyles.wrapper,
      dragActive && !isViewMode && "border-primary dark:border-primary",
      hasError && !isViewMode && "border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20",
      "shadow-[0_0_0_0_rgba(0,0,0,0)]"
    );

    const getFileName = (): string | null => {
      if (!value) return null;
      if (typeof value === "string") return value;
      return value.name;
    };

    const getFileSize = (): string | null => {
      if (!value || typeof value === "string") return null;
      const size = value.size;
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const validateFile = (file: File): boolean => {
      setFileError(null);

      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        setFileError(`حجم فایل نباید بیشتر از ${maxSizeMB} MB باشد`);
        return false;
      }

      if (accept) {
        const acceptedTypes = accept.split(",").map(type => type.trim());
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const mimeType = file.type;

        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith(".")) {
            return fileExtension === type.toLowerCase();
          }
          return mimeType.match(new RegExp(type.replace("*", ".*")));
        });

        if (!isAccepted) {
          setFileError(`فرمت فایل باید ${accept} باشد`);
          return false;
        }
      }

      return true;
    };

    const handleFileChange = (file: File | null) => {
      if (!file) {
        onChange?.(null);
        setFileError(null);
        return;
      }

      if (validateFile(file)) {
        onChange?.(file);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      handleFileChange(file);
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isViewMode || disabled) return;

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (isViewMode || disabled) return;

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileChange(file);
      }
    };

    const handleClick = () => {
      if (isViewMode || disabled) return;
      inputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isViewMode || disabled) return;
      handleFileChange(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const fileName = getFileName();
    const fileSize = getFileSize();

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

        <div
          className={wrapperClasses}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            id={name}
            name={name}
            accept={accept}
            disabled={isViewMode || disabled}
            onChange={handleInputChange}
            onBlur={onBlur}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-3">
            {fileName ? (
              <div className="flex items-center gap-3 w-full">
                <div className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  "bg-primary-50 dark:bg-primary-900/20"
                )}>
                  <DocumentText size={24} className="text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    "text-sm font-medium truncate",
                    modeStyles.text
                  )}>
                    {fileName}
                  </p>
                  {fileSize && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {fileSize}
                    </p>
                  )}
                </div>

                {!isViewMode && !disabled && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className={clsx(
                      "p-1 rounded-lg transition-colors",
                      "hover:bg-danger-50 dark:hover:bg-danger-900/20"
                    )}
                  >
                    <CloseCircle size={20} className="text-danger" />
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className={clsx(
                  "flex items-center justify-center w-12 h-12 rounded-lg",
                  isViewMode
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : "bg-primary-50 dark:bg-primary-900/20"
                )}>
                  <DocumentUpload
                    size={28}
                    className={
                      isViewMode
                        ? "text-neutral-400 dark:text-neutral-500"
                        : "text-primary"
                    }
                  />
                </div>

                <div className="text-center">
                  <p className={clsx(
                    "text-sm font-medium",
                    hasError && !isViewMode
                      ? "text-danger dark:text-danger-400"
                      : modeStyles.text
                  )}>
                    {placeholder}
                  </p>
                  {!isViewMode && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      یا فایل را به اینجا بکشید
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {(error || fileError) && (
          <p className={clsx(
            "text-xs font-medium",
            "text-danger dark:text-danger-400",
            errorClassName
          )}>
            {fileError || error}
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

AppFileUpload.displayName = "AppFileUpload";