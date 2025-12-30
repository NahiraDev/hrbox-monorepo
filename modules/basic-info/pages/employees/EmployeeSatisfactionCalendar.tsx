import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { ArrowLeft2, ArrowRight2 } from 'iconsax-reactjs';
import { useEffect, useState } from 'react';
import EmployeeSatisfactionCalendarModal from '@hrbox/modules/basic-info/modals/EmployeeSatisfactionCalendarModal';
import HowAreYouTodayModal from '@hrbox/modules/basic-info/modals/HowAreYouTodayModal';
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";

const getCircleSizePx = (number: number): number => {
  const baseSizePx = 28;
  const maxSizePx = 224;
  const sizePx = baseSizePx + (number - 1) * 2;
  return Math.min(maxSizePx, Math.max(baseSizePx, sizePx));
};

const getTextSizePx = (number: number): number => {
  const baseTextSizePx = 12;
  const maxTextSizePx = 48;
  const textSizePx = baseTextSizePx + (number - 1);
  return Math.min(maxTextSizePx, Math.max(baseTextSizePx, textSizePx));
};

const DynamicCircle = ({ number, color }: { number: number; color: string }) => {
  const sizePx = getCircleSizePx(number);
  const textSizePx = getTextSizePx(number);

  return (
    <span
      style={{
        backgroundColor: color,
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        fontSize: `${textSizePx}px`,
      }}
      className="flex items-center justify-center !font-bold text-white rounded-full shadow-sm"
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
    <button
      onClick={onPress}
      className="bg-[#E8F4F8] p-2.5 w-full h-full hover:bg-[#d4ebf3] transition-colors relative rounded-md"
    >
      <div className="flex flex-col items-start justify-between h-full w-full">
        {/* Top section with circles */}
        <div className="flex items-start gap-1.5">
          {topCircles.map((circle, index) => (
            <DynamicCircle
              key={`top-${index}`}
              number={circle.number}
              color={circle.color}
            />
          ))}
        </div>

        {/* Day number at top right */}
        <span
          className={`absolute top-2 right-2 !font-semibold text-base ${
            idx === 6
              ? isCurrentMonth
                ? 'text-red-500'
                : 'text-red-300'
              : isCurrentMonth
                ? 'text-gray-900'
                : 'text-gray-400'
          }`}
        >
          {dayNumber.toString().padStart(2, '0')}
        </span>

        {/* Bottom section with circles */}
        <div className="flex items-center justify-start w-full gap-1.5 mt-auto">
          {bottomCircles.map((circle, index) => (
            <DynamicCircle
              key={`bottom-${index}`}
              number={circle.number}
              color={circle.color}
            />
          ))}
        </div>
      </div>
    </button>
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
      [mood: string]: { number: number; color: string };
    };
  }>({});
  const [lastMoodSubmitTime, setLastMoodSubmitTime] = useState<number | null>(null);

  useEffect(() => {
    const checkAndShowModal = () => {
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (!lastMoodSubmitTime || (now - lastMoodSubmitTime) >= twentyFourHours) {
        openModal(
          'custom',
          '',
          <HowAreYouTodayModal
            onMoodSelect={(mood) => {
              const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
              setMoodData((prev) => {
                const currentDayMoods = prev[todayKey] || {};
                const moodConfig: { [key: string]: { color: string } } = {
                  'very-happy': { color: '#10b981' },
                  'happy': { color: '#f59e0b' },
                  'neutral': { color: '#22c55e' },
                  'sad': { color: '#b91c1c' },
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
      ['very-happy', 'happy'].forEach((mood) => {
        if (dayMoods[mood] && dayMoods[mood].number > 0) {
          baseCircles.topCircles.push({
            ...dayMoods[mood],
            size: getCircleSizePx(dayMoods[mood].number),
            textSize: getTextSizePx(dayMoods[mood].number),
          });
        }
      });

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

  const modal = useModal()
  const handleOpenEmployeeSatisfactionCalendarModal = () => {
    modal.open(
      ModalType.VIEW,
      " Organizational Locations",
      < EmployeeSatisfactionCalendarModal />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.XL,
    );
  };


  return (
    <div className="w-screen h-screen flex items-center justify-center p-3">
      <div className="rounded-3xl overflow-hidden border-[3px] border-[#0ea5e9] w-full h-full flex flex-col bg-white">
        {/* Header */}
        <div className="bg-[#0ea5e9] text-white px-6 py-3 flex justify-between items-center">
          <span className="!font-bold text-sm">Today: {getDay(today)}</span>
          <div className="flex items-center gap-16">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft2 size={20} />
            </button>
            <div className="flex items-center gap-8">
              <span className="!font-bold text-lg">{getMonth(currentDate)}</span>
              <span className="!font-bold text-lg">{getYear(currentDate)}</span>
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowRight2 size={20} />
            </button>
          </div>
          <span className="!font-bold text-sm">Time: {currentTime}</span>
        </div>
        <div className="flex-1 overflow-auto bg-white">
          <div className="w-full h-full p-3">
            <div className="grid grid-cols-7 gap-2 h-full">
              {days.map((day, idx) => (
                <div
                  key={day}
                  className={`bg-[#E8F4F8]/40 p-2 text-center text-xs font-semibold rounded-md flex items-center justify-center ${
                    idx === 6 ? 'text-red-500' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
              ))}
              {weeks.map((week, weekIndex) => (
                week.map((date, idx) => (
                  <div key={`${weekIndex}-${idx}`} className="min-h-[90px]">
                    {date.day > 0 && (
                      <CalendarDay
                        dayNumber={date.day}
                        isCurrentMonth={date.isCurrentMonth}
                        isSaturday={idx === 6}
                        idx={idx}
                        topCircles={
                          isTodayOrPast(date.day, date.isCurrentMonth)
                            ? getCircleData(date.day, date.isCurrentMonth).topCircles
                            : []
                        }
                        bottomCircles={
                          isTodayOrPast(date.day, date.isCurrentMonth)
                            ? getCircleData(date.day, date.isCurrentMonth).bottomCircles
                            : []
                        }
                        onPress={() =>
                          isTodayOrPast(date.day, date.isCurrentMonth) &&
                          handleOpenEmployeeSatisfactionCalendarModal()
                        }
                      />

                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSatisfactionCalendar;
