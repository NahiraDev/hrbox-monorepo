import { useTranslation } from "react-i18next";
import { ArrowLeft2 } from "iconsax-reactjs";
import { Button, useDisclosure } from "@heroui/react";

import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";
import Search from "@/components/Search.tsx";
import ModalIndividualOrder from "@/pages/JudgmentIssued/ModalIndividualOrder.tsx";
import { Index as Icons } from "@/icons/Index.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { routeUrls } from "@/routes";
import ModalGroupOrder from "@/pages/JudgmentIssued/ModalGroupOrder.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { data } = props;
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isIndividualOrderPage = location.pathname.endsWith(
    routeUrls.individualOrder,
  );
  const isGroupOrderPage = location.pathname.endsWith(routeUrls.groupOrder);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();

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
            icon: (
              <Icons.Candle
                color={
                  isIndividualOrderPage ? "#fff" : darkMode ? "#fff" : "#04070E"
                }
              />
            ),
            title: t("individualOrder"),
            isActive: isIndividualOrderPage,
            path:
              routeUrls.home +
              "/" +
              routeUrls.judgmentIssued +
              "/" +
              routeUrls.individualOrder,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <Icons.Candle
                color={
                  isGroupOrderPage ? "#fff" : darkMode ? "#fff" : "#04070E"
                }
              />
            ),
            title: t("groupOrder"),
            isActive: isGroupOrderPage,
            path:
              routeUrls.home +
              "/" +
              routeUrls.judgmentIssued +
              "/" +
              routeUrls.groupOrder,
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
        {isIndividualOrderPage ? (
          <ModalIndividualOrder
            isEditMode={false}
            isOpen={isOpen}
            isShowMode={false}
            onOpenChange={onOpenChange}
          />
        ) : (
          <ModalGroupOrder
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
