import { useTranslation } from "react-i18next";
import { DocumentFilter } from "iconsax-react";

import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import { useDarkMode } from "@/context/DarkMode.tsx";

export default function IndexPageTabs() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center">
        <PageHeaderTab
          props={{
            icon: <DocumentFilter color={darkMode ? "#fff" : "#04070E"} />,
            title: t("legalReports"),
            isActive: false,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <DocumentFilter color={darkMode ? "#fff" : "#04070E"} />,
            title: t("excelTextReports"),
            isActive: false,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.excelTextReports,
          }}
        />
      </div>
    </div>
  );
}
