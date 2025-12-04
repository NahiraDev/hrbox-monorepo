import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  PropsWithChildren,
} from 'react';
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
import { FormMode } from '@hrbox/uikit/components/types';

interface FormProviderProps<Values extends FormikValues>
  extends Omit<FormikConfig<Values>, 'onSubmit'> {
  formId: string;
  onSubmitAsync?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => Promise<void>;
  onSubmit?: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
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

export const useFormContext = <Values = any>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as FormContextValue<Values>;
};

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

  const cachedForm = useSelector((state: RootState) => state.formCache?.[formId]);

  const isCacheValid = useMemo(() => {
    if (!cachedForm) return false;
    const age = Date.now() - cachedForm.timestamp;
    return age < cacheExpiryMs;
  }, [cachedForm, cacheExpiryMs]);

  const mergedInitialValues = useMemo(() => {
    if (!enableCache || !isCacheValid || !cachedForm) {
      return initialValues;
    }
    return { ...initialValues, ...cachedForm.values };
  }, [enableCache, isCacheValid, cachedForm, initialValues]);

  const formik = useFormik<Values>({
    initialValues: mergedInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      setFormError(null);
      setIsSubmitting(true);
      try {
        if (onSubmitAsync) {
          await onSubmitAsync(values, formikHelpers);
        } else if (onSubmit) {
          onSubmit(values, formikHelpers);
        }

        if (enableCache && clearCacheOnSubmit) {
          dispatch(clearFormCache(formId));
        }
      } catch (error: any) {
        const message = error?.message || 'خطای نامشخص رخ داد';
        setFormError(message);
        // Optionally re-throw if you want calling code to handle it too
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Cache values on change (debounced)
  useEffect(() => {
    if (!enableCache || isInitialMount.current) {
      if (isInitialMount.current) isInitialMount.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(updateFormValues({ formId, values: formik.values }));
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

export function Form({ children, className = '', ...rest }: PropsWithChildren<{ className?: string }>) {
  const { handleSubmit, isSubmitting, formError } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={className}
      {...rest}
    >
      {children}

      {/* Optional: Global form error */}
      {formError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {formError}
        </div>
      )}
    </form>
  );
}