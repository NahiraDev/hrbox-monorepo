import {ReactNode, useEffect, useMemo} from "react";
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
  useEffect(() => {
    console.log(config)
  }, []);
  const config = useMemo(() => {

    return getDomainConfig(currentPanel);
  }, [currentPanel]);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{
        backgroundImage: loginBackground && `url(${loginBackground})`,
        backgroundColor: !loginBackground ? 'var(--color-panel-background)' : undefined,
      }}
    >
      <div className="min-h-screen lg:px-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-[1400px] flex lg:flex-row flex-col justify-between lg:gap-[156px] items-center lg:items-stretch py-20 lg:py-0">
          <div className='flex items-end justify-center gap-[50px] flex-1'>
            <div className="lg:flex flex-col gap-4 items-center">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className="flex flex-row justify-center flex-1 w-full">
              <div className="flex lg:flex-row flex-col items-start lg:items-end gap-8 lg:gap-[38px]">
                {/* Form Container */}
                <div className="flex flex-col items-center gap-[58px] w-full pt-[72px] lg:pt-0">
                  {/* Logo (Desktop) */}
                  <div className="lg:block hidden">
                    {config?.logo && (
                      <img
                        src={config.logo}
                        alt={config.title}
                        className="h-12 w-[168px]"
                      />
                    )}
                  </div>

                  {/* Form Box */}
                  <div className="bg-white/30 dark:bg-[#01101a]/80 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-xl w-[460px] px-[70px] py-10 flex flex-col items-center gap-6 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20">
                    <div className="flex items-center justify-center w-full">
                      {/*<AppButton*/}
                      {/*  content={<ArrowLeft size="24" className="text-secondary-1000"/>}*/}
                      {/*  size="md"*/}
                      {/*  isIconOnly={true}*/}
                      {/*  variant="light"*/}
                      {/*  onPress={() => window.history.back()}*/}
                      {/*/>*/}

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
        </div>
      </div>
    </div>
  );
}