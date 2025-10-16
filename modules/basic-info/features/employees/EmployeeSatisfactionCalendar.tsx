import { AppButton, useModalContext } from '@root/core';
import { ArrowLeft2, ArrowRight2, Category } from 'iconsax-react';
import { useEffect, useState } from 'react';
import EmployeeSatisfactionCalendarModal from './modals/EmployeeSatisfactionCalendarModal';
import HowAreYouTodayModal from '@module/basic-info/features/employees/modals/HowAreYouTodayModal';

// Pixel-based size and text size calculation
const getCircleSizePx = (number: number): number => {
  const baseSizePx = 28; // Starting size (equivalent to w-7 h-7)
  const maxSizePx = 224; // Max size (equivalent to w-56 h-56) - 56 * 4 = 224px
  const sizePx = baseSizePx + (number - 1) * 2; // Increase by 2px per number
  return Math.min(maxSizePx, Math.max(baseSizePx, sizePx));
};

const getTextSizePx = (number: number): number => {
  const baseTextSizePx = 12; // Starting font size (equivalent to text-xs)
  const maxTextSizePx = 48; // Max font size (equivalent to text-5xl)
  const textSizePx = baseTextSizePx + (number - 1) * 1; // Increase by 1px per number
  return Math.min(maxTextSizePx, Math.max(baseTextSizePx, textSizePx));
};

const DynamicCircle = ({ number, fromColor, toColor }: { number: number; fromColor: string; toColor: string }) => {
  const sizePx = getCircleSizePx(number);
  const textSizePx = getTextSizePx(number);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to top left, ${fromColor}, ${toColor})`,
    width: `${sizePx}px`,
    height: `${sizePx}px`,
    fontSize: `${textSizePx}px`,
  };

  return (
    <span
      style={gradientStyle}
      className="flex items-center justify-center !font-bold text-white rounded-full"
    >
      {number}
    </span>
  );
};

const CalendarDay = ({
                       dayNumber,
                       isCurrentMonth,
                       isSaturday,
                       idx,
                       topCircles,
                       bottomCircles,
                       onPress,
                     }: {
  dayNumber: number;
  isCurrentMonth: boolean;
  isSaturday: boolean;
  idx: number;
  topCircles: any[];
  bottomCircles: any[];
  onPress: () => void;
}) => {
  return (
    <AppButton
      props={{
        className: 'bg-[#DCF0F9] p-3 w-full h-full hover:bg-[#c5e4f3] transition-colors relative',
        size: 'xl',
        radius: 'none',
        onPress: onPress,
        content: (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex items-start justify-start gap-1">
              {topCircles.map((circle, index) => (
                <DynamicCircle
                  key={`top-${index}`}
                  number={circle.number}
                  fromColor={circle.fromColor}
                  toColor={circle.toColor}
                />
              ))}
              <span
                className={`!font-semibold !text-xl absolute top-2 right-2 ${
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
            <div className="flex items-center justify-end w-full gap-1 px-3">
              {bottomCircles.map((circle, index) => (
                <DynamicCircle
                  key={`bottom-${index}`}
                  number={circle.number}
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
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const today = new Date();
  const { openModal, closeModal } = useModalContext();
  const [moodData, setMoodData] = useState<{
    [key: string]: {
      [mood: string]: { number: number; fromColor: string; toColor: string };
    };
  }>({});
  const [lastMoodSubmitTime, setLastMoodSubmitTime] = useState<number | null>(null);

  // بررسی و نمایش مودال هنگام باز شدن صفحه
  useEffect(() => {
    const checkAndShowModal = () => {
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      // اگر هیچوقت جواب نداده یا 24 ساعت گذشته، مودال را نمایش بده
      if (!lastMoodSubmitTime || (now - lastMoodSubmitTime) >= twentyFourHours) {
        openModal(
          'custom',
          '',
          <HowAreYouTodayModal
            onMoodSelect={(mood) => {
              const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
              setMoodData((prev) => {
                const currentDayMoods = prev[todayKey] || {};
                const moodConfig: { [key: string]: { fromColor: string; toColor: string } } = {
                  'very-happy': { fromColor: '#1a4731', toColor: '#68d391' },
                  'happy': { fromColor: '#c05621', toColor: '#f6ad55' },
                  'neutral': { fromColor: '#68d391', toColor: '#a7f3d0' },
                  'sad': { fromColor: '#b91c1c', toColor: '#f87171' },
                };
                const currentMood = currentDayMoods[mood] || { ...moodConfig[mood], number: 0 };
                const newNumber = currentMood.number + 1;
                return {
                  ...prev,
                  [todayKey]: {
                    ...currentDayMoods,
                    [mood]: {
                      ...currentMood,
                      number: newNumber,
                    },
                  },
                };
              });
              setLastMoodSubmitTime(Date.now());
              closeModal(undefined, undefined);
            }}
          />,
          undefined,
          'lg',
          '',
          null
        );
      }
    };

    checkAndShowModal();
  }, [openModal, closeModal, lastMoodSubmitTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getDay = (date: Date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    return `${month}.${day}`;
  };

  const getMonth = (date: Date) => date.toLocaleDateString('en-US', { month: 'long' });
  const getYear = (date: Date) => date.toLocaleDateString('en-US', { year: 'numeric' });

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
    const weeks: { day: number; isCurrentMonth: boolean }[][] = [];
    let week: { day: number; isCurrentMonth: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      week.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        weeks.push(week);
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
      const newWeek: { day: number; isCurrentMonth: boolean }[] = [];
      for (let i = 0; i < 7; i++) {
        newWeek.push({ day: nextMonthDay++, isCurrentMonth: false });
      }
      weeks.push(newWeek);
    }

    return weeks;
  };

  const isTodayOrPast = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return currentDateObj <= todayStart;
  };

  const weeks = generateCalendar();

  const getCircleData = (day: number, isCurrentMonth: boolean) => {
    const todayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    const dayMoods = moodData[todayKey] || {};

    const baseCircles = {
      topCircles: [] as any[],
      bottomCircles: [] as any[],
    };

    if (isTodayOrPast(day, isCurrentMonth)) {
      // Green and Orange circles at the top (very-happy, happy)
      ['very-happy', 'happy'].forEach((mood) => {
        if (dayMoods[mood] && dayMoods[mood].number > 0) {
          baseCircles.topCircles.push({
            ...dayMoods[mood],
            size: getCircleSizePx(dayMoods[mood].number),
            textSize: getTextSizePx(dayMoods[mood].number),
          });
        }
      });

      // Light Green and Red circles at the bottom (neutral, sad)
      ['neutral', 'sad'].forEach((mood) => {
        if (dayMoods[mood] && dayMoods[mood].number > 0) {
          baseCircles.bottomCircles.push({
            ...dayMoods[mood],
            size: getCircleSizePx(dayMoods[mood].number),
            textSize: getTextSizePx(dayMoods[mood].number),
          });
        }
      });
    }

    return baseCircles;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6">
      <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-primary-400 text-white text-center p-2 rounded-t-xl flex justify-between items-center text-sm">
          <span className="!font-bold">Today: {getDay(today)}</span>
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

        {/* Calendar */}
        <div className="bg-white flex-1 overflow-x-auto">
          <table className="w-full h-full table-fixed">
            <thead>
            <tr>
              {days.map((day, idx) => (
                <th
                  key={day}
                  className={`bg-[#DCF0F966] p-2 text-center text-sm font-semibold w-[172px] ${
                    idx === 6 ? 'text-red-500' : 'text-gray-700'
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className="gap-3">
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex} className="gap-3">
                {week.map((date, idx) => (
                  <td key={idx} className="p-2 border-none w-[172px] h-[102px]">
                    {date.day > 0 && (
                      <CalendarDay
                        dayNumber={date.day}
                        isCurrentMonth={date.isCurrentMonth}
                        isSaturday={idx === 6}
                        idx={idx}
                        topCircles={isTodayOrPast(date.day, date.isCurrentMonth) ? getCircleData(date.day, date.isCurrentMonth).topCircles : []}
                        bottomCircles={isTodayOrPast(date.day, date.isCurrentMonth) ? getCircleData(date.day, date.isCurrentMonth).bottomCircles : []}
                        onPress={() => {
                          if (isTodayOrPast(date.day, date.isCurrentMonth)) {
                            openModal(
                              'custom',
                              '',
                              <EmployeeSatisfactionCalendarModal
                                onItemPress={(item) => console.log('Item pressed:', item)}
                              />,
                              undefined,
                              '3xl',
                              'Organizational Locations',
                              <Category className="text-white" />
                            );
                          }
                        }}
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
    </div>
  );
};

export default EmployeeSatisfactionCalendar;
