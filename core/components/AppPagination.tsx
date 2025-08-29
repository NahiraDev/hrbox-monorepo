import { useState, useEffect, useCallback } from 'react';
import { Pagination as HeroPagination } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';

interface AppPaginationProps {
  props: {
    size?: 'sm' | 'md' | 'lg';
    total: number;
    initialPage?: number;
    showControls?: boolean;
    dotsJump?: number;
    queryKey?: string;
  };
}

const AppPagination = ({ props }: AppPaginationProps) => {
  const {
    size = 'md',
    total,
    initialPage = 1,
    showControls = true,
    dotsJump = 3,
    queryKey = 'page',
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get(queryKey);

    return pageParam ? parseInt(pageParam, 10) : initialPage;
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        newParams.set(queryKey, page.toString());

        return newParams;
      });
    },
    [queryKey, setSearchParams],
  );

  useEffect(() => {
    const pageParam = searchParams.get(queryKey);

    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [searchParams, queryKey, currentPage]);

  return (
    <HeroPagination
      classNames={{
        item: 'bg-white text-secondary-1000 shadow-md dark:bg-info-1000 hover:dark:bg-transparent',
        cursor: 'bg-secondary-400 text-white',
        next: 'dark:bg-transparent bg-white text-secondary-1000',
        prev: 'dark:text-white bg-white text-secondary-1000',
      }}
      dotsJump={dotsJump}
      initialPage={initialPage}
      page={currentPage}
      radius="sm"
      showControls={showControls}
      size={size}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default AppPagination;
