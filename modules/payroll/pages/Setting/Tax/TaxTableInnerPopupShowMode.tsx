import { Card, CardBody } from "@heroui/react";
import { CalendarCircle, Receipt1 } from "iconsax-react";
import { useTranslation } from "react-i18next";

import { CalendarIcon } from "@/icons/CalendarIcon.tsx";

export default function TaxTableInnerPopupShowMode({ props }: { props: any }) {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="text-secondary-400 dark:text-secondary-0 mb-2 font-bold">
        {t("taxTable")}:
      </div>
      {data.map((item: any, index: number) => (
        <Card
          key={index}
          className="shadow-none border-1 border-main-light w-full my-3"
          classNames={{
            body: "!bg-gradient-to-r from-white via-[#EEF9FF] to-white dark:bg-gradient-to-r dark:from-[#01101A] dark:via-[#022C3D] dark:to-[#01101A]",
          }}
          radius="sm"
        >
          <CardBody className="p-4 space-y-2">
            <div className="flex gap-4 text-secondary-400">
              <div className="font-semibold text-secondary-400">
                {" "}
                {index + 1}.{" "}
              </div>

              <div className="flex flex-col w-full gap-3">
                <div className="flex gap-3 justify-between w-full">
                  <div className="flex gap-3 w-[50%] font-semibold">
                    <CalendarCircle />
                    {t("monthlyRial")}:
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex justify-end gap-4">
                      <span>{t("from")}:</span>
                      {item.monthlyFrom}
                    </div>
                    <div className="flex justify-end gap-4">
                      <span>{t("to")}:</span>
                      <span>{item.monthlyTo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between w-full">
                  <div className="flex gap-3 w-[50%] font-semibold">
                    <CalendarIcon />
                    {t("yearlyRial")}:
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex justify-end gap-4">
                      <span>{t("from")}:</span>
                      {item.yearlyFrom}
                    </div>
                    <div className="flex justify-end gap-4">
                      <span>{t("to")}:</span>
                      <span>{item.yearlyTo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between w-full">
                  <div className="flex gap-3 font-semibold">
                    <Receipt1 />
                    {t("taxRate")}
                  </div>
                  <div className="flex w-[66%] justify-start gap-4">
                    {item.taxRate}:
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
