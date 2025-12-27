import { Button, useDisclosure } from "@heroui/react";

import Search from "@/components/Search.tsx";
import FilterModal from "@/components/FilterModal.tsx";
import { Index as Icons } from "@/icons/Index.tsx";

export default function PageTabs({ props }: { props: any }) {
  const { data } = props;
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();

  return (
    <div className="flex gap-2 items-center">
      <Search placeholder="Search Sth" />
      <Button
        className="dark:bg-info-1000 border border-primary dark:border-surface-200 px-2 py-5 !rounded-4 w-fit min-w-unset bg-unset min-w-0"
        startContent={<Icons.FilterButton />}
        onPress={onFilterOpen}
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
