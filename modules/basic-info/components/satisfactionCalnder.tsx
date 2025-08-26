import { Calendar } from '@heroui/react';
import { useState } from 'react';

function EmployeeSatisfactionCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      defaultValue={today}
      visibleMonths={1}
      firstDayOfWeek="sun"
      showMonthAndYearPickers={false}
      isDisabled={false}
      isReadOnly={false}
      minValue={new Date(2024, 0, 1)}
      maxValue={new Date(2024, 11, 31)}
      className="w-full border rounded-lg shadow-md"
    >
      <Calendar.Cell>
        {(props) => {
          const { date } = props;
          return (
            <div
              {...props}
              className={`relative p-1 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                props.isSelected ? 'bg-blue-100' : ''
              }`}
            >
              Here
            </div>
          );
        }}
      </Calendar.Cell>

      {/* سفارشی‌سازی title */}
      <Calendar.Title>
        <h3 className="font-semibold text-center">October 2024</h3>
      </Calendar.Title>
    </Calendar>
  );
}
