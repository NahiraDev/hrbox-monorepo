import {AppButton} from "@hrbox/uikit/components";
import {Form, InputOtp} from "@heroui/react";
import {useFormContext} from "@hrbox/core/providers/FormProvider";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {FormField} from "@hrbox-monorepo/UIKit/components/FormField";
import * as Yup from "yup";
import {t} from "i18next";
import {useRegisterOtpConfirmMutation} from "@hrbox-monorepo/modules/sso/apis/Auth";

const OTP_EXPIRY_TIME = 120; // 2 minutes
const OTP_STORAGE_KEY = 'register_otp_session';

type FormStep = 'register' | 'otp';

export const initialValuesRegister = {
    FirstName: '',
    LastName: '',
    Email: '',
    Mobile: '',
    NationalCode: '',
    Password: '',
    PasswordConfirm: '',
    ClientOtpCode: '',
};

export const validationSchemaRegister = Yup.object({
    FirstName: Yup.string().required(t('first_name_is_required')),
    LastName: Yup.string().required(t('last_name_is_required')),
    Email: Yup.string()
        .email(t('invalid_email'))
        .required(t('email_is_required')),
    Mobile: Yup.string()
        .required(t('phone_is_required'))
        .matches(/^[0-9]{10}$/, t('invalid_phone_number')),
    NationalCode: Yup.string()
        .required(t('national_code_is_required'))
        .matches(/^[0-9]{10}$/, t('invalid_national_code')),
    Password: Yup.string()
        .required(t('password_is_required'))
        .min(8, t('password_min_length')),
    PasswordConfirm: Yup.string()
        .required(t('password_confirmation_is_required'))
        .oneOf([Yup.ref('Password')], t('passwords_must_match')),
    ClientOtpCode: Yup.string(),
});

export const RegisterForm = () => {
    const {
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        submitForm,
    } = useFormContext();
    const {t} = useTranslation();

    const [currentStep, setCurrentStep] = useState<FormStep>('register');
    const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
    const [resendTimeLeft, setResendTimeLeft] = useState(30);
    const [isResendActive, setIsResendActive] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [otpComplete, setOtpComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [verifyRegisterConfirm] = useRegisterOtpConfirmMutation();

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
                    setFieldValue('Mobile', session.mobile);
                } else {
                    localStorage.removeItem(OTP_STORAGE_KEY);
                }
            } catch (error) {
                localStorage.removeItem(OTP_STORAGE_KEY);
            }
        }
    }, []);

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

    const handleRegisterSubmit = async (e: any) => {
        const hasErrors = errors.FirstName || errors.LastName || errors.Email ||
            errors.Mobile || errors.NationalCode || errors.Password || errors.PasswordConfirm;

        if (hasErrors) {
            return;
        }

        try {
            handleSubmit(e);
            const session = {
                mobile: values.Mobile,
                timestamp: Date.now(),
            };
            localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(session));

            setCurrentStep('otp');
            setTimeLeft(OTP_EXPIRY_TIME);
            setResendTimeLeft(30);
            setIsResendActive(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleResendCode = async () => {
        try {
            const session = {
                mobile: values.Mobile,
                timestamp: Date.now(),
            };
            localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(session));

            setTimeLeft(OTP_EXPIRY_TIME);
            setResendTimeLeft(30);
            setIsResendActive(true);
            await setFieldValue('ClientOtpCode', '');
            setOtpComplete(false);
        } catch (error) {
            console.error('Error resending code:', error);
        }
    };

    const handleOtpSubmit = async (e: any) => {
        e.preventDefault();

        if (values.ClientOtpCode.length !== 6) {
            await setFieldValue('ClientOtpCode', values.ClientOtpCode);
            return;
        }

        try {
            await verifyRegisterConfirm({
                Mobile: values.Mobile,
                ClientOtpCode: values.ClientOtpCode
            });

            setIsSuccess(true);
            localStorage.removeItem(OTP_STORAGE_KEY);

        } catch (error) {
            setIsSuccess(false);
            setOtpComplete(false);
        }
    };

    if (currentStep === 'register') {
        return (
            <Form className="w-full flex flex-col gap-12" onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid xl:grid-cols-2 xl:gap-10 gap-2">
                        <FormField
                            label={t("first_name")}
                            name="FirstName"
                            placeholder={t("enter_first_name")}
                            helperText={touched.FirstName && errors.FirstName}
                        />
                        <FormField
                            label={t("last_name")}
                            name="LastName"
                            placeholder={t("enter_last_name")}
                            helperText={touched.LastName && errors.LastName}
                        />
                        <FormField
                            label={t("email")}
                            name="Email"
                            type="email"
                            placeholder={t("enter_email")}
                            helperText={touched.Email && errors.Email}
                        />
                        <FormField
                            label={t("phone")}
                            name="Mobile"
                            type="tel"
                            placeholder={t("enter_phone")}
                            helperText={touched.Mobile && errors.Mobile}
                        />
                        <FormField
                            label={t("national_code")}
                            name="NationalCode"
                            placeholder={t("enter_national_code")}
                            helperText={touched.NationalCode && errors.NationalCode}
                        />
                        <FormField
                            label={t("password")}
                            name="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t("enter_password")}
                            helperText={touched.Password && errors.Password}
                            endContent={<button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                )}
                            </button>}
                        />
                        <FormField
                            label={t("password_confirmation")}
                            name="PasswordConfirm"
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder={t("confirm_password")}
                            helperText={touched.PasswordConfirm && errors.PasswordConfirm}
                            endContent={<button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            >
                                {showPasswordConfirm ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                )}
                            </button>}
                        />
                    </div>
                </div>
                <AppButton
                    className="font-semibold"
                    size="lg"
                    fullWidth={true}
                    variant="solid"
                    color="primary"
                    isLoading={isSubmitting}
                    content={t("sign_up")}
                    type="submit"
                />
            </Form>
        );
    }

    if (currentStep === 'otp') {
        return (
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t('code_sent_to')}: {values.Mobile}
            </span>
                        <button
                            type="button"
                            className="text-sm text-primary underline"
                            onClick={() => {
                                setCurrentStep('register');
                                setFieldValue('ClientOtpCode', '');
                                setOtpComplete(false);
                                localStorage.removeItem(OTP_STORAGE_KEY);
                            }}
                        >
                            {t('edit_information')}
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
                                        segment: `bg-white dark:bg-info-1000 text-secondary-1000 dark:text-white text-lg w-[42px] h-16 border transition-all
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
                    {t('registration_successful')}
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

                    <div className="pb-32 w-full">
                        <AppButton
                            content={t('verify_and_complete')}
                            fullWidth={true}
                            color="primary"
                            size="xl"
                            type="submit"
                            radius="lg"
                            variant="solid"
                            isLoading={isSubmitting}
                            isDisabled={timeLeft === 0 || values.ClientOtpCode.length !== 6}
                        />
                    </div>
                </Form>
            </div>
        );
    }

    return null;
};