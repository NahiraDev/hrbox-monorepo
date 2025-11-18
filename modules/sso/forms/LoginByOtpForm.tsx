import {Form, Select, SelectItem, InputOtp} from '@heroui/react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {t} from 'i18next';
import {useEffect, useState} from 'react';

import {AppButton} from '@hrbox/uikit/components';
import {useFormContext} from '@hrbox/core/providers/FormProvider';
import {FormField} from "@hrbox/uikit/components/FormField";
import {useLoginByOtpMutation} from "@hrbox/modules/sso/apis/Auth";
import {Paths} from "@hrbox/modules/paths";
import {useNavigation} from "@hrbox/core/hooks/useNavigation";
import {LoginButton} from "@hrbox/modules/sso/components/LoginButton";

const countries = [
    {
        code: 'IR',
        name: 'Iran',
        dialCode: '+98',
        flag: '🇮🇷',
        pattern: /^[1-9][0-9]{9}$/,
        length: 10,
        placeholder: '9123456789'
    },
    {
        code: 'US',
        name: 'United States',
        dialCode: '+1',
        flag: '🇺🇸',
        pattern: /^[2-9][0-9]{9}$/,
        length: 10,
        placeholder: '2125551234'
    },
    {
        code: 'GB',
        name: 'United Kingdom',
        dialCode: '+44',
        flag: '🇬🇧',
        pattern: /^[1-9][0-9]{9}$/,
        length: 10,
        placeholder: '7400123456'
    },
    {
        code: 'DE',
        name: 'Germany',
        dialCode: '+49',
        flag: '🇩🇪',
        pattern: /^[1-9][0-9]{9,10}$/,
        length: 11,
        placeholder: '15112345678'
    },
    {
        code: 'FR',
        name: 'France',
        dialCode: '+33',
        flag: '🇫🇷',
        pattern: /^[1-9][0-9]{8}$/,
        length: 9,
        placeholder: '612345678'
    },
    {
        code: 'TR',
        name: 'Turkey',
        dialCode: '+90',
        flag: '🇹🇷',
        pattern: /^[5][0-9]{9}$/,
        length: 10,
        placeholder: '5321234567'
    },
    {
        code: 'AE',
        name: 'United Arab Emirates',
        dialCode: '+971',
        flag: '🇦🇪',
        pattern: /^[5][0-9]{8}$/,
        length: 9,
        placeholder: '501234567'
    },
    {
        code: 'SA',
        name: 'Saudi Arabia',
        dialCode: '+966',
        flag: '🇸🇦',
        pattern: /^[5][0-9]{8}$/,
        length: 9,
        placeholder: '501234567'
    },
    {
        code: 'IQ',
        name: 'Iraq',
        dialCode: '+964',
        flag: '🇮🇶',
        pattern: /^[7][0-9]{9}$/,
        length: 10,
        placeholder: '7901234567'
    },
    {
        code: 'AF',
        name: 'Afghanistan',
        dialCode: '+93',
        flag: '🇦🇫',
        pattern: /^[7][0-9]{8}$/,
        length: 9,
        placeholder: '701234567'
    },
    {
        code: 'CA',
        name: 'Canada',
        dialCode: '+1',
        flag: '🇨🇦',
        pattern: /^[2-9][0-9]{9}$/,
        length: 10,
        placeholder: '4165551234'
    },
    {
        code: 'AU',
        name: 'Australia',
        dialCode: '+61',
        flag: '🇦🇺',
        pattern: /^[4][0-9]{8}$/,
        length: 9,
        placeholder: '412345678'
    },
    {
        code: 'IN',
        name: 'India',
        dialCode: '+91',
        flag: '🇮🇳',
        pattern: /^[6-9][0-9]{9}$/,
        length: 10,
        placeholder: '9876543210'
    },
    {
        code: 'PK',
        name: 'Pakistan',
        dialCode: '+92',
        flag: '🇵🇰',
        pattern: /^[3][0-9]{9}$/,
        length: 10,
        placeholder: '3001234567'
    },
    {
        code: 'CN',
        name: 'China',
        dialCode: '+86',
        flag: '🇨🇳',
        pattern: /^[1][0-9]{10}$/,
        length: 11,
        placeholder: '13812345678'
    },
    {
        code: 'JP',
        name: 'Japan',
        dialCode: '+81',
        flag: '🇯🇵',
        pattern: /^[7-9][0-9]{9}$/,
        length: 10,
        placeholder: '9012345678'
    },
    {
        code: 'KR',
        name: 'South Korea',
        dialCode: '+82',
        flag: '🇰🇷',
        pattern: /^[1][0-9]{9}$/,
        length: 10,
        placeholder: '1012345678'
    },
    {
        code: 'IT',
        name: 'Italy',
        dialCode: '+39',
        flag: '🇮🇹',
        pattern: /^[3][0-9]{9}$/,
        length: 10,
        placeholder: '3123456789'
    },
    {
        code: 'ES',
        name: 'Spain',
        dialCode: '+34',
        flag: '🇪🇸',
        pattern: /^[6-7][0-9]{8}$/,
        length: 9,
        placeholder: '612345678'
    },
    {
        code: 'NL',
        name: 'Netherlands',
        dialCode: '+31',
        flag: '🇳🇱',
        pattern: /^[6][0-9]{8}$/,
        length: 9,
        placeholder: '612345678'
    },
];

