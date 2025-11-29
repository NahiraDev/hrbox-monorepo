import { I18nProvider } from "@react-aria/i18n";
import { RangeCalendar, TimeInput } from "@heroui/react";
import { useSelector } from "react-redux";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function RangeCalendarWithTime() {
  const [calendarValue, setCalendarValue] = useState<any>();
  const locale = useSelector((state: any) => state.language.locale);
  const { t } = useTranslation();

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

  return (
    <I18nProvider locale={locale}>
      <div>
        <div className="bg-white dark:bg-info-1000 rounded-t-5 p-2">
          <div className="flex items-center justify-between bg-primary dark:bg-surface-200 px-4 w-full rounded-4 h-[30px]">
            <div className="flex-1 text-white text-xs">
              {t("date")}: {monthNames[calendarValue?.start?.month - 1]}
              {calendarValue?.start?.day}
              {calendarValue && `-`}
              {calendarValue?.end?.day}
            </div>
            <TimeInput
              className="flex-1"
              classNames={{
                base: "gap-[5px] justify-end",
                label: "text-white text-xs",
                inputWrapper:
                  "!bg-transparent hover:bg-transparent p-0 justify-end gap-0 w-auto shadow-none flex-initial ltr",
                innerWrapper: "justify-end w-auto",
                input: "justify-end gap-0 !ltr",
                segment: "!text-white bg-!transparent text-xs",
              }}
              hourCycle={24}
              label={t("time") + ":"}
              labelPlacement="outside-left"
            />
          </div>
        </div>
        <div>
          <RangeCalendar
            aria-label="Date Range"
            className="border-0 shadow-none rounded-none"
            classNames={{
              base: "bg-transparent dark:bg-transparent",
              headerWrapper: "dark:bg-info-1000",
              gridHeader: "dark:bg-info-1000",
              title:
                "text-secondary-400 dark:text-secondary-0 font-semibold text-xs",
              gridHeaderCell:
                "text-secondary-400 dark:text-secondary-0 text-xs",
              cellButton:
                "text-xs text-secondary-400 hover:bg-primary hover:text-white dark:hover:bg-surface-200 dark:text-secondary-0 data-[outside-month]:text-secondary-400 data-[outside-month]:font-light data-[outside-month]:hover:bg-transparent data-[selected=true]:data-[range-selection=true]:text-secondary-400 data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:dark:bg-surface-200 data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:dark:bg-surface-200 data-[selected=true]:data-[range-selection=true]:dark:text-secondary-0",
              nextButton: "text-secondary-400 dark:text-secondary-0",
              prevButton: "text-secondary-400 dark:text-secondary-0",
            }}
            onChange={(value: any) => setCalendarValue(value)}
          />
        </div>
      </div>
    </I18nProvider>
  );
}
