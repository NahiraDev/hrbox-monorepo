import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import { ArrowRight, NoteText, SecurityCard } from "iconsax-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store.ts";
import { useDarkMode } from "@/context/DarkMode.tsx";

type PaySlipListBoxesProps = {
  totalAmount: string;
  creationDate: string;
  persianCreationDate: string;
  month: string;
  persianMonth: string;
  onClick: () => void;
};

export default function PaySlipListBoxes({
  props,
}: {
  props: PaySlipListBoxesProps;
}) {
  const {
    totalAmount,
    creationDate,
    persianCreationDate,
    month,
    persianMonth,
    onClick,
  } = props;
  const { t } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const { darkMode } = useDarkMode();

  return (
    <Card
      className="
    cursor-pointer border border-transparent max-w-[400px]
    bg-white dark:bg-info-1000
    shadow-[0px_1px_3px_0px_rgba(8,14,28,0.30)] dark:shadow-[0px_1px_3px_0px_#152446]
    hover:bg-gradient-to-r hover:from-[rgba(220,240,249,0.4)] hover:to-[rgba(220,240,249,0.4)]
    hover:dark:bg-gradient-to-r hover:dark:from-[rgba(4,66,92,0.6)] hover:dark:to-[rgba(4,66,92,0.6)]
    transition-all "
      isPressable={!!onClick}
      onPress={onClick}
    >
      <CardHeader className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2 items-center">
          <SecurityCard color={`${darkMode ? "#DEE1E8" : "#1E3363"}`} />
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

      <Divider className="bg-netural-100 dark:bg-netural-700 w-[calc(100%-24px)] m-auto" />

      <CardBody className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("creationDate")}:
          </div>
          <div className="flex items-center gap-2 dark:text-white font-[400] text-[#353535]">
            <NoteText size={16} />
            {lang === "fa" ? persianCreationDate : creationDate}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="dark:text-white font-bold text-[#353535] text-sm">
            {t("total")}:
          </div>
          <div className="dark:text-white font-[400] text-[#353535]">
            {totalAmount} {lang === "fa" ? "ریال" : "Rial"}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
