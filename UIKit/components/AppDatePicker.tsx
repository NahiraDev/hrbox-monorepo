import { useSelector } from 'react-redux';
import { Calendar } from 'iconsax-reactjs';
import * as DatePickerModule from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';
import clsx from 'clsx';
import { forwardRef, MouseEventHandler } from 'react';
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
  containerClassName?: string;
}

const persianHolidays = ['1403/01/01', '1403/01/12', '1403/03/14'];
const gregorianHolidays = ['2025/03/21', '2025/04/01', '2025/06/04'];

/**
 * ✅ AppDatePicker - updated with FormMode
 */
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
      containerClassName,
    },
    ref
  ) => {
    const lang = useSelector((state: any) => state.language.lang);
    const calendar = lang === 'fa' ? persian : gregorian;
    const locale = lang === 'fa' ? persian_fa : gregorian_en;
    const holidays = lang === 'fa' ? persianHolidays : gregorianHolidays;
    const DatePicker = (DatePickerModule as any).default || DatePickerModule?.DatePicker || DatePickerModule;

    const isViewMode = formMode === FormMode.CREATE;
    const hasError = Boolean(error);

    const getModeClass = () => {
      switch (formMode) {
        case 'view':
          return 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 cursor-default';
        case 'edit':
          return 'bg-panel-surface dark:bg-neutral-800 border-primary-200 dark:border-primary-700 focus-within:border-primary';
        case 'create':
        default:
          return 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus-within:border-primary';
      }
    };

    return (
      <div
        ref={ref}
        className={clsx('flex flex-col gap-1.5', containerClassName)}
      >
        {label && (
          <label className="text-sm font-semibold text-secondary-900 dark:text-white">
            {label}
            {required && formMode !== 'view' && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <DatePicker
          calendar={calendar}
          calendarPosition="bottom-right"
          locale={locale}
          disabled={isViewMode || disabled}
          mapDays={({ date }: any) => {
            const isHoliday = holidays.includes(date.format('YYYY/MM/DD'));
            const isFriday = date.weekDay.name === 'جمعه' || date.weekDay.index === 6;

            if (isHoliday || isFriday) {
              return {
                style: {
                  backgroundColor: '#ffe3e3',
                  color: '#d8000c',
                },
                className: 'holiday-day',
                title: isFriday ? 'جمعه' : 'تعطیل رسمی',
              };
            }
          }}
          render={(
            val: any,
            openCalendar: MouseEventHandler<HTMLButtonElement> | undefined
          ) => (
            <button
              type="button"
              className={clsx(
                'flex items-center justify-between w-full px-3 py-2',
                'rounded-lg border transition-all duration-200',
                'text-sm font-medium text-secondary-900 dark:text-white',
                'hover:border-primary-300 focus-within:border-primary',
                getModeClass(),
                hasError && !isViewMode && 'border-danger bg-danger-50 dark:bg-danger-900/20',
                isViewMode && 'pointer-events-none opacity-70'
              )}
              onClick={openCalendar}
            >
              <span>{val}</span>
              <Calendar
                size="20"
                className={hasError && !isViewMode ? 'text-danger' : 'text-secondary-600'}
              />
            </button>
          )}
          onChange={(dateObj: any) => {
            if (onChange && dateObj) {
              onChange(dateObj.format('YYYY/MM/DD'));
            }
          }}
          onBlur={onBlur}
        />

        {hasError && (
          <span className="text-xs text-danger">{error}</span>
        )}
      </div>
    );
  }
);

AppDatePicker.displayName = 'AppDatePicker';