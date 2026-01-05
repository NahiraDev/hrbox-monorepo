import { useSelector } from "react-redux";
import { Calendar } from "iconsax-reactjs";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import clsx from "clsx";
import { forwardRef, MouseEventHandler, useMemo } from "react";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppDatePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  formMode?: FormMode;
  error?: string | boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  helperText?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const persianHolidays = ["1403/01/01", "1403/01/12", "1403/03/14"];
const gregorianHolidays = ["2025/03/21", "2025/04/01", "2025/06/04"];

export const AppDatePicker = forwardRef<HTMLDivElement, AppDatePickerProps>(
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
      disabled,
      helperText,
      containerClassName,
      errorClassName
    },
    ref
  ) => {
    const lang = useSelector((state: any) => state.language.lang);
    const calendar = lang === "fa" ? persian : gregorian;
    const locale = lang === "fa" ? persian_fa : gregorian_en;
    const holidays = lang === "fa" ? persianHolidays : gregorianHolidays;

    const modeStyles = useMemo(() => {
      switch (formMode) {
        case FormMode.VIEW:
          return clsx(
            "flex items-center w-full h-10 px-3 py-2.5 gap-2",
            "bg-[linear-gradient(90deg,#FFFFFF_5%,#EEF9FF_48%,#FFFFFF_95%)] dark:bg-[linear-gradient(90deg,#022C3D_5%,#05587A_50%,#022C3D_95%)]",
            "border border-[#DCF0F9] dark:border-primary-800",
            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            "text-sm font-medium transition-all duration-200 rounded-lg",
            "text-neutral-600 dark:text-neutral-300 cursor-default"
          );

        case FormMode.EDIT:
          return clsx(
            "flex items-center w-full h-10 px-3 py-2.5 gap-2",
            "bg-[rgba(220,240,249,0.40)] dark:bg-[#04425C60]",
            "border border-[#DCF0F9]",
            "hover:border-primary-300 dark:hover:border-primary-600",
            "focus-within:border-primary",
            "text-sm font-medium transition-all duration-200 rounded-lg",
            "text-secondary-900 dark:text-white"
          );

        case FormMode.CREATE:
        default:
          return clsx(
            "flex items-center w-full h-10 px-3 py-2.5 gap-2",
            "bg-white dark:bg-secondary-1000 border border-[#DCF0F9]",
            "dark:border-[#04425C]",
            "dark:focus-within:border-surface",
            "text-sm font-medium transition-all duration-200 rounded-lg",
            "text-secondary-900 dark:text-white"
          );
      }
    }, [formMode]);

    const hasError = Boolean(error);
    const isViewMode = formMode === FormMode.VIEW;

    const buttonClasses = clsx(
      modeStyles,
      hasError &&
      !isViewMode &&
      "border-danger dark:border-danger-500 bg-danger-50 dark:bg-danger-900/20 text-danger dark:text-danger-400"
    );

    return (
      <div
        ref={ref}
        className={clsx("flex flex-col gap-1.5", containerClassName)}
      >
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

        <DatePicker
          calendar={calendar}
          calendarPosition="bottom-right"
          locale={locale}
          value={value}
          disabled={isViewMode || disabled}
          className="shadow-[0_0_0_0_rgba(0,0,0,0)]"
          onClose={() => {
            if (onBlur) {
              onBlur();
            }
          }}
          mapDays={({ date }: any) => {
            const isHoliday = holidays.includes(date.format("YYYY/MM/DD"));
            const isFriday =
              date.weekDay.name === "جمعه" || date.weekDay.index === 6;

            if (isHoliday || isFriday) {
              return {
                style: {
                  backgroundColor: "#ffe3e3",
                  color: "#d8000c"
                },
                className: "holiday-day",
                title: isFriday ? "جمعه" : "تعطیل رسمی"
              };
            }
          }}
          render={(
            val: any,
            openCalendar: MouseEventHandler<HTMLButtonElement> | undefined
          ) => (
            <button
              type="button"
              id={name}
              name={name}
              className={buttonClasses}
              onClick={openCalendar}
              disabled={isViewMode || disabled}
            >
              <Calendar
                size="20"
                className={
                  hasError && !isViewMode
                    ? "text-danger"
                    : isViewMode
                      ? "text-neutral-500 dark:text-neutral-400"
                      : "text-neutral-400 dark:text-neutral-500"
                }
              />
              <span className={clsx(
                "font-medium text-sm",
                hasError && !isViewMode
                  ? "text-danger dark:text-danger-400"
                  : isViewMode
                    ? "text-neutral-600 dark:text-neutral-300"
                    : "text-secondary-900 dark:text-white"
              )}>
                {val || (lang === "fa" ? "انتخاب تاریخ" : "Select date")}
              </span>
            </button>
          )}
          onChange={(dateObj: any) => {
            if (onChange && dateObj) {
              onChange(dateObj.format("YYYY/MM/DD"));
            }
          }}
        />

        {hasError && typeof error === "string" && (
          <p
            className={clsx(
              "text-xs font-medium",
              "text-danger dark:text-danger-400",
              errorClassName
            )}
          >
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

AppDatePicker.displayName = "AppDatePicker";