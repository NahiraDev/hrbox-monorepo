import { useSearchParams } from 'react-router-dom';

interface UsePaginationQueryProps {
  pageKey?: string;
  sizeKey?: string;
  defaultSize?: number;
}

export const usePaginationQuery = ({
  pageKey = 'Page',
  sizeKey = 'PageSize',
  defaultSize = 10,
}: UsePaginationQueryProps = {}) => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get(pageKey) || '1', 10);
  const pageSize = parseInt(
    searchParams.get(sizeKey) || defaultSize.toString(),
    10,
  );

  return {
    [pageKey]: page,
    [sizeKey]: pageSize,
  };
};
