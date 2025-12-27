import { I18nProvider } from "@react-aria/i18n";
import { Calendar, TimeInput } from "@heroui/react";
import { useSelector } from "react-redux";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export default function SelectCalendarWithTime() {
  const [calendarValue, setCalendarValue] = useState<any>();
  const locale = useSelector((state: any) => state.language.locale);
  const { t } = useTranslation();
  const calendar = useRef(null);

  const monthNames =
    locale === "fa-IR-u-ca-persian"
      ? [
          "فروردین",
          "اردیبهشت",
          "خرداد",
          "تیر",
          "مرداد",
          "شهریور",
          "مهر",
          "آبان",
          "آذر",
          "دی",
          "بهمن",
          "اسفند",
        ]
      : [
          "Jan.",
          "Feb.",
          "Mar.",
          "Apr.",
          "May",
          "Jun.",
          "Jul.",
          "Aug.",
          "Sep.",
          "Oct.",
          "Nov.",
          "Dec.",
        ];

  useEffect(() => {
    // console.log(monthNames);
  }, [locale]);

  useEffect(() => {
    // console.log(calendarValue);
  }, [calendarValue]);

  return (
    <I18nProvider locale={locale}>
      <div className="dark:bg-[rgba(4,66,92,0.60)] border-1 border-primary dark:border-surface-200 rounded-5 h-full w-full">
        <div className="bg-white dark:bg-info-1000 rounded-t-5 p-2">
          <div className="flex items-center justify-between bg-primary dark:bg-surface-200 pl-7 pr-6 w-full rounded-4 h-[35px]">
            <div className="flex-1 text-white text-xs">
              {t("date")}: {monthNames[calendarValue?.month - 1]}
              {calendarValue?.day}
            </div>
            <TimeInput
              className="flex-1"
              classNames={{
                base: "gap-[5px] justify-end",
                label: "text-white text-xs",
                inputWrapper:
                  "!bg-transparent hover:bg-transparent p-0 justify-end gap-0 w-auto shadow-none flex-initial ltr",
                innerWrapper: "justify-end w-auto",
                input: "justify-end gap-0",
                segment: "!text-white bg-!transparent text-xs",
              }}
              hourCycle={24}
              label={t("time") + ":"}
              labelPlacement="outside-left"
            />
          </div>
        </div>
        <div className="h-full w-full">
          <Calendar
            ref={calendar}
            aria-label="Date Range"
            className="border-0 shadow-none rounded-none w-full h-full"
            classNames={{
              base: "bg-transparent dark:bg-transparent w-full h-full",
              headerWrapper: "bg-white dark:bg-info-1000 pt-2",
              gridHeader: "bg-white dark:bg-info-1000 shadow-none",
              gridHeaderRow: "justify-around mt-4",
              title:
                "text-secondary-400 dark:text-secondary-0 font-semibold text-xs",
              gridHeaderCell:
                "text-secondary-400 dark:text-secondary-0 text-xs font-[600]",
              cellButton:
                "text-secondary-400 dark:text-secondary-0 font-normal text-xs dark:hover:bg-surface-200 dark:data-[selected=true]:bg-surface-200 data-[outside-month]:font-light data-[outside-month]:text-secondary-400",
              nextButton: "text-secondary-400 dark:text-secondary-0 w-1/3",
              prevButton: "text-secondary-400 dark:text-secondary-0 w-1/3",
              gridWrapper: "h-full",
              content: "w-full h-full rounded-5",
              gridBodyRow: "w-full justify-between items-stretch px-7 my-3",
            }}
            onChange={(value: any) => setCalendarValue(value)}
          />
        </div>
      </div>
    </I18nProvider>
  );
}
