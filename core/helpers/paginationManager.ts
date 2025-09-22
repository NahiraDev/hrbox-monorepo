import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationManagerProps {
  total: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export const usePaginationManager = ({ total, onPageChange }: PaginationManagerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get('Page');

    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  const [pageSize, setPageSize] = useState<number>(() => {
    const sizeParam = searchParams.get('PageSize');

    return sizeParam ? parseInt(sizeParam, 10) : 10;
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set('Page', page.toString());
      newParams.set('PageSize', pageSize.toString());

      return newParams;
    });
    onPageChange?.(page, pageSize);
  };

  const setPageSizeAndGoToFirst = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set('Page', '1');
      newParams.set('PageSize', newPageSize.toString());

      return newParams;
    });
    onPageChange?.(1, newPageSize);
  };

  useEffect(() => {
    const pageParam = searchParams.get('Page');
    const sizeParam = searchParams.get('PageSize');

    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    }

    if (sizeParam) {
      const size = parseInt(sizeParam, 10);

      if (!isNaN(size) && size !== pageSize) {
        setPageSize(size);
      }
    }
  }, [searchParams, currentPage, pageSize]);

  return {
    currentPage,
    pageSize,
    total,
    goToPage,
    setPageSizeAndGoToFirst,
    hasNextPage: currentPage < total,
    hasPrevPage: currentPage > 1,
  };
};
