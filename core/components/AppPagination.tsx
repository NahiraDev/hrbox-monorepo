import { useState, useEffect, useCallback } from 'react';
import { Pagination as HeroPagination } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { serviceRegistry } from 'core/helpers';

const AppPagination = ({ total }: { total: number }) => {
  const getModuleName: string | undefined = serviceRegistry.getModuleName();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get('');

    return pageParam ? parseInt(pageParam, 10) : 1;
  });
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        newParams.set(page.toString(''));

        return newParams;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    const pageParam = searchParams.get("");

    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }
    }
  }, [searchParams, currentPage]);

  return (
    <HeroPagination
      classNames={{
        item: 'bg-white rounded-md shadow-tight-light-1 focus:outline-none cursor-pointer',
        cursor: 'rounded-md',
        next: 'bg-white rounded-md cursor-pointer',
        prev: 'bg-white rounded-md cursor-pointer',
      }}
      color={getModuleName === 'hrlink' ? 'secondary' : 'primary'}
      dotsJump={1}
      initialPage={total}
      page={currentPage}
      showControls={true}
      size="md"
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default AppPagination;
