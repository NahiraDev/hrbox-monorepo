import { ReactNode, useMemo } from "react";
import { ArrowLeft } from "iconsax-reactjs";
import { motion } from "framer-motion";
import { AppButton } from "@hrbox/uikit/components/AppButton";
import { SliderSSO } from "@hrbox/modules/sso/components/SliderSSO";
import { ThemeToggle } from "@hrbox/core/components/ThemeToggle";
import { LanguageToggle } from "@hrbox/core/components/LanguageToggle";
import { useAppSelector } from "@hrbox/core/redux";
import { getDomainConfig } from "@hrbox/core/config/theme";
import { useDynamicBackground } from "@hrbox/core/hooks/useDynamicBackground";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { loginBackground } = useDynamicBackground();
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);
  const config = useMemo(() => {
    return getDomainConfig(currentPanel);
  }, [currentPanel]);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{
        backgroundImage: loginBackground ? `url(${loginBackground})` : 'none',
        backgroundColor: !loginBackground ? 'var(--color-panel-background)' : undefined,
      }}
    >
      <div className="min-h-screen lg:px-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-[1400px] flex lg:flex-row flex-col justify-between lg:gap-[156px] items-center lg:items-stretch py-20 lg:py-0">

          {/* Mobile Header */}
          <div className="lg:hidden flex justify-center py-4 fixed top-0 left-0 w-full border-b border-neutral-150 bg-white/80 dark:border-neutral-700 dark:bg-[#01101a]/80 backdrop-blur-md z-50">
            <div className="p-2">
              {config?.logoMobile && (
                <img
                  src={config.logoMobile}
                  alt={config.title}
                />
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className='relative flex items-end justify-center gap-6 flex-1'>
            {/* Controls (Desktop) */}
            <div className="lg:flex flex-col gap-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className="flex flex-row justify-center lg:flex-1 w-full">
              <div className="flex lg:flex-row flex-col items-start lg:items-end gap-8 lg:gap-[38px]">
                {/* Form Container */}
                <div className="flex flex-col items-center gap-10 w-full pt-[72px] lg:pt-0">
                  {/* Logo (Desktop) */}
                  <div className="lg:block hidden">
                    {config?.logo && (
                      <img
                        src={config.logo}
                        alt={config.title}
                        className="h-12"
                      />
                    )}
                  </div>

                  {/* Form Box */}
                  <div className="bg-white/80 dark:bg-[#01101a]/80 shadow-2xl rounded-2xl md:w-[460px] w-full lg:px-8 lg:py-10 p-6 flex flex-col items-center gap-6 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20">
                    <div className="flex items-center gap-7 w-full">
                      <AppButton
                        content={<ArrowLeft size="24" className="text-secondary-1000"/>}
                        size="md"
                        isIconOnly={true}
                        variant="light"
                        onPress={() => window.history.back()}
                      />

                      <span className="text-secondary-1000 lg:text-xl text-base lg:font-bold font-semibold dark:text-white">
                        Please Enter Your Information!
                      </span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {children}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Slider */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
            <SliderSSO />
          </div>

          {/* Mobile Footer */}
          <div className="flex flex-col gap-1 fixed bottom-0 left-0 w-full pb-5 px-4 lg:hidden z-40">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-secondary-1000 dark:text-white text-xs font-semibold leading-normal">
                  Copyright © {new Date().getFullYear()} {config?.title || 'HRBox'}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <ThemeToggle />
                <LanguageToggle />
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
                fill="currentColor"
                className="text-neutral-300 dark:text-neutral-700"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}