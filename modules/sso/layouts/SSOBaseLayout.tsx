import { Button, Link } from '@heroui/react';
import { ArrowLeft, Global, Message, Moon, User } from 'iconsax-react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LogoHRLink, Google, LogoMobile } from '../../../core';
import { setLanguage } from '../../../core';
import { AppButton } from '../../../core';
import { useAppDispatch, useAppSelector } from '../../../core';
import { useTheme } from '@heroui/use-theme';

import { SliderSSO } from '../features/common';
import LightModeBg from '../../../public/assets/hrlink/lightmode-bg.webp';
import DarkModeBg from '../../../public/assets/hrlink/darkmode-bg.webp';

export const SSOBaseLayout = ({ props }: { props: any }) => {
  const [mounted, setMounted] = useState(false);
  const { children, formTitle, signInWithPhone, arrowBack, isRegister } = props;
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [isXLargeScreen, setIsXLargeScreen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.language.lang);
  const currentLang = useAppSelector((state) => state.language.lang);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleOpenLoginWithPhoneNumber = () => {};

  const handleOpenLoginByUserName = () => {};

  const handleOpenRegister = () => {};
  const toggleLanguage = (language: string) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  };

  const handleLanguageChange = () => {
    const newLang = currentLang === 'en' ? 'fa' : 'en';

    document.documentElement.lang = newLang;
    toggleLanguage(newLang);
  };

  useEffect(() => {
    dispatch(setLanguage(localStorage.getItem('lang') as string));
    // i18n.changeLanguage(localStorage.getItem('lang') as string);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsXLargeScreen(window.innerWidth >= 1440);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div
      key={currentLang}
      className={`relative transition-all duration-500 ease-in-out ${
        currentLang === 'en' ? 'ltr' : 'rtl'
      } dark:bg-mobile-bg-dark bg-mobile-bg lg:bg-cover lg:bg-center lg:bg-no-repeat`}
      dir={currentLang === 'en' ? 'ltr' : 'rtl'}
      style={
        isLargeScreen
          ? {
              backgroundImage: `url(${theme === 'dark' ? DarkModeBg : LightModeBg})`,
            }
          : {}
      }
    >
      <div className="bg-cover bg-center min-h-screen lg:px-10 px-4 lg:flex items-center justify-center">
        <div
          className="flex lg:flex-row flex-col justify-between lg:gap-[156px]"
          style={{ zoom: !isXLargeScreen ? '1' : '1.3' }}
        >
          <div className="lg:hidden flex justify-center py-4 fixed top-0 left-0 w-full border-b border-neutral-150 bg-mobile-header dark:border-[rgba(51,51,51,0.4)] dark:bg-[linear-gradient(245deg,_rgba(2,44,61,0.8)_28.83%,_rgba(1,16,26,0.8)_85.57%)] backdrop-blur-md">
            <div className="p-2">
              <LogoMobile />
            </div>
          </div>
          <div className="flex flex-col align-centger gap-10">
            <div className="lg:flex items-end gap-[38px]">
              <div className="lg:flex hidden flex-col gap-4">
                <Button
                  className="p-3 !w-[52px] !h-[52px] min-w-fit"
                  variant="light"
                  onPress={toggleTheme}
                >
                  <Moon
                    className="text-secondary-1000 dark:text-white"
                    size="28"
                  />
                </Button>
                <Button
                  className="p-3 !w-[52px] !h-[52px] min-w-fit"
                  variant="light"
                  onPress={handleLanguageChange}
                >
                  <Global
                    className="text-secondary-1000 dark:text-white"
                    size="28"
                  />
                </Button>
              </div>
              <div className="flex flex-col items-center gap-10 pt-[72px] lg:pt-0">
                <div className="lg:block hidden">
                  <LogoHRLink />
                </div>
                <div className="dark:bg-[#01101a66] bg-[#ffffff4d]   shadow-md rounded-xl md:w-[460px] w-full lg:px-8 lg:py-10 p-4 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-7 w-full lg:max-w-xs">
                    {arrowBack && (
                      <AppButton
                        props={{
                          className: `min-w-fit !rounded-none justify-left hover:!bg-transparent !p-0 ${lang === 'fa' && 'rotate-180'}`,
                          variant: 'light',
                          onPress: () => history.back(),
                          startContent: (
                            <ArrowLeft
                              className="dark:text-white text-black"
                              size="24"
                            />
                          ),
                          isIconOnly: true,
                        }}
                      />
                    )}
                    <span className="text-secondary-1000 lg:text-xl text-base lg:font-bold font-semibold dark:text-white">
                      {formTitle}
                    </span>
                  </div>
                  {children}
                  {!isRegister && (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
                      <span className="text-neutral-400 dark:neutral-250 text-sm font-bold">
                        {t('or')}
                      </span>
                      <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
                    </div>
                  )}
                  <div className="w-full md:max-w-xs flex flex-col gap-3">
                    {!isRegister && (
                      <>
                        {signInWithPhone ? (
                          <AppButton
                            props={{
                              text: t('sign_in_with_phone_number'),
                              size: 'lg',
                              className:
                                'bg-white dark:bg-info-1000 text-sm justify-start gap-3 font-semibold shadow-custom text-[#0000008A] dark:text-white',
                              startContent: (
                                <Message className="text-primary-400 dark:text-white lg:text-[22px] text-base" />
                              ),
                              onPress: handleOpenLoginWithPhoneNumber,
                            }}
                          />
                        ) : (
                          <AppButton
                            props={{
                              text: t('sign_in_with_username'),
                              className:
                                'bg-white dark:bg-info-1000 text-sm justify-start gap-3 font-semibold shadow-custom text-[#0000008A] dark:text-white',
                              fullWidth: true,
                              size: 'lg',
                              onPress: handleOpenLoginByUserName,
                              startContent: (
                                <User className="lg:text-primary-400 text-secondary-400 dark:text-white lg:text-[22px] text-base" />
                              ),
                            }}
                          />
                        )}
                        <AppButton
                          props={{
                            text: t('sign_in_with_google'),
                            className:
                              'bg-white dark:bg-info-1000 text-sm justify-start gap-[14px] font-semibold shadow-custom text-[#0000008A] dark:text-white',
                            fullWidth: true,
                            size: 'lg',
                            startContent: <Google />,
                          }}
                        />
                      </>
                    )}

                    {isRegister ? (
                      <div className="flex items-center lg:justify-center justify-between gap-2">
                        <span className="text-[#1A1A1A] dark:text-white text-xs font-normal leading-5">
                          {t('have_an_account')}
                        </span>
                        <Link
                          className="text-[#007AFF] dark:text-info-400 text-xs font-normal leading-5 cursor-pointer"
                          onPress={handleOpenLoginByUserName}
                        >
                          {t('sign_in')}
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-center lg:justify-center justify-between gap-2">
                        <span className="text-[#1A1A1A] dark:text-white text-xs font-normal leading-5">
                          {t('dont_have_an_account')}
                        </span>
                        <Link
                          className="text-[#007AFF] dark:text-info-400 text-xs font-normal leading-5 cursor-pointer"
                          onPress={handleOpenRegister}
                        >
                          {t('sign_up_now')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 fixed bottom-0 left-0 w-full pb-5 px-4">
            <div className="flex lg:hidden justify-between">
              <div>
                <span className="text-secondary-1000 dark:text-white text-xs font-semibold leading-normal">
                  Copyright - 2025
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <AppButton
                  props={{
                    className: 'p-1 !w-4 !h-4 min-w-fit',
                    variant: 'light',
                    onPress: toggleTheme,
                    isIconOnly: true,
                    startContent: <Moon size="16" />,
                  }}
                />
                <AppButton
                  props={{
                    className: 'p-1 !w-4 !h-4 min-w-fit',
                    variant: 'light',
                    onPress: handleLanguageChange,
                    startContent: (
                      <Global
                        className="text-secondary-1000 dark:text-white"
                        size="16"
                      />
                    ),
                  }}
                />
              </div>
            </div>
            <svg
              className="lg:hidden w-full"
              fill="none"
              height="1"
              preserveAspectRatio="none"
              viewBox="0 0 288 1"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.666667L144 0L288 0.75L144 1L0 0.666667Z"
                fill="#B2B2B2"
              />
            </svg>
          </div>
          <SliderSSO />
        </div>
      </div>
    </div>
  );
};
