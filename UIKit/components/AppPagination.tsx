import type { PaginatedResponse } from '@hrbox/core/api/types';
import { Pagination as HeroPagination } from '@heroui/react';

interface PaginationProps {
  meta: PaginatedResponse<any>['meta'];
  onPageChange: (page: number) => void;
}

export function AppPagination({ meta, onPageChange }: PaginationProps) {
  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center py-4">
      <HeroPagination
        total={meta.totalPages}
        page={meta.page}
        onChange={onPageChange}
        showControls
        color="primary"
        size="lg"
        classNames={{
          cursor: 'bg-primary text-white font-semibold',
          item: 'bg-white hover:bg-gray-100 transition-colors',
        }}
      />
    </div>
  );
}
