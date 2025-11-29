import { useTranslation } from "react-i18next";
import {
  ArrowLeft2,
  ArrowUp2,
  Building,
  FilterEdit,
  Setting4,
} from "iconsax-react";
import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { useDarkMode } from "@/context/DarkMode.tsx";
import { Index as Icons } from "@/icons/Index.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import SalaryProcessingModal from "@/pages/SalaryCalculations/SalaryProcessingModal.tsx";
import RevertModal from "@/pages/SalaryCalculations/RevertModal.tsx";

export default function SalaryDetailTabs({ props }: { props: any }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isSalaryCalculations = routeUrls.home + routeUrls.salaryCalculations;
  const goBack = () => {
    history.back();
  };
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
  const {
    isOpen: isSalaryProcessingOpen,
    onOpen: onSalaryProcessingOpen,
    onOpenChange: onSalaryProcessingOpenChange,
  } = useDisclosure();
  const {
    isOpen: isRevertOpen,
    onOpen: onRevertOpen,
    onOpenChange: onRevertOpenChange,
  } = useDisclosure();
  const { data } = props;
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  const DUMMY_DATA = {
    totalAmount: 22000000,
    totalPersonel: 50,
  };

  function navigateToEditHistory() {
    navigate(
      routeUrls.home +
        "/" +
        routeUrls.salaryCalculations +
        "/" +
        routeUrls.editHistory,
    );
  }

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center flex-2">
        <Button className="bg-unset w-fit min-w-0 p-0" onPress={goBack}>
          <ArrowLeft2 />
        </Button>
        <PageHeaderTab
          props={{
            icon: (
              <Icons.Card
                color={
                  isSalaryCalculations ? "#fff" : darkMode ? "#fff" : "#04070E"
                }
              />
            ),
            title: t("salaryCalculations"),
            isActive: isSalaryCalculations,
            path: routeUrls.home + "/" + routeUrls.salaryCalculations,
          }}
        />
      </div>
      <div className="flex gap-3">
        <Button
          className="min-w-max dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          onPress={onSalaryProcessingOpen}
        >
          {t("salaryProcessing")}
        </Button>
        <Button
          className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          onPress={onRevertOpen}
        >
          {t("revert")}
        </Button>
        <Select
          classNames={{
            base: "shadow-lg rounded-4 min-w-max w-full",
            trigger:
              "bg-white dark:bg-info-1000 border-1 border-primary-400 dark:border-surface-200",
            value: "text-secondary-400 dark:text-secondary-0",
            listbox: "bg-white dark:bg-info-1000",
            popoverContent:
              "data-[open=true]:!shadow-lg data-[open=true]:dark:!shadow-[0px_10px_30px_0px_(#152446)]",
          }}
          placeholder={t("organization")}
          radius="sm"
          scrollShadowProps={{
            isEnabled: false,
          }}
          selectorIcon={
            <ArrowUp2 fill={`${darkMode ? "#ffffff" : "#292D32"}`} />
          }
          startContent={<Building />}
        >
          {animals.map((animal) => (
            <SelectItem
              key={animal.key}
              className="hover:!bg-main-light
              data-[hover=true]:!bg-main-light
               data-[focus=true]:!bg-main-light
                data-[focus=true]:!outline-none
                  focus:!bg-main-light

              dark:data-[hover=true]:!bg-[rgba(4,66,92,0.60)]
               dark:data-[focus=true]:!bg-[rgba(4,66,92,0.60)]
                dark:data-[focus=true]:![rgba(4,66,92,0.60)]
                 dark:hover:!bg-[rgba(4,66,92,0.60)]
                  dark:focus:!bg-[rgba(4,66,92,0.60)]

                   cursor-pointer
                    p-2 rounded-4
                    !outline-none
                    text-foreground dark:text-white"
              startContent={<Building fill="text-foreground" />}
            >
              {animal.label}
            </SelectItem>
          ))}
        </Select>
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

        <Button
          className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-fit"
          startContent={<FilterEdit />}
          onPress={navigateToEditHistory}
        >
          {t("editHistory")}
        </Button>
      </div>
      <SalaryProcessingModal
        props={{
          isOpen: isSalaryProcessingOpen,
          onOpen: onSalaryProcessingOpen,
          onOpenChange: onSalaryProcessingOpenChange,
          totalAmount: DUMMY_DATA.totalAmount,
          totalPersonel: DUMMY_DATA.totalPersonel,
        }}
      />
      <RevertModal
        props={{
          isOpen: isRevertOpen,
          onOpen: onRevertOpen,
          onOpenChange: onRevertOpenChange,
          totalAmount: DUMMY_DATA.totalAmount,
          totalPersonel: DUMMY_DATA.totalPersonel,
        }}
      />
    </div>
  );
}
