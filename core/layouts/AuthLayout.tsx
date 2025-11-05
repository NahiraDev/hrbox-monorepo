import { Button } from '@heroui/react';
import { ArrowLeft, Global, Moon } from 'iconsax-react';
import { useEffect, useState } from 'react';

import { LogoHRLink } from '@root/shared/icons/LogoHRLink';
import { LogoMobile } from '@root/shared/icons/LogoMobile';
import { setLanguage, useAppDispatch } from '@core/redux';
import { AppButton } from 'shared/components';
import { SliderSSO } from '@module/sso/features/common';
import { t } from 'i18next';

export const AuthLayout = ({ content }: any) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLanguage(localStorage.getItem('lang') as string));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/images/lightmode-auth-hrlink.webp')]">
      <div className="min-h-screen lg:px-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-[1400px] flex lg:flex-row flex-col justify-between lg:gap-[156px] items-center lg:items-stretch py-20 lg:py-0">

          {/* Mobile Header */}
          <div className="lg:hidden flex justify-center py-4 fixed top-0 left-0 w-full border-b border-neutral-150 bg-mobile-header dark:border-[rgba(51,51,51,0.4)] dark:bg-[linear-gradient(245deg,_rgba(2,44,61,0.8)_28.83%,_rgba(1,16,26,0.8)_85.57%)] backdrop-blur-md z-50">
            <div className="p-2">
              <LogoMobile />
            </div>
          </div>

          {/* Left Section - Form */}
          <div className="flex flex-col justify-center lg:flex-1 w-full">
            <div className="flex lg:flex-row flex-col items-start lg:items-end gap-8 lg:gap-[38px]">
              {/* Form Container */}
              <div className="flex flex-col items-center gap-10 w-full pt-[72px] lg:pt-0">
                <div className="lg:block hidden">
                  <LogoHRLink />
                </div>

                <div className="dark:bg-[#01101a66] bg-white/30 shadow-md rounded-xl md:w-[460px] w-full lg:px-8 lg:py-10 p-4 flex flex-col items-center gap-6 backdrop-blur-sm">
                  <div className="flex items-center gap-7 w-full">
                    <AppButton
                      props={{
                        className: `!rounded-none justify-left hover:!bg-transparent !p-0`,
                        variant: 'light',
                        onPress: () => history.back(),
                        startContent: (
                          <ArrowLeft
                            size="24"
                          />
                        ),
                        isIconOnly: true,
                      }}
                    />

                    <span className="text-secondary-1000 lg:text-xl text-base lg:font-bold font-semibold dark:text-white">
                      Please Enter Your Infomaition!
                    </span>
                  </div>

                  {content}

                  <div className="flex items-center justify-center gap-3 w-full">
                    <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
                    <span className="text-neutral-400 dark:neutral-250 text-sm font-bold">
                      {t('or')}
                    </span>
                    <hr className="lg:w-[128px] w-full h-[1px] text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Slider */}
          <div className="hidden lg:flex lex lg:flex-1 lg:items-center lg:justify-center">
            <SliderSSO />
          </div>

          {/* Mobile Footer */}
          <div className="flex flex-col gap-1 fixed bottom-0 left-0 w-full pb-5 px-4 lg:hidden z-40">
            <div className="flex justify-between">
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
                    isIconOnly: true,
                    startContent: <Moon size="16" />,
                  }}
                />
                <AppButton
                  props={{
                    className: 'p-1 !w-4 !h-4 min-w-fit',
                    variant: 'light',
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
              className="w-full"
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
        </div>
      </div>
    </div>
  );
};
