import { I18nProvider } from "@react-aria/i18n";
import { Calendar } from "@heroui/react";
import { useSelector } from "react-redux";
import "./style.css";

export default function SelectCalendar() {
  const locale = useSelector((state: any) => state.language.locale);

  return (
    <I18nProvider locale={locale}>
      <Calendar
        aria-label="Date Range"
        className="border-0 shadow-none"
        classNames={{
          base: "bg-transparent dark:bg-transparent",
          headerWrapper: "dark:bg-info-1000",
          gridHeader: "dark:bg-info-1000",
          title:
            "text-secondary-400 dark:text-secondary-0 font-semibold text-xs",
          gridHeaderCell: "text-secondary-400 dark:text-secondary-0 text-xs",
          cellButton:
            "text-secondary-400 dark:text-secondary-0 font-normal text-xs dark:hover:bg-surface-200 dark:data-[selected=true]:bg-surface-200 data-[outside-month]:font-light data-[outside-month]:text-secondary-400",
          nextButton: "text-secondary-400 dark:text-secondary-0",
          prevButton: "text-secondary-400 dark:text-secondary-0",
        }}
      />
    </I18nProvider>
  );
}
