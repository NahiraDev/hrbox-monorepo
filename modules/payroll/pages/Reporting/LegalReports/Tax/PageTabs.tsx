import { ExportSquare, Setting4 } from "iconsax-react";
import { Button, useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";

import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { Plus } from "@/icons/Plus.tsx";
import ModalDeductions from "@/pages/Reporting/LegalReports/Tax/ModalDeductions.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { t } = useTranslation();
  const { data } = props;
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
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
      <Button
        className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
        startContent={<Plus />}
        onPress={onOpen}
      >
        {t("creatReport")}
      </Button>
      <ModalDeductions isOpen={isOpen} onOpenChange={onOpenChange} />
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
  );
}
