import { ArrowLeft, Global, Moon } from 'iconsax-react';
import { AppButton } from '@hrbox/uikit/components/AppButton';
import { SliderSSO } from '@hrbox/modules/sso/components/SliderSSO';
// @ts-ignore
import {LogoMobile} from "@hrbox/uikit/icons/LogoMobile";
// @ts-ignore
import {LogoHRLink} from "~/UIKit/icons/LogoHRLink";
import { ThemeToggle } from "@core/components/ThemeToggle";
import { LanguageToggle } from "@core/components/LanguageToggle";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { motion } from 'framer-motion';

export const AuthLayout = () => {

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


          {/* --- Form + Toggles Row --- */}
          <div className='relative flex items-end justify-center gap-6'>

            {/* testing purpose */}
            <div>
              {/* --- Controls Section (Language + Dark Mode) --- */}
              <div className="hidden lg:flex flex-col gap-3 self-center">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>

            <div className="flex flex-row justify-center lg:flex-1 w-full">

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
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center gap-4">
                          <Spinner size="lg" color="primary" />
                          <p className="text-neutral-500 dark:text-neutral-400">
                            بارگذاری...
                          </p>
                        </div>
                      }
                    >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Outlet />
                    </motion.div>
                    </Suspense>
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
