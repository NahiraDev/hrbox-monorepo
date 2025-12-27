import { Button, useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { ArrowLeft2, Setting5 } from "iconsax-react";

import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { Index as Icons } from "@/icons/Index.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import ModalLegalParameters from "@/pages/Setting/Parameters/ModalLegalParameters.tsx";
import ModalProprietaryParameters from "@/pages/Setting/Parameters/ModalProprietaryParameters.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { data } = props;
  const { t } = useTranslation();
  const isLegalParameters = location.pathname.endsWith(
    routeUrls.legalParameters,
  );
  const isProprietaryParameters = location.pathname.endsWith(
    routeUrls.proprietaryParameters,
  );
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
            icon: <Setting5 />,
            title: t("legalParameters"),
            isActive: isLegalParameters,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.parameters +
              "/" +
              routeUrls.legalParameters,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Setting5 />,
            title: t("proprietaryParameters"),
            isActive: isProprietaryParameters,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.parameters +
              "/" +
              routeUrls.proprietaryParameters,
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
        {isLegalParameters ? (
          <ModalLegalParameters
            isEditMode={false}
            isOpen={isOpen}
            isShowMode={false}
            onOpenChange={onOpenChange}
          />
        ) : (
          <ModalProprietaryParameters
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
