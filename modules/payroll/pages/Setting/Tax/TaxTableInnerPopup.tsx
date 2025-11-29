import { useTranslation } from "react-i18next";

import { AppInput } from "@/components/AppInput.tsx";

export default function TaxTableInnerPopup({ props }: { props: any }) {
  const { t } = useTranslation();
  const { isShowMode } = props;

  return (
    <>
      <div className="bg-main-light text-secondary-400 dark:bg-[rgba(4,66,92,0.60)] dark:text-secondary-0 py-3 px-5 rounded-4">
        {t("taxTable")}
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <div className="flex flex-col gap-[1px] border-r-1 border-transparent">
            <div className="w-full text-center py-3 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
              {t("monthlyRial")}
            </div>
            <div className="flex gap-[1px]">
              <div className="w-full text-center py-3 px-4 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
                {t("from")}
              </div>
              <div className="w-full text-center py-3 px-4 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
                {t("to")}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-center">
              <div className="w-fit">
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mx-auto">
              <div className="w-fit">
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[1px] border-r-1 border-transparent">
            <div className="w-full text-center py-3 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
              {t("yearlyRial")}
            </div>
            <div className="flex gap-[1px]">
              <div className="w-full text-center py-3 px-4 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
                {t("from")}
              </div>
              <div className="w-full text-center py-3 px-4 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)]">
                {t("to")}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-center">
              <div className="w-fit">
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mx-auto">
              <div className="w-fit">
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper:
                          "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                      },
                      type: "number",
                      isShowMode,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full text-center py-3 font-medium text-secondary-400 dark:text-secondary-0 bg-main-light dark:bg-[rgba(4,66,92,0.60)] h-[96.93px] flex items-center justify-center">
            {t("taxRate")}
          </div>
          <div className="flex justify-center">
            <div className="w-fit">
              <div className="px-4 py-2">
                <AppInput
                  props={{
                    classNames: {
                      inputWrapper:
                        "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                    },
                    type: "number",
                    isShowMode,
                  }}
                />
              </div>
              <div className="px-4 py-2">
                <AppInput
                  props={{
                    classNames: {
                      inputWrapper:
                        "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                    },
                    type: "number",
                    isShowMode,
                  }}
                />
              </div>
              <div className="px-4 py-2">
                <AppInput
                  props={{
                    classNames: {
                      inputWrapper:
                        "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                    },
                    type: "number",
                    isShowMode,
                  }}
                />
              </div>
              <div className="px-4 py-2">
                <AppInput
                  props={{
                    classNames: {
                      inputWrapper:
                        "!rounded-[2px] border-1 border-primary-0 w-fit !shadow-none",
                    },
                    type: "number",
                    isShowMode,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
