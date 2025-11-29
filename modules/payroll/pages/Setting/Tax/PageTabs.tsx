import { Button, useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { ArrowLeft2, ReceiptDiscount, TicketDiscount } from "iconsax-react";

import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { Index as Icons } from "@/icons/Index.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import ModalTaxTable from "@/pages/Setting/Tax/ModalTaxTable.tsx";
import ModalTaxOffice from "@/pages/Setting/Tax/ModalTaxOffice.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { data } = props;
  const { t } = useTranslation();
  const isTaxTable = location.pathname.endsWith(routeUrls.taxTable);
  const isTaxOffice = location.pathname.endsWith(routeUrls.taxOffice);
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const goBack = () => {
    history.back();
  };

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center">
        <Button className="bg-unset w-fit min-w-0 p-0" onPress={goBack}>
          <ArrowLeft2 />
        </Button>
        <PageHeaderTab
          props={{
            icon: <TicketDiscount />,
            title: t("taxTable"),
            isActive: isTaxTable,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.taxes +
              "/" +
              routeUrls.taxTable,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <ReceiptDiscount />,
            title: t("taxOffice"),
            isActive: isTaxOffice,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.taxes +
              "/" +
              routeUrls.taxOffice,
          }}
        />
      </div>
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
        {isTaxTable ? (
          <ModalTaxTable
            isEditMode={false}
            isOpen={isOpen}
            isShowMode={false}
            onOpenChange={onOpenChange}
          />
        ) : (
          <ModalTaxOffice
            isEditMode={false}
            isOpen={isOpen}
            isShowMode={false}
            onOpenChange={onOpenChange}
          />
        )}
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
    </div>
  );
}
