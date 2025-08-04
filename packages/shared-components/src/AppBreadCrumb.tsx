import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export const AppBreadcrumb = ({ pages }: { pages: string[] }) => {
  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Breadcrumbs>
        {pages.map((page: string, index: number) => {
          page = page.split("-")?.join(" ");

          return (
            <BreadcrumbItem
              key={index}
              classNames={{
                item: `${
                  index === pages.length - 1
                    ? "text-secondary-400 dark:text-gold"
                    : "text-neutral-400 dark:text-white"
                }`,
                separator: "text-netural-400 dark:text-netural-600",
              }}
            >
              {page}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
