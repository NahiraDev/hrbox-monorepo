import { Button, useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";

import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { Index as Icons } from "@/icons/Index.tsx";
import ModalCostCenter from "@/pages/Setting/CostCenter/ModalCostCenter.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { data } = props;
  const { t } = useTranslation();

  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex gap-2 items-center">
      <Search placeholder="Search Sth" />
      <Button
        className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-0"
        startContent={<Icons.FilterButton />}
        onPress={onFilterOpen}
      />
      <Button
        className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-0"
        startContent={<Icons.Plus />}
        onPress={onOpen}
      >
        {t("addNewOne")}
      </Button>

      <ModalCostCenter
        isEditMode={false}
        isOpen={isOpen}
        isShowMode={false}
        onOpenChange={onOpenChange}
      />

      <FilterModal
        props={{
          data: {
            nameList: data.nameList,
            sortOptions: data.sortOptions,
            EmployeeName: data.EmployeeName,
          },
          isOpen: isFilterOpen,
          onOpenChange: onFilterOpenChange,
        }}
      />
    </div>
  );
}
