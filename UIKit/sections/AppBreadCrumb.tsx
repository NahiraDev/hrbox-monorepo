import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import {ArrowRight2, ElementEqual} from "iconsax-reactjs";

interface AppBreadcrumbProps {
  pages: string[];
}

export const AppBreadcrumb = ({ pages }: AppBreadcrumbProps) => {
  const lang = useAppSelector((state) => state.language.lang);
  const isRTL = lang === 'fa';

  const formatPage = (page: string) => {
    return page
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav aria-label="breadcrumb" className="flex gap-2 items-center">
        <ElementEqual size={20} className="text-neutral-400"/>
        <Breadcrumbs
        separator={<ArrowRight2 size="16" className="text-neutral-400" />}
        maxItems={isRTL ? 3 : 5}
        classNames={{
          list: 'gap-1',
        }}
      >
        {pages.map((page, index) => {
          const isActive = index === pages.length - 1;
          const formattedPage = formatPage(page);

          return (
            <BreadcrumbItem
              key={`${page}-${index}`}
              isCurrent={isActive}
              classNames={{
                item: `
                  text-sm font-medium transition-colors
                  ${
                  isActive
                    ? 'text-panel-primary dark:text-primary-300 cursor-default'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }
                `,
                separator: 'text-neutral-400 dark:text-neutral-600 mx-1',
              }}
            >
              {formattedPage}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};
