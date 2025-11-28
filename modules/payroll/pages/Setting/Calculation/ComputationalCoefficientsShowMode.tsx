import { Card, CardBody } from "@heroui/react";
import { Calculator, Strongbox2 } from "iconsax-react";
import { useTranslation } from "react-i18next";

import { Index as Icons } from "@/icons/Index.tsx";

export default function ComputationalCoefficientsShowMode({
  props,
}: {
  props: any;
}) {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="text-secondary-400 dark:text-secondary-0 mb-2 font-bold">
        {t("computationalCoefficients")}:
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

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-12 gap-y-4">
                <div className="flex gap-3">
                  <Icons.StickyNote />
                  <div className="flex justify-between w-full">
                    <span>{t("overtime")}:</span>
                    <span>{item.list}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icons.Plus color="#1E3363" />
                  <div className="flex justify-between w-full">
                    <span>{t("primeNumber")}:</span>
                    <span>{item.primeNumber}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icons.Plus color="#1E3363" />

                  <div className="flex justify-between w-full">
                    <span>{t("eleman")}:</span>
                    <span>{item.eleman}</span>
                  </div>
                </div>
                <div className="flex gap-3 col-span-full lg:col-span-1">
                  <Icons.Plus color="#1E3363" />

                  <div className="flex justify-between w-full">
                    <span>{t("coefficient")}:</span>
                    <span>{item.coefficient}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calculator className="w-[24px] text-[#1E3363]" />
                  <div className="flex justify-between w-full">
                    <span>{t("calculationInEid")}:</span>
                    <span>
                      {item.calculationInEid ? t("has") : t("hasNot")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icons.CalendarIcon />
                  <div className="flex justify-between w-full">
                    <span>{t("years")}:</span>
                    <span>{item.years ? t("has") : t("hasNot")}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Strongbox2 color="#1E3363" />
                  <div className="flex justify-between w-full">
                    <span>{t("fixedNumber")}:</span>
                    <span>{item.fixedNumber}</span>
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
