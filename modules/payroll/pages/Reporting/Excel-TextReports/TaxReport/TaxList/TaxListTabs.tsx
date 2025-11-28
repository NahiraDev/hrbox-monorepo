import { useTranslation } from "react-i18next";
import {
  ArrowLeft2,
  DocumentFilter,
  ExportSquare,
  Setting4,
} from "iconsax-react";
import { Button, useDisclosure } from "@heroui/react";

import Search from "@/components/Search.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import FilterModal from "@/components/FilterModal.tsx";

export default function TaxListTabs({ props }: { props: any }) {
  const { t } = useTranslation();

  const goBack = () => {
    history.back();
  };
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const { data } = props;

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center flex-2">
        <Button className="bg-unset w-fit min-w-0 p-0" onPress={goBack}>
          <ArrowLeft2 />
        </Button>
        <PageHeaderTab
          props={{
            icon: <DocumentFilter color="#fff" />,
            title: t("taxList"),
            isActive: true,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.excelTextReports +
              "/" +
              routeUrls.taxReports +
              "/" +
              routeUrls.taxList,
          }}
        />
      </div>
      <div className="flex gap-2 items-center flex-1 justify-end">
        <Button
          className="text-tertiar-400 dark:text-white dark:bg-info-1000 border border-tertiar-400 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          startContent={<ExportSquare />}
        >
          {t("exportToExcel")}
        </Button>
        <Button
          className="text-success-700 dark:text-white dark:bg-info-1000 border border-success-700 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          startContent={<ExportSquare />}
        >
          {t("exportToText")}
        </Button>
        <Search placeholder="Search Sth" />
        <Button
          className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          startContent={<Setting4 />}
          onPress={onFilterOpen}
        />
        <FilterModal
          props={{
            data: {
              nameList: data.DUMMY_NAMELIST,
              sortOptions: data.DUMMY_SORTS,
              EmployeeName: data.DUMMY_EMPLOYEES,
            },
            isOpen: isFilterOpen,
            onOpenChange: onFilterOpenChange,
          }}
        />
      </div>
    </div>
  );
}
