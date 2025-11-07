import { useState, useEffect, useCallback, useRef } from 'react';
import { Pagination as HeroPagination } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { serviceRegistry } from '@hrbox/core/helpers';

export const AppPagination = ({ total }: { total: number }) => {
  const getModuleName: string | undefined = serviceRegistry.getModuleName();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handlePageChange = useCallback(
    (page: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', page.toString());

      setCurrentPage(page);
      setSearchParams(newParams, { replace: true }); // ✅ replace = بدون history push
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="transition-all duration-150">
      <HeroPagination
        classNames={{
          item: 'bg-white rounded-md shadow-tight-light-1 focus:outline-none cursor-pointer mt-5 transition-all duration-200 ease-in-out hover:scale-105',
          cursor: 'bg-primary text-white rounded-md mt-5 font-semibold transition-colors duration-200 ease-in-out',
          next: 'bg-white rounded-md cursor-pointer mt-5 transition-all duration-150 hover:scale-105 hover:bg-gray-50',
          prev: 'bg-white rounded-md cursor-pointer mt-5 transition-all duration-150 hover:scale-105 hover:bg-gray-50',
        }}
        color={getModuleName === 'hrlink' ? 'secondary' : 'primary'}
        dotsJump={1}
        initialPage={1}
        page={currentPage}
        showControls={true}
        size="md"
        total={total}
        onChange={handlePageChange}
      />
    </div>
  );
};
