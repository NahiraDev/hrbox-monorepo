import { createContext, useContext, useState } from 'react';
import {
  useFormik,
  type FormikConfig,
  type FormikHelpers,
  type FormikValues,
  type FormikContextType,
} from 'formik';

interface FormProviderProps<Values>
  extends Omit<FormikConfig<Values>, 'onSubmit'> {
  onSubmitAsync: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => Promise<void>;
  children:
    | React.ReactNode
    | ((props: FormikContextType<Values>) => React.ReactNode);
}

interface FormContextValue<Values> extends FormikContextType<Values> {
  isSubmitting: boolean;
  formError: string | null;
  setFormError: React.Dispatch<React.SetStateAction<string | null>>;
  resetFormState: () => void;
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
  initialValues,
  validationSchema,
  onSubmitAsync,
  children,
}: FormProviderProps<Values>) {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setFormError(null);
      setIsSubmitting(true);
      try {
        await onSubmitAsync(values, formikHelpers);
      } catch (error: any) {
        setFormError(error?.message || 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const resetFormState = () => {
    formik.resetForm();
    setFormError(null);
  };

  const contextValue: FormContextValue<Values> = {
    ...formik,
    isSubmitting,
    formError,
    setFormError,
    resetFormState,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(formik) : children}
    </FormContext.Provider>
  );
}
