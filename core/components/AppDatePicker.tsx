import { useSelector } from 'react-redux';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Calendar } from 'iconsax-react';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';

const persianHolidays = ['1403/01/01', '1403/01/12', '1403/03/14'];

const gregorianHolidays = ['2025/03/21', '2025/04/01', '2025/06/04'];

const AppDatePicker = ({ props }: { props: any }) => {
  const { label, required, name, placeholder, formik } = props;

  const lang = useSelector((state: any) => state.language.lang);

  const calendar = lang === 'fa' ? persian : gregorian;
  const locale = lang === 'fa' ? persian_fa : gregorian_en;

  const holidays = lang === 'fa' ? persianHolidays : gregorianHolidays;

  return (
    <>
      <span className={`text-secondary-1000 text-xs lg:font-medium font-semibold`}>
        {label} {required && '*'}
      </span>

      <DatePicker
        calendar={calendar}
        calendarPosition="bottom-right"
        locale={locale}
        mapDays={({ date }) => {
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
        name={name}
        render={(value, openCalendar) => (
          <button
            className="relative flex items-center justify-between cursor-pointer w-full !rounded-5
              border border-default-300 dark:border-default-100
            bg-white dark:bg-slate-800 px-3 py-2 text-sm
            text-secondary-1000 dark:text-white shadow-sm transition-colors
            hover:border-primary-500 focus-within:border-primary-500
             focus-within:ring-1 focus-within:ring-primary-500"
            type="button"
            onClick={openCalendar}
          >
            <span>{value || placeholder}</span>
            <Calendar color="#04070E" size="24" />
          </button>
        )}
        onChange={(value) => {
          formik.setFieldValue(name, value?.format('YYYY/MM/DD'));
        }}
      />
    </>
  );
};

export default AppDatePicker;
