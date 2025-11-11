import { useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { useNavigation } from "@hrbox/core/hooks/useNavigation";

export function usePagination(defaultPageSize = 10) {
  const navigate = useNavigation();
  const search = useSearch({ from: '__root__' }) as any;

  const page = useMemo(() => search?.page || 1, [search]);
  const pageSize = useMemo(() => search?.pageSize || defaultPageSize, [search, defaultPageSize]);
  const searchQuery = useMemo(() => search?.search || '', [search]);

  const setPage = useCallback(
    (newPage: number) => {
      navigate.push({
        // @ts-expect-error temporarily ignore type
        search: (prev) => ({ ...prev, page: newPage }),
      });
    },
    [navigate]
  );

  const setPageSize = useCallback(
    (newSize: number) => {
      navigate.push({
        // @ts-expect-error temporarily ignore type
        search: (prev: any) => ({ ...prev, page: 1, pageSize: newSize }),
      });
    },
    [navigate]
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      navigate.push({
        // @ts-expect-error temporarily ignore type
        search: (prev: any) => ({
          ...prev,
          page: 1,
          search: newSearch || undefined,
        }),
      });
    },
    [navigate]
  );

  return {
    page,
    pageSize,
    search: searchQuery,
    setPage,
    setPageSize,
    setSearch,
    params: { page, pageSize, search: searchQuery || undefined },
  };
}