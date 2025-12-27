import { useTranslation } from "react-i18next";
import { ArrowLeft2, ArrowRight2, SecurityCard } from "iconsax-react";
import { Button } from "@heroui/react";

import { useDarkMode } from "@/context/DarkMode.tsx";
import Search from "@/components/Search.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";

export default function PaySlipTabs() {
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isPaySlip = routeUrls.home + routeUrls.paySlipList;
  const goBack = () => {
    history.back();
  };

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center flex-2">
        <Button className="bg-unset w-fit min-w-0 p-0" onPress={goBack}>
          <ArrowLeft2 />
        </Button>
        <PageHeaderTab
          props={{
            icon: (
              <SecurityCard
                color={isPaySlip ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("calculationDetails"),
            isActive: isPaySlip,
            path: routeUrls.home + "/" + routeUrls.paySlipList,
          }}
        />
      </div>
      <div className="flex gap-2 items-center flex-1 justify-end">
        <Button
          className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 bg-unset min-w-[42px]"
          startContent={<ArrowLeft2 />}
        />
        <div className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-2 !rounded-4 text-secondary-1000 dark:text-white">
          <span>This Year (2025)</span>
        </div>
        <Button
          className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 bg-unset min-w-[42px]"
          startContent={<ArrowRight2 />}
        />
        <Search placeholder="Search Sth" />
      </div>
    </div>
  );
}
