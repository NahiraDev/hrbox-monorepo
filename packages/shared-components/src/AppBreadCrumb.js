import { jsx as _jsx } from "react/jsx-runtime";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
export const AppBreadcrumb = ({ pages }) => {
    return (_jsx("div", { className: "flex flex-col flex-wrap gap-4", children: _jsx(Breadcrumbs, { children: pages.map((page, index) => {
                page = page.split("-")?.join(" ");
                return (_jsx(BreadcrumbItem, { classNames: {
                        item: `${index === pages.length - 1
                            ? "text-secondary-400 dark:text-gold"
                            : "text-neutral-400 dark:text-white"}`,
                        separator: "text-netural-400 dark:text-netural-600",
                    }, children: page }, index));
            }) }) }));
};
