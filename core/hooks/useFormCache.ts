import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { RootState } from '@core/redux';
import {
  updateFormField,
  updateFormValues,
  clearFormCache,
  clearAllFormCaches,
  clearExpiredCaches,
} from '@core/redux/reducers/formCache';

export const useFormCache = (formId?: string) => {
  const dispatch = useDispatch();
  const allCaches = useSelector((state: RootState) => state.formCache);
  const specificCache = formId ? allCaches[formId] : null;

  const updateField = useCallback(
    (fieldName: string, value: any) => {
      if (!formId) return;
      dispatch(updateFormField({ formId, fieldName, value }));
    },
    [dispatch, formId]
  );

  const updateValues = useCallback(
    (values: Record<string, any>) => {
      if (!formId) return;
      dispatch(updateFormValues({ formId, values }));
    },
    [dispatch, formId]
  );

  const clearCache = useCallback(() => {
    if (!formId) return;
    dispatch(clearFormCache(formId));
  }, [dispatch, formId]);

  const clearAll = useCallback(() => {
    dispatch(clearAllFormCaches());
  }, [dispatch]);

  const clearExpired = useCallback(
    (expiryTime: number = 24 * 60 * 60 * 1000) => {
      dispatch(clearExpiredCaches(expiryTime));
    },
    [dispatch]
  );

  return {
    cache: specificCache,
    allCaches,
    updateField,
    updateValues,
    clearCache,
    clearAll,
    clearExpired,
  };
};