const OTP_EXPIRY_TIME = 120; // 2 minutes in seconds
const OTP_STORAGE_KEY = 'otp_session';

export const initialValuesLoginByOtp = {
    CountryCode: 'IR',
    UsernameOrMobile: '',
    ClientOtpCode: '',
};

export const validationSchemaLoginByOtp = Yup.object({
    CountryCode: Yup.string().required(t('country_is_required')),
    UsernameOrMobile: Yup.string()
        .required(t('phone_number_is_required'))
        .test('valid-phone', t('invalid_phone_number_format'), function (value) {
            const {CountryCode} = this.parent;
            const country = countries.find(c => c.code === CountryCode);
            if (!country || !value) return false;
            return country.pattern.test(value);
        }),
    ClientOtpCode: Yup.string(),
});

export const handleSubmitLoginByOtp = (values: any) => {
    return {
        UsernameOrMobile: values.UsernameOrMobile,
        ClientOtpCode: values.ClientOtpCode,
        AppHash: "asdfghj"
    };
};

export const LoginByOtpForm = () => {
    const {values, handleSubmit, isSubmitting, setFieldValue, errors, touched, submitForm} = useFormContext();
    const {t} = useTranslation();
    const [loginByOtp] = useLoginByOtpMutation();
    const {push} = useNavigation()
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
    const [resendTimeLeft, setResendTimeLeft] = useState(30);
    const [isResendActive, setIsResendActive] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [otpComplete, setOtpComplete] = useState(false);

    const selectedCountry = countries.find(c => c.code === values.CountryCode);

    useEffect(() => {
        const storedSession = localStorage.getItem(OTP_STORAGE_KEY);
        if (storedSession) {
            try {
                const session = JSON.parse(storedSession);
                const now = Date.now();
                const elapsed = Math.floor((now - session.timestamp) / 1000);

                if (elapsed < OTP_EXPIRY_TIME) {
                    setShowOtpForm(true);
                    setTimeLeft(OTP_EXPIRY_TIME - elapsed);
                    setFieldValue('UsernameOrMobile', session.phoneNumber);
                    setFieldValue('CountryCode', session.countryCode);
                } else {
                    localStorage.removeItem(OTP_STORAGE_KEY);
                }
            } catch (error) {
                localStorage.removeItem(OTP_STORAGE_KEY);
            }
        }
    }, []);

    useEffect(() => {
        if (showOtpForm && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && showOtpForm) {
            setIsResendActive(false);
            setResendTimeLeft(0);
        }
    }, [timeLeft, showOtpForm]);

    useEffect(() => {
        if (showOtpForm && resendTimeLeft > 0 && isResendActive) {
            const timer = setTimeout(() => {
                setResendTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (resendTimeLeft === 0 && isResendActive) {
            setIsResendActive(false);
        }
    }, [resendTimeLeft, isResendActive, showOtpForm]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleSendCode = async (e: any) => {
        handleSubmit(e);

        if (!errors.UsernameOrMobile && !errors.CountryCode) {
            const session = {
                phoneNumber: values.UsernameOrMobile,
                countryCode: values.CountryCode,
                timestamp: Date.now(),
            };
            localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(session));

            setShowOtpForm(true);
            setTimeLeft(OTP_EXPIRY_TIME);
            setResendTimeLeft(30);
            setIsResendActive(true);
            await setFieldValue('ClientOtpCode', '');
            setOtpComplete(false);
        }
    };

    const handleResendCode = async () => {
        try {
            const session = {
                phoneNumber: values.UsernameOrMobile,
                countryCode: values.CountryCode,
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
        e.preventDefault();

        if (values.ClientOtpCode.length !== 6) return;

        try {
            await loginByOtp({
                UsernameOrMobile: values.UsernameOrMobile,
                ClientOtpCode: values.ClientOtpCode,
            }).unwrap();
            setIsSuccess(true);
            localStorage.removeItem(OTP_STORAGE_KEY);
        } catch (error) {
            setIsSuccess(false);
            setOtpComplete(false);
        }
    };

    const handlePhoneChange = (e: any) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (selectedCountry && value.length <= selectedCountry.length) {
            setFieldValue('UsernameOrMobile', value);
        }
    };

    if (showOtpForm) {
        return (
            <div className="w-full flex flex-col gap-28">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {t('code_sent_to')}: {selectedCountry?.dialCode}{values.UsernameOrMobile}
                        </span>
                        <button
                            type="button"
                            className="text-sm text-primary underline"
                            onClick={() => {
                                setShowOtpForm(false);
                                setFieldValue('ClientOtpCode', '');
                                setOtpComplete(false);
                                localStorage.removeItem(OTP_STORAGE_KEY);
                            }}
                        >
                            {t('change_number')}
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
                            color="secondary"
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

    return (
        <Form className="w-full flex flex-col gap-28" onSubmit={handleSendCode}>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <FormField
                        name="UsernameOrMobile"
                        label={t('phone_number')}
                        type="tel"
                        placeholder={selectedCountry?.placeholder || t('enter_phone_number')}
                        value={values.UsernameOrMobile}
                        onChange={handlePhoneChange}
                        startContent={
                            <Select
                                selectedKeys={[values.CountryCode]}
                                onChange={(e) => {
                                    setFieldValue('CountryCode', e.target.value);
                                    setFieldValue('UsernameOrMobile', '');
                                }}
                                classNames={{
                                    trigger: '!bg-transparent !shadow-none border-0 h-full',
                                    value: 'text-sm',
                                }}
                                aria-label={t('select_country')}
                                renderValue={(items) => {
                                    return items.map((item) => {
                                        const country = countries.find(c => c.code === item.key);
                                        return (
                                            <div key={item.key} className="flex items-center gap-1">
                                                <span className="text-lg">{country?.flag}</span>
                                                <span className="text-sm text-gray-600">{country?.dialCode}</span>
                                            </div>
                                        );
                                    });
                                }}
                            >
                                {countries.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        textValue={`${country.name} ${country.dialCode}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{country.flag}</span>
                                            <span>{country.name}</span>
                                            <span className="text-gray-500 text-sm">{country.dialCode}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        }
                    />
                    {errors.CountryCode && touched.CountryCode && (
                        <span className="text-red-500 text-sm">{errors.CountryCode}</span>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
                <AppButton
                    content={t('send_code')}
                    fullWidth={true}
                    color="secondary"
                    size="xl"
                    type="submit"
                    radius="xl"
                    variant="solid"
                    isLoading={isSubmitting}
                />

                <LoginButton/>
            </div>
        </Form>
    );
};