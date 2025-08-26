import React from 'react';

const EmployeeSatisfactionCalendar1 = () => {
  const [currentMonth, setCurrentMonth] = React.useState(9); // October
  const [currentYear, setCurrentYear] = React.useState(2024);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthNum = today.getMonth();
  const currentYearNum = today.getFullYear();

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderDay = (day: number | null, index: number): React.ReactNode => {
    if (!day) return <div className="h-16" />;

    const isToday =
      currentMonth === currentMonthNum &&
      currentYear === currentYearNum &&
      day === currentDay;
    const isSelected = day === 17;

    return (
      <div
        key={index}
        className={`relative  bg-[#DCF0F966]/40 flex flex-col pt-3 pb-3 ${
          isToday ? 'bg-blue-100' : ''
        } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      >
        <span className="text-sm font-medium text-gray-800">{day}</span>
        <div className="flex mt-1 space-x-1">
          <div className="w-13 h-13 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
            17
          </div>
          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
            10
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
            8
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
            2
          </div>
        </div>
      </div>
    );
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className=" shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
        <div className="text-sm">
          Today:{' '}
          {today.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-white hover:text-blue-200"
            onClick={() => navigateMonth('prev')}
          />
          <span className="font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            className="text-white hover:text-blue-200"
            onClick={() => navigateMonth('next')}
          />
        </div>
        <div className="text-sm">Time: 17:00</div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium py-2 bg-gray-50">
        {weekdays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 ">
        {days.map((day, index) => renderDay(day, index))}
      </div>
    </div>
  );
};

export default EmployeeSatisfactionCalendar1;

// import { Calendar } from '@heroui/react';
// import { useState } from 'react';
//
// export const EmployeeSatisfactionCalendar = () => {
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState(null);
//
//   return (
//     <Calendar
//       className="w-full border rounded-lg shadow-md"
//       defaultValue={today}
//       firstDayOfWeek="sun"
//       isDisabled={false}
//       isReadOnly={false}
//       maxValue={new Date(2024, 11, 31)}
//       minValue={new Date(2024, 0, 1)}
//       showMonthAndYearPickers={false}
//       value={selectedDate}
//       visibleMonths={1}
//       onChange={setSelectedDate}
//     >
//       <CalendarCell>
//         {(props) => {
//           const { date } = props;
//
//           return (
//             <div
//               {...props}
//               className={`relative p-1 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
//                 props.isSelected ? 'bg-blue-100' : ''
//               }`}
//             >
//               Here
//             </div>
//           );
//         }}
//       </CalendarCell>
//
//       {/* سفارشی‌سازی title */}
//       <Calendar.Title>
//         <h3 className="font-semibold text-center">October 2024</h3>
//       </Calendar.Title>
//     </Calendar>
//   );
// };
