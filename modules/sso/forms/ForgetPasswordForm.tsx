import {Form, InputOtp} from '@heroui/react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {t} from 'i18next';
import {useEffect, useState} from 'react';

import {AppButton} from '@hrbox/uikit/components';
import {useFormContext} from '@hrbox/core/providers/FormProvider';
import {FormField} from "@hrbox/uikit/components/FormField";
import {useResetPasswordSendOtpMutation, useResetPasswordVerifyOtpMutation} from "@hrbox/modules/sso/apis/Auth";
import {LoginButton} from "@hrbox/modules/sso/components/LoginButton";

const OTP_EXPIRY_TIME = 120;
const OTP_STORAGE_KEY = 'forget_password_otp_session';

type FormStep = 'username' | 'otp' | 'reset';

export const initialValuesForgetPassword = {
    UsernameOrMobile: '',
    ClientOtpCode: '',
    GuidCode: '',
    Password: '',
    PasswordConfirm: '',
};

export const validationSchemaForgetPassword = Yup.object({
    UsernameOrMobile: Yup.string().required(t('username_is_required')),
    ClientOtpCode: Yup.string().when('$step', {
        is: 'otp',
        then: (schema) => schema.required(t('otp_is_required')).length(6, t('otp_must_be_6_digits')),
        otherwise: (schema) => schema,
    }),
    Password: Yup.string().when('$step', {
        is: 'reset',
        then: (schema) => schema
            .required(t('password_is_required'))
            .min(8, t('password_min_length')),
        otherwise: (schema) => schema,
    }),
    PasswordConfirm: Yup.string().when('$step', {
        is: 'reset',
        then: (schema) => schema
            .required(t('password_confirmation_is_required'))
            .oneOf([Yup.ref('Password')], t('passwords_must_match')),
        otherwise: (schema) => schema,
    }),
});

