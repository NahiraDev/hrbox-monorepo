import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import { Calculator } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Index as Icons } from "@/icons/Index.tsx";
import { RootState } from "@/redux/store.ts";
import { useDarkMode } from "@/context/DarkMode.tsx";

type SalaryCalculateBoxProps = {
  status: string;
  peopleCount: number;
  editCount: number;
  totalAmount: string;
  month: string;
  showCalculate: boolean;
  persianMonth: string;
  onClick: () => void;
};

export default function SalaryCalculateBox({
  props,
}: {
  props: SalaryCalculateBoxProps;
}) {
  const {
    status,
    peopleCount,
    editCount,
    totalAmount,
    month,
    showCalculate,
    persianMonth,
    onClick,
  } = props;

  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const { darkMode } = useDarkMode();

  return (
    <Card
      className={`hover:border-primary dark:hover:border-surface-200 cursor-pointer border-1 border-transparent max-w-[400px] ${showCalculate ? "bg-[#FFF7ED] dark:bg-[#482800]" : "bg-[#F1FFF7] dark:bg-[#09311A]"} shadow-[0px_1px_3px_0px_rgba(8,14,28,0.30)]`}
      isPressable={!!onClick}
      onPress={onClick}
    >
      <CardHeader className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2 items-center">
          <Icons.Card color={`${darkMode ? "#DEE1E8" : "#1E3363"}`} />
          <p className="text-md font-semibold text-secondary-1000 dark:text-white">
            {lang === "fa" ? persianMonth : month}
          </p>
        </div>
        <Button
          className="bg-white dark:bg-info-1000 dark:border-surface-200 dark:text-white justify-start text-xs p-1 h-fit border-1 border-primary text-secondary-1000 rounded-[4px] hover:bg-primary-400 hover:text-white"
          startContent={<Calculator size={12} />}
        >
          {showCalculate ? t("calculate") : t("revert")}
        </Button>
      </CardHeader>

      <Divider className="bg-netural-100 dark:bg-netural-700 w-[calc(100%-24px)] m-auto" />

      <CardBody className="space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("status")}:
          </div>
          <div className="dark:text-white font-[400] flex items-center gap-1">
            {status === "Done" ? <Icons.Check /> : <Icons.Pending size={16} />}
            {status}
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("nuPeople")}:
          </div>
          <div className="dark:text-white font-[400]">
            {peopleCount} {t("people")}
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("nuEdit")}:
          </div>
          <div className="dark:text-white font-[400]">
            {editCount} {t("times")}
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("totalAmount")}:
          </div>
          <div className="dark:text-white font-[400] text-[#353535]">
            {totalAmount} {lang === "fa" ? "ریال" : "Rial"}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
