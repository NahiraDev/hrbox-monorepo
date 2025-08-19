import { useState, useEffect } from 'react';
import { AnimateClock } from 'core';
import { useTranslation } from 'react-i18next';

const OTP = () => {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const { t } = useTranslation();
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft > 0 && isTimerActive) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
  }, [timeLeft, isTimerActive]);
  const resetTimer = () => {
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  return (
    <div className="flex">
      <AnimateClock />
      {isTimerActive ? (
        <span className="text-tertiar-400 text-sm">
          {formatTime(timeLeft)} {t('to_resend')}
        </span>
      ) : (
        <button
          className="text-tertiar-400 text-sm underline"
          onClick={resetTimer}
        >
          {t('resend_code')}
        </button>
      )}
    </div>
  );
};

export default OTP;
