import { useTranslation } from "react-i18next";
import {
  ArrowLeft2,
  ArrowUp2,
  Building,
  SecurityCard,
  Setting4,
} from "iconsax-react";
import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";

import { useDarkMode } from "@/context/DarkMode.tsx";
import Search from "@/components/Search.tsx";
import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import FilterModal from "@/components/FilterModal.tsx";

export default function SalaryListTabs({ props }: { props: any }) {
  const { data } = props;
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isSalaryList = routeUrls.home + routeUrls.salaryList;
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();
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
                color={isSalaryList ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("salaryList"),
            isActive: isSalaryList,
            path: routeUrls.home + "/" + routeUrls.salaryList,
          }}
        />
      </div>
      <div className="flex gap-2 items-center flex-1 justify-end">
        <Select
          className="max-w-xs"
          classNames={{
            base: "shadow-lg rounded-4",
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
      </div>
    </div>
  );
}
