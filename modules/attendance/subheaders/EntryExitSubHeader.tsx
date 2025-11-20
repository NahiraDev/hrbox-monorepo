import { AppButton, AppPageTitle } from "@hrbox/uikit/components";
import {
  ArrowDown2,
  TickCircle,
  TimerPause,
  TimerStart,
  Trello,
} from "iconsax-reactjs";

import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useEffect, useRef, useState } from "react";
import { addToast, ToastProvider } from "@heroui/react";
import { FormProvider } from "@hrbox/core/providers";
import { FormField } from "@hrbox/uikit/components/FormField";
import { AppDropDown } from "@hrbox/uikit/components/AppDropDown";

const EntryExitSubHeader = (props: any) => {
  const { openModal } = useModalContext();
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (clock) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [clock]);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };

  return (
    <>
      <FormProvider
        formId="calenderHeader"
        initialValues={headerInitialValues}
        validationSchema={{}}
        enableCache={false}
      >
        <div className="fixed z-100">
          <ToastProvider placement="top-center" />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <AppPageTitle title={props.title} icon={props.icon} />
          </div>
          <div className="mt-8 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-20 h-20 dark:bg-[rgba(4,66,92,0.6)] dark:shadow-none ">
                <p className="text-[40px]! text-secondary-400 font-inter">
                  {formatTime(hours)}
                </p>
              </div>
              <div className="mx-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="14"
                  viewBox="0 0 4 14"
                  fill="none"
                  className="dark:[&>circle]:fill-white"
                >
                  <circle
                    cx="1.92605"
                    cy="1.92593"
                    r="1.92593"
                    fill="#1E3363"
                  />
                  <circle
                    cx="1.92593"
                    cy="11.4074"
                    r="1.92593"
                    fill="#1E3363"
                  />
                </svg>
              </div>
              <div className="shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-20 h-20 dark:bg-[rgba(4,66,92,0.6)] dark:shadow-none">
                <p className="text-[40px]! text-secondary-400 font-inter">
                  {formatTime(minutes)}
                </p>
              </div>
              <div className="mx-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="14"
                  viewBox="0 0 4 14"
                  fill="none"
                  className="dark:[&>circle]:fill-white"
                >
                  <circle
                    cx="1.92605"
                    cy="1.92593"
                    r="1.92593"
                    fill="#1E3363"
                  />
                  <circle
                    cx="1.92593"
                    cy="11.4074"
                    r="1.92593"
                    fill="#1E3363"
                  />
                </svg>
              </div>
              <div className="shadow-[0_1px_6px_0_rgba(10,154,215,0.40)] rounded-xl bg-[#DCF0F9] flex items-center justify-center w-20 h-20 dark:bg-[rgba(4,66,92,0.6)] dark:shadow-none">
                <p className="text-[40px]! text-secondary-400 font-inter">
                  {formatTime(seconds)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <p className="text-xl! font-semibold! font-open-sans">
                Today is Sunday, January 13, 2025, at 20:02.
              </p>
              <div className="flex gap-8 w-full justify-end">
                <FormField
                  name="project-name"
                  title="Select project / Task"
                  component={AppDropDown}
                  size="md"
                  startIcon={<Trello size={24} />}
                  endIcon={<ArrowDown2 size={20} />}
                  className="border-1 border-primary px-3 py-2 gap-2"
                />
                <AppButton
                  size="md"
                  color={clock ? "danger" : "success"}
                  startContent={
                    clock ? (
                      <TimerPause color="white" variant="Bold" />
                    ) : (
                      <TimerStart color="white" variant="Bold" />
                    )
                  }
                  radius="lg"
                  onPress={() => {
                    const newClockValue = !clock;
                    setClock(newClockValue);

                    addToast({
                      timeout: 1000,
                      description:
                        "Traffic registration was done successfully!",
                      variant: "solid",
                      icon: <TickCircle color="white" size={24} />,
                      classNames: {
                        icon: newClockValue
                          ? "w-[40px] h-[40px] text-red-500 rounded-full p-1 border-1 border-red-100"
                          : "w-[40px] h-[40px] text-green-600 rounded-full p-1 border-1 border-success-150",
                        description: newClockValue
                          ? "text-red-500 !dark:text-primary !text-sm"
                          : "text-green-600 dark:text-success !text-sm",
                        base: newClockValue
                          ? "!w-[500px] bg-red-50 dark:bg-[#67141499]"
                          : "!w-[500px] bg-green-50 dark:bg-[#0E4A2799]",
                      },
                    });
                  }}
                  content={
                    <span className="text-white">
                      {clock ? "Clock out" : "Clock in"}
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default EntryExitSubHeader;
