import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFormik,
  type FormikConfig,
  type FormikHelpers,
  type FormikValues,
  type FormikContextType,
} from 'formik';
import {
  updateFormValues,
  clearFormCache,
} from '@hrbox/core/redux/slices/formCacheSlice';
import type { RootState } from '@hrbox/core/redux';
import { FormMode } from "~/UIKit/components/types";

interface FormProviderProps<Values>
  extends Omit<FormikConfig<Values>, 'onSubmit'> {
  formId: string;
  onSubmitAsync?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => Promise<void>;
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void;
  enableCache?: boolean;
  clearCacheOnSubmit?: boolean;
  cacheExpiryMs?: number;
  children:
    | React.ReactNode
    | ((props: FormContextValue<Values>) => React.ReactNode);
}

export interface FormContextValue<Values> extends FormikContextType<Values> {
  isSubmitting: boolean;
  formError: string | null;
  setFormError: React.Dispatch<React.SetStateAction<string | null>>;
  resetFormState: () => void;
  formId: string;
  clearCache: () => void;
  formMode: FormMode;
  setFormMode: (mode: FormMode) => void;
}

const FormContext = createContext<FormContextValue<any> | null>(null);

export function useFormContext<Values = any>() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context as FormContextValue<Values>;
}

export function FormProvider<Values extends FormikValues>({
                                                            formId,
                                                            initialValues,
                                                            validationSchema,
                                                            onSubmitAsync,
                                                            onSubmit,
                                                            enableCache = true,
                                                            clearCacheOnSubmit = true,
                                                            cacheExpiryMs = 30 * 60 * 1000, // 30 minutes
                                                            children,
                                                          }: FormProviderProps<Values>) {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>(FormMode.CREATE);
  const isInitialMount = useRef(true);

  // دریافت cached values
  const cachedForm = useSelector(
    (state: RootState) => state.formCache?.[formId]
  );

  // بررسی انقضای cache
  const isCacheValid = useMemo(() => {
    if (!cachedForm) return false;
    const age = Date.now() - cachedForm.timestamp;
    return age < cacheExpiryMs;
  }, [cachedForm, cacheExpiryMs]);

  const mergedInitialValues = useMemo(() => {
    if (!enableCache || !isCacheValid) {
      return initialValues;
    }
    return { ...initialValues, ...cachedForm.values };
  }, [enableCache, isCacheValid, cachedForm, initialValues]);

  // Formik setup
  const formik = useFormik<Values>({
    initialValues: mergedInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      setFormError(null);
      setIsSubmitting(true);

      try {
        // اجرای async یا sync submit
        if (onSubmitAsync) {
          await onSubmitAsync(values, formikHelpers);
        } else if (onSubmit) {
          onSubmit(values, formikHelpers);
        }

        // پاک کردن cache بعد از submit موفق
        if (enableCache && clearCacheOnSubmit) {
          dispatch(clearFormCache(formId));
        }
      } catch (error: any) {
        setFormError(error?.message || 'خطای نامشخص رخ داد');
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Cache form values on change
  useEffect(() => {
    if (!enableCache) return;

    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce cache updates
    const timeoutId = setTimeout(() => {
      dispatch(
        updateFormValues({ formId, values: formik.values })
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formik.values, formId, enableCache, dispatch]);

  const resetFormState = () => {
    formik.resetForm();
    setFormError(null);
    setFormMode(FormMode.CREATE);
    if (enableCache) {
      dispatch(clearFormCache(formId));
    }
  };

  const clearCache = () => {
    dispatch(clearFormCache(formId));
  };

  const contextValue: FormContextValue<Values> = {
    ...formik,
    isSubmitting,
    formError,
    setFormError,
    resetFormState,
    formId,
    clearCache,
    formMode,
    setFormMode,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </FormContext.Provider>
  );
}
