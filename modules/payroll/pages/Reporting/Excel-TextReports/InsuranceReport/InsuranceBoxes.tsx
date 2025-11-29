import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import {
  ArrowRight,
  Buildings2,
  DocumentFilter,
  DollarSquare,
  TicketDiscount,
} from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store.ts";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { DocumentSquare } from "@/icons/DocumentSquare.tsx";

type InsuranceProps = {
  organizationName: string;
  insuranceBranchCode: string;
  totalAmount: string;
  month: string;
  persianMonth: string;
  onClick: () => void;
};

export default function InsuranceBoxes({ props }: { props: InsuranceProps }) {
  const {
    totalAmount,
    month,
    persianMonth,
    organizationName,
    insuranceBranchCode,
    onClick,
  } = props;
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const { darkMode } = useDarkMode();

  return (
    <Card
      className="
    cursor-pointer border border-transparent hover:border-primary dark:hover:border-surface-200 max-w-[400px]
    bg-[#EAEFFA] dark:bg-info-900
    shadow-[0px_1px_3px_0px_rgba(8,14,28,0.30)] dark:shadow-[0px_1px_3px_0px_#152446] transition-all"
    >
      <CardHeader className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2 items-center">
          <DocumentFilter color={`${darkMode ? "#DEE1E8" : "#1E3363"}`} />
          <p className="text-md font-semibold text-secondary-1000 dark:text-white">
            {lang === "fa" ? persianMonth : month}
          </p>
        </div>
        <Button
          className="bg-white dark:bg-info-1000 dark:border-surface-200 dark:text-white justify-between text-xs p-1 h-fit border-1 border-primary text-secondary-1000 rounded-[4px] hover:bg-primary-400 hover:text-white"
          endContent={<ArrowRight size={12} />}
          onPress={onClick}
        >
          {t("details")}
        </Button>
      </CardHeader>

      <Divider className="bg-netural-50 dark:bg-secondary-800 w-[calc(100%-24px)] m-auto" />

      <CardBody className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-[400] text-[#353535] text-xs">
            {t("organizationName")}:
          </div>
          <div className="flex items-center gap-2 dark:text-white font-[400] text-xs text-[#353535]">
            <Buildings2 color={darkMode ? "#fff" : "#1E3363"} size={16} />
            {organizationName}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-[400] text-[#353535] text-xs">
            {t("insuranceBranchCode")}:
          </div>
          <div className="flex items-center gap-2 dark:text-white font-[400] text-xs text-[#353535]">
            <TicketDiscount color={darkMode ? "#fff" : "#1E3363"} size={16} />
            {insuranceBranchCode}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-[400] text-[#353535] text-xs">
            {t("amount")}:
          </div>
          <div className="flex items-center gap-2 dark:text-white font-[400] text-xs text-[#353535]">
            <DocumentSquare color={darkMode ? "#fff" : "#1E3363"} size={16} />
            {totalAmount}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-[400] text-[#353535] text-xs">
            {t("total")}:
          </div>
          <div className="flex items-center gap-2 dark:text-white font-[400] text-xs text-[#353535]">
            <DollarSquare color={darkMode ? "#fff" : "#1E3363"} size={16} />
            {totalAmount}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
