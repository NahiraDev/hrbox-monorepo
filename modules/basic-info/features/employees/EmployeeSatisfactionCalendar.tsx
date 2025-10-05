import { AppButton, useModalContext } from '@root/core';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useEffect, useState } from 'react';

const sizeMap: Record<number, string> = {
  7: '!w-7 !h-7',
  9: '!w-9 !h-9',
  11: '!w-11 !h-11',
  16: '!w-16 !h-16',
};

const textSizeMap: Record<number, string> = {
  7: '!text-xs',
  9: '!text-sm',
  11: '!text-base',
  16: '!text-lg',
};

const clamp = (value: number): number => Math.max(1, Math.min(20, value));

const DynamicCircle = ({ number, size, textSize, fromColor, toColor }) => {
  const sizeClass = sizeMap[size] || '!w-8 !h-8';
  const textClass = textSizeMap[size] || '!text-base'; // فونت بر اساس سایز دایره

  const gradientStyle = {
    backgroundImage: `linear-gradient(to top left, ${fromColor}, ${toColor})`,
  };

  return (
    <span
      style={gradientStyle}
      className={`flex items-center justify-center ${sizeClass} ${textClass} !font-bold text-white rounded-full`}
    >
      {number}
    </span>
  );
};

const CalendarDay = ({ dayNumber, isCurrentMonth, isSaturday, idx, topCircles, bottomCircles, onClick }) => {
  console.log('CalendarDay Data:', { dayNumber, topCircles, bottomCircles });

  return (
    <AppButton
      props={{
        className: 'bg-[#DCF0F9] p-3',
        size: 'xl',
        radius: 'none',
        onPress: onClick,
        content: (
          <div>
            <div className="flex items-start justify-center gap-3 mb-[-15px]">
              {topCircles.map((circle, index) => (
                <DynamicCircle
                  key={`top-${index}`}
                  number={circle.number}
                  size={circle.size}
                  textSize={circle.textSize}
                  fromColor={circle.fromColor}
                  toColor={circle.toColor}
                />
              ))}
              <span
                className={`!font-semibold !text-xl ${
                  idx === 6
                    ? isCurrentMonth
                      ? 'text-red-500'
                      : 'text-red-300'
                    : isCurrentMonth
                      ? 'text-black'
                      : 'text-gray-400'
                }`}
              >
                {dayNumber.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-end w-full gap-5 px-3 mt-[-8px]">
              {bottomCircles.map((circle, index) => (
                <DynamicCircle
                  key={`bottom-${index}`}
                  number={circle.number}
                  size={circle.size}
                  textSize={circle.textSize}
                  fromColor={circle.fromColor}
                  toColor={circle.toColor}
                />
              ))}
            </div>
          </div>
        ),
      }}
    />
  );
};

const EmployeeSatisfactionCalendar = () => {
  const days = ['Sunday', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(
    currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const today = new Date();
  const { openModal } = useModalContext();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getDay = (date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    return `${month}.${day}`;
  };

  const getMonth = (date) => date.toLocaleDateString('en-US', { month: 'long' });
  const getYear = (date) => date.toLocaleDateString('en-US', { year: 'numeric' });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const weeks = [];
    let week = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      week.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        weeks.push([...week]);
        week = [];
      }
      week.push({ day, isCurrentMonth: true });
    }

    let nextMonthDay = 1;
    while (week.length < 7) {
      week.push({ day: nextMonthDay++, isCurrentMonth: false });
    }
    weeks.push(week);

    while (weeks.length < 5) {
      const newWeek = [];
      for (let i = 0; i < 7; i++) {
        newWeek.push({ day: nextMonthDay++, isCurrentMonth: false });
      }
      weeks.push(newWeek);
    }

    return weeks;
  };

  const isToday = (day, isCurrentMonth) => {
    return (
      isCurrentMonth &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const weeks = generateCalendar();

  // Example dynamic data for circles with numbers clamped between 1 and 20
  const getCircleData = (day, isCurrentMonth) => ({
    topCircles: [
      { number: clamp(isCurrentMonth ? day * 2 : 17), size: 16, textSize: 24, fromColor: '#1a4731', toColor: '#68d391' },
      { number: clamp(isCurrentMonth ? day + 5 : 10), size: 11, textSize: 18, fromColor: '#c05621', toColor: '#f6ad55' },
    ],
    bottomCircles: [
      { number: clamp(isCurrentMonth ? day % 5 : 2), size: 7, textSize: 14, fromColor: '#ef4444', toColor: '#f87171' },
      { number: clamp(isCurrentMonth ? day % 10 : 8), size: 9, textSize: 16, fromColor: '#b91c1c', toColor: '#f87171' },
    ],
  });

  return (
    <div className="border-2 border-primary-400 rounded-lg p-4">
      <div>
        <div className="bg-primary-400 text-white text-center p-2 rounded-xl flex justify-between items-center text-sm">
          <span className="!font-bold">Today: {getDay(currentDate)}</span>
          <div className="mx-2 flex items-center gap-[62px]">
            <AppButton
              props={{
                size: 'md',
                radius: 'lg',
                color: 'white',
                variant: 'light',
                onPress: goToPreviousMonth,
                content: <ArrowLeft2 />,
              }}
            />
            <span className="!font-bold">{getMonth(currentDate)}</span>
            <span className="!font-bold">{getYear(currentDate)}</span>
            <AppButton
              props={{
                size: 'md',
                color: 'white',
                radius: 'lg',
                variant: 'light',
                onPress: goToNextMonth,
                content: <ArrowRight2 />,
              }}
            />
          </div>
          <span className="!font-bold">Time: {currentTime}</span>
        </div>

        <table className="w-full">
          <thead>
          <tr>
            {days.map((day) => (
              <th key={day} className="bg-[#DCF0F966] p-2 text-center text-sm font-semibold">
                {day}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((date, idx) => (
                <td key={idx} className="p-2">
                  {date.day > 0 && (
                    <CalendarDay
                      dayNumber={date.day}
                      isCurrentMonth={date.isCurrentMonth}
                      isSaturday={idx === 6}
                      idx={idx}
                      topCircles={getCircleData(date.day, date.isCurrentMonth).topCircles}
                      bottomCircles={getCircleData(date.day, date.isCurrentMonth).bottomCircles}
                      onClick={() => openModal('delete', undefined)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSatisfactionCalendar;