export const ForgetPasswordFlow = () => {
    const {values, handleSubmit, isSubmitting, setFieldValue, errors, touched, submitForm} = useFormContext();
    const {t} = useTranslation();

    const [currentStep, setCurrentStep] = useState<FormStep>('username');
    const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
    const [resendTimeLeft, setResendTimeLeft] = useState(30);
    const [isResendActive, setIsResendActive] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [otpComplete, setOtpComplete] = useState(false);
    const [resetPassword] = useResetPasswordVerifyOtpMutation()
    const [verifyOtp] = useResetPasswordSendOtpMutation()

    // بررسی session در localStorage
    useEffect(() => {
        const storedSession = localStorage.getItem(OTP_STORAGE_KEY);
        if (storedSession) {
            try {
                const session = JSON.parse(storedSession);
                const now = Date.now();
                const elapsed = Math.floor((now - session.timestamp) / 1000);

                if (elapsed < OTP_EXPIRY_TIME) {
                    setCurrentStep('otp');
                    setTimeLeft(OTP_EXPIRY_TIME - elapsed);
                    setFieldValue('UsernameOrMobile', session.username);
                } else {
                    localStorage.removeItem(OTP_STORAGE_KEY);
                }
            } catch (error) {
                localStorage.removeItem(OTP_STORAGE_KEY);
            }
        }
    }, []);

    // تایمر اصلی 2 دقیقه
    useEffect(() => {
        if (currentStep === 'otp' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && currentStep === 'otp') {
            setIsResendActive(false);
            setResendTimeLeft(0);
        }
    }, [timeLeft, currentStep]);

    // تایمر resend
    useEffect(() => {
        if (currentStep === 'otp' && resendTimeLeft > 0 && isResendActive) {
            const timer = setTimeout(() => {
                setResendTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (resendTimeLeft === 0 && isResendActive) {
            setIsResendActive(false);
        }
    }, [resendTimeLeft, isResendActive, currentStep]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleUsernameSubmit = async (e: any) => {
        e.preventDefault();
        await handleSubmit(e);

        if (!errors.UsernameOrMobile) {
            // ذخیره session
            const session = {
                username: values.UsernameOrMobile,
                timestamp: Date.now(),
            };
            localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(session));

            setCurrentStep('otp');
            setTimeLeft(OTP_EXPIRY_TIME);
            setResendTimeLeft(30);
            setIsResendActive(true);
        }
    };

    const handleResendCode = async () => {
        try {
            const session = {
                username: values.UsernameOrMobile,
                timestamp: Date.now(),
            };
            localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(session));

            setTimeLeft(OTP_EXPIRY_TIME);
            setResendTimeLeft(30);
            setIsResendActive(true);
            setFieldValue('ClientOtpCode', '');
            setOtpComplete(false);
        } catch (error) {
            console.error('Error resending code:', error);
        }
    };

    const handleOtpSubmit = async (e: any) => {
        if (values.ClientOtpCode.length !== 6) return;

        try {
            const response = await verifyOtp({username: values.UsernameOrMobile, otp: values.ClientOtpCode});
            setFieldValue('GuidCode', response.guidCode);

            setIsSuccess(true);
            localStorage.removeItem(OTP_STORAGE_KEY);

            // انتقال به مرحله reset password
            setTimeout(() => {
                setCurrentStep('reset');
            }, 500);
        } catch (error) {
            setIsSuccess(false);
            setOtpComplete(false);
        }
    };

    const handleResetPasswordSubmit = async (e: any) => {
        if (!errors.Password && !errors.PasswordConfirm) {
            await resetPassword({
                username: values.UsernameOrMobile,
                guidCode: values.GuidCode,
                password: values.Password
            });
        }
    };

    // Step 1: Username Form
    if (currentStep === 'username') {
        return (
            <Form className="w-full flex flex-col gap-28" onSubmit={handleUsernameSubmit}>
                <div className="flex flex-col gap-7 w-full">
                    <div className="flex flex-col gap-1">
                        <FormField
                            label={t('user_name')}
                            name="UsernameOrMobile"
                            placeholder={t('enter_username_or_mobile')}
                            helperText={touched.UsernameOrMobile ? errors.UsernameOrMobile : undefined}
                        />
                    </div>
                    <AppButton
                        content={t('send_code')}
                        fullWidth={true}
                        type="submit"
                        color="primary"
                        size="xl"
                        radius="lg"
                        variant="solid"
                        isLoading={isSubmitting}
                    />
                </div>
                <div className="w-full">
                    <LoginButton/>
                </div>
            </Form>
        );
    }

    // Step 2: OTP Verification Form
    if (currentStep === 'otp') {
        return (
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {t('code_sent_to')}: {values.UsernameOrMobile}
                        </span>
                        <button
                            type="button"
                            className="text-sm text-primary underline"
                            onClick={() => {
                                setCurrentStep('username');
                                setFieldValue('ClientOtpCode', '');
                                setOtpComplete(false);
                                localStorage.removeItem(OTP_STORAGE_KEY);
                            }}
                        >
                            {t('change_username')}
                        </button>
                    </div>
                    {timeLeft > 0 && (
                        <div className="text-sm text-orange-500">
                            {t('time_remaining')}: {formatTime(timeLeft)}
                        </div>
                    )}
                    {timeLeft === 0 && (
                        <div className="text-sm text-red-500">
                            {t('code_expired')}
                        </div>
                    )}
                </div>

                <Form className="w-full flex flex-col gap-6" onSubmit={handleOtpSubmit}>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row justify-between items-center">
                                <span className="!text-sm !font-medium">{t('enter_otp_code')}</span>
                                <div className="flex">
                                    {timeLeft > 0 && isResendActive ? (
                                        <span className="text-gray-400 text-sm">
                                            {formatTime(resendTimeLeft)} {t('to_resend')}
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-primary text-sm underline font-medium"
                                            onClick={handleResendCode}
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
                                        segment: `bg-white dark:bg-info-1000 text-secondary-1000 dark:text-white text-lg !w-[42px] !h-16 border transition-all
                                            ${touched.ClientOtpCode && errors.ClientOtpCode ? 'border-red-500' : ''}
                                            ${otpComplete && !isSuccess ? 'border-green-500 bg-green-50' : ''}
                                            ${isSuccess ? 'border-green-500 bg-green-50' : ''}
                                        `,
                                        segmentWrapper: 'flex justify-between w-full',
                                    }}
                                    isDisabled={timeLeft === 0}
                                    length={6}
                                    value={values.ClientOtpCode || ''}
                                    onValueChange={(value: string) => {
                                        setFieldValue('ClientOtpCode', value);
                                        if (value.length === 6) {
                                            setOtpComplete(true);
                                            setTimeout(() => {
                                                submitForm();
                                            }, 300);
                                        } else {
                                            setOtpComplete(false);
                                        }
                                    }}
                                />
                                {errors.ClientOtpCode && touched.ClientOtpCode && (
                                    <span className="text-red-500 text-sm mt-1 block">
                                        {errors.ClientOtpCode}
                                    </span>
                                )}
                                {isSuccess && (
                                    <span className="text-green-500 text-sm mt-1 block">
                                        {t('otp_correct_redirecting')}
                                    </span>
                                )}
                                {timeLeft === 0 && (
                                    <span className="text-red-500 text-sm mt-1 block">
                                        {t('please_resend_code')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <AppButton
                        content={t('verify_code')}
                        fullWidth={true}
                        color="primary"
                        size="xl"
                        type="submit"
                        radius="lg"
                        variant="solid"
                        isLoading={isSubmitting}
                        isDisabled={timeLeft === 0 || values.ClientOtpCode.length !== 6}
                    />
                    <LoginButton/>
                </Form>
            </div>
        );
    }

    // Step 3: Reset Password Form
    if (currentStep === 'reset') {
        return (
            <Form className="w-full flex flex-col gap-28" onSubmit={handleResetPasswordSubmit}>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <FormField
                            required={true}
                            label={t('password')}
                            name="Password"
                            type="password"
                            placeholder={t('enter_new_password')}
                            helperText={touched.Password ? errors.Password : undefined}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <FormField
                            required={true}
                            label={t('password_confirmation')}
                            name="PasswordConfirm"
                            type="password"
                            placeholder={t('confirm_new_password')}
                            helperText={touched.PasswordConfirm ? errors.PasswordConfirm : undefined}
                        />
                    </div>
                </div>

                <AppButton
                    content={t('reset_password')}
                    className="!font-semibold !py-4 h-14"
                    fullWidth={true}
                    size="lg"
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                />

                <LoginButton/>
            </Form>
        );
    }

    return null;
};