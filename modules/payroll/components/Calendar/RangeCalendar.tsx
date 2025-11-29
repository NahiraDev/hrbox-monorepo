import { RangeCalendar } from "@heroui/react";
import { useSelector } from "react-redux";
import "./style.css";
import { I18nextProvider } from "react-i18next";

export default function RangedCalendar() {
  const locale: any = useSelector((state: any) => state.language.locale);

  return (
    <I18nextProvider locale={locale}>
      <RangeCalendar
        aria-label="Date Range"
        className="border-0 shadow-none custom-selected-bg"
        classNames={{
          base: "bg-transparent dark:bg-transparent",
          headerWrapper: "dark:bg-info-1000",
          gridHeader: "dark:bg-info-1000",
          title:
            "text-secondary-400 dark:text-secondary-0 font-semibold text-xs",
          gridHeaderCell: "text-secondary-400 dark:text-secondary-0 text-xs",
          cellButton:
            "text-xs text-secondary-400 hover:bg-primary hover:text-white dark:hover:bg-surface-200 dark:text-secondary-0 data-[outside-month]:text-secondary-400 data-[outside-month]:font-light data-[outside-month]:hover:bg-transparent data-[selected=true]:data-[range-selection=true]:text-secondary-400 data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:dark:bg-surface-200 data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:dark:bg-surface-200 data-[selected=true]:data-[range-selection=true]:dark:text-secondary-0",
          nextButton: "text-secondary-400 dark:text-secondary-0",
          prevButton: "text-secondary-400 dark:text-secondary-0",
        }}
      />
    </I18nextProvider>
  );
}
