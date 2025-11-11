import { Form, InputOtp } from '@heroui/react';
import { useFormContext } from '@hrbox/core/providers/FormProvider';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { t } from 'i18next';

export const initialValuesOneTimePassword = {
  UsernameOrMobile: '',
  ClientOtpCode: '',
  Mobile: '',
};

export const formValidationErrorOneTimePassword = () => {
  Yup.object({
    ClientOtpCode: Yup.string().required(t('otp_is_required')),
  });
};

export const handleFormSubmitOneTimePassword = (values: any) => {
  // if (authType === 'login' || authType === 'register') {
  //   return {
  //     UsernameOrMobile: mobile,
  //     ClientOtpCode: values.ClientOtpCode,
  //   };
  // } else {
  //   return {
  //     Mobile: mobile,
  //     ClientOtpCode: values.ClientOtpCode,
  //   };
  // }
};


export const OneTimePasswordForm = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    submitForm,
  } = useFormContext<{ ClientOtpCode: string }>();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const handleSubmitOTP = () => {
    setIsSuccess(true);
    handleSubmit();
  };
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeLeft(30);
    setIsTimerActive(true);
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

  return (
    <Form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmitOTP}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-between items-center">
            <span className="!text-sm !font-medium">{t('enter_otp_code')}</span>
            <div className="flex">
              {/*<AnimateClock />*/}
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
          </div>

          <div>
            <InputOtp
              classNames={{
                base: 'w-full',
                segment: `bg-white dark:bg-info-1000 text-secondary-1000 dark:text-white text-lg w-[42px] h-16 border
                        ${touched.ClientOtpCode && errors.ClientOtpCode ? 'border-red-500' : ''}
                        ${isSuccess ? 'border-green-500' : ''}
                      `,
                segmentWrapper: 'flex justify-between w-full',
              }}
              errorMessage={
                touched.ClientOtpCode ? errors.ClientOtpCode : undefined
              }
              length={6}
              value={values.ClientOtpCode}
              onBlur={handleBlur}
              onChange={(value: any) => {
                setFieldValue('ClientOtpCode', value);
                if (value.length === 6) {
                  submitForm;
                }
              }}
            />
            {isSubmitting ? (
              <span className="text-red-500 text-sm">
                {errors.ClientOtpCode}
              </span>
            ) : isSuccess ? (
              <span className="text-green-500 text-sm">
                OTP is correct. Redirecting...
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Form>
  );
};
