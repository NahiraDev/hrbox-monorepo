import { useTranslation } from "react-i18next";
import { ArrowLeft2, ExportSquare, Setting4, UserOctagon } from "iconsax-react";
import { Button, useDisclosure } from "@heroui/react";

import { useDarkMode } from "@/context/DarkMode.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isEditHistory = routeUrls.home + routeUrls.editHistory;
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
            icon: (
              <UserOctagon
                color={isEditHistory ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("employeeIROrganization"),
            isActive: isEditHistory,
            path:
              routeUrls.home +
              "/" +
              routeUrls.salaryCalculations +
              "/" +
              routeUrls.editHistory,
          }}
        />
      </div>
      <div className="flex gap-3">
        <Button
          className="text-success-700 dark:text-white dark:bg-info-1000 border border-success-700 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          startContent={<ExportSquare />}
        >
          {t("exportToExcel")}
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
