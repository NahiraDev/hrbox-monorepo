import React, { useState, useEffect } from 'react';

const EmployeeSatisfactionCalendar: React.FC = () => {
  const days = ['Sunday', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(parseInt(currentDate.toLocaleDateString('en-US', { day: 'numeric' }), 10));
  const [currentTime, setCurrentTime] = useState(currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setToday(parseInt(now.toLocaleDateString('en-US', { day: 'numeric' }), 10));
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendar = () => {
    const year = 2024;
    const month = 9; // October (0-based index)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks: number[][] = [];
    let week: number[] = new Array(firstDay).fill(0);

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        weeks.push([...week]);
        week = [];
      }
      week.push(day);
    }
    while (week.length < 7) week.push(0);
    weeks.push(week);

    return weeks;
  };

  const weeks = generateCalendar();

  return (
    <div className="border-2 border-primary-400 rounded-lg p-4">
      <div>
      <div className="bg-primary-400 text-white text-center p-2 rounded-lg flex justify-between items-center text-sm">
        <span>Today: Oct.21</span>
        <span className="mx-2">October 2024</span>
        <span>Time: 17:00</span>
      </div>

          <table className="w-full">
        <thead>
        <tr>
          {days.map((day) => (
            <th key={day} className="bg-[#DCF0F9] p-2 text-center text-sm font-semibold">{day}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {weeks.map((week, index) => (
          <tr key={index}>
            {week.map((date, idx) => (
              <td key={idx} className="p-2 text-center">
                {date > 0 && (
                  <div className="flex flex-col items-center justify-center p-1.5 bg-[#DCF0F9]">
                    <div className="flex items-start justify-center gap-3  mb-[-5px]">
                     <span className="flex items-center justify-center w-16 h-16 !text-[24px] !font-bold text-white rounded-full bg-gradient-to-tl from-green-800 to-green-400">
                       17
                     </span>
                      <span className="flex items-center justify-center w-11 h-11 !text-[18px] !font-bold text-white rounded-full bg-gradient-to-tl from-orange-700 to-orange-400">
                        10
                      </span>
                      <span>01</span>
                    </div>
                    <div className="flex items-center justify-end w-full gap-5 px-11 mt-[-5px]">
                      <span className="flex items-center justify-center w-7 h-7 !text-[14px] !font-bold text-white rounded-full bg-gradient-to-tl from-green-500 to-green-400">
                         2
                     </span>
                      <span className="flex items-center justify-center w-9 h-9 !text-[16px] !font-bold text-white rounded-full bg-gradient-to-tl from-red-700 to-red-400">
                          8
                     </span>
                    </div>
                  </div>
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
