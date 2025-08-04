import { Pagination as HeroPagination } from "@heroui/react";

export const AppPagination = ({ props }: { props: any }) => {
  const { size, total } = props;

  return (
    <HeroPagination
      showControls
      classNames={{
        item: "bg-white text-secondary-1000 shadow-md dark:bg-info-1000 dark:text-white hover:dark:bg-transparent !w-[32px] !h-[32px] !rounded-2",
        cursor:
          "bg-secondary-400 text-white dark:bg-surface-200 !w-[32px] !h-[32px] !rounded-2",
        next: "dark:bg-transparent dark:text-white bg-white text-secondary-1000 !w-[32px] !h-[32px] !rounded-2",
        prev: "dark:bg-transparent dark:text-white bg-white text-secondary-1000 !w-[32px] !h-[32px] !rounded-2",
      }}
      dotsJump={3}
      initialPage={1}
      size={size}
      total={total}
    />
  );
};
