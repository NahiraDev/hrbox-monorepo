import { type FormikConfig, type FormikHelpers, type FormikValues, type FormikContextType } from 'formik';
interface FormProviderProps<Values> extends Omit<FormikConfig<Values>, 'onSubmit'> {
    onSubmitAsync: (values: Values, formikHelpers: FormikHelpers<Values>) => Promise<void>;
    children: React.ReactNode | ((props: FormikContextType<Values>) => React.ReactNode);
}
interface FormContextValue<Values> extends FormikContextType<Values> {
    isSubmitting: boolean;
    formError: string | null;
    setFormError: React.Dispatch<React.SetStateAction<string | null>>;
    resetFormState: () => void;
}
export declare function useFormContext<Values = any>(): FormContextValue<Values>;
export declare function FormProvider<Values extends FormikValues>({ initialValues, validationSchema, onSubmitAsync, children, }: FormProviderProps<Values>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormProvider.d.ts.map