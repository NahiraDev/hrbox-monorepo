import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFormik,
  type FormikConfig,
  type FormikHelpers,
  type FormikValues,
  type FormikContextType,
} from 'formik';
import { updateFormField, updateFormValues, clearFormCache } from '@core/redux/reducers/formCache';
import type { RootState } from '@core/redux';

interface FormProviderProps<Values>
  extends Omit<FormikConfig<Values>, 'onSubmit'> {
  formId: string; // Unique identifier for the form
  onSubmitAsync: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => Promise<void>;
  enableCache?: boolean; // Enable/disable caching
  clearCacheOnSubmit?: boolean; // Clear cache after successful submit
  children:
    | React.ReactNode
    | ((props: FormikContextType<Values>) => React.ReactNode);
}

interface FormContextValue<Values> extends FormikContextType<Values> {
  isSubmitting: boolean;
  formError: string | null;
  setFormError: React.Dispatch<React.SetStateAction<string | null>>;
  resetFormState: () => void;
  formId: string;
  clearCache: () => void;
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
                                                            enableCache = true,
                                                            clearCacheOnSubmit = true,
                                                            children,
                                                          }: FormProviderProps<Values>) {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInitialMount = useRef(true);

  // Get cached values from Redux
  const cachedForm = useSelector(
    (state: RootState) => state.formCache?.[formId]
  );

  // Merge cached values with initial values
  const mergedInitialValues = enableCache && cachedForm
    ? { ...initialValues, ...cachedForm.values }
    : initialValues;

  const formik = useFormik<Values>({
    initialValues: mergedInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      setFormError(null);
      setIsSubmitting(true);
      try {
        await onSubmitAsync(values, formikHelpers);

        // Clear cache on successful submit
        if (enableCache && clearCacheOnSubmit) {
          dispatch(clearFormCache(formId));
        }
      } catch (error: any) {
        setFormError(error?.message || 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Cache form values on change
  useEffect(() => {
    if (!enableCache) return;

    // Skip initial mount to avoid overwriting cache
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce cache updates
    const timeoutId = setTimeout(() => {
      dispatch(updateFormValues({ formId, values: formik.values }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formik.values, formId, enableCache, dispatch]);

  const resetFormState = () => {
    formik.resetForm();
    setFormError(null);
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
  };

  return (
    <FormContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(formik) : children}
    </FormContext.Provider>
  );
}
