import { DatePicker } from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function AppDatePicker({ props }: { props: any }) {
  const { t } = useTranslation();
  const { label } = props;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <DatePicker
        calendarProps={{
          classNames: {
            cellButton: "dark:text-white",
          },
        }}
        className="rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        classNames={{
          segment: "dark:text-white",
          popoverContent: "dark:text-white",
        }}
        label={t("effectiveDate")}
        labelPlacement="inside"
      />
    </div>
  );
}
