import {useTranslation} from 'react-i18next';
import {FormProvider} from '@hrbox/core/providers/FormProvider'
import {
    formValidationNewOne,
    handleSubmitNewOne,
    initialValuesNewOne, NewOneForm
} from "@hrbox/modules/process-maker/forms/NewOneForm";

export const NewOneModal = () => {
    const {t} = useTranslation();

    return (
        <FormProvider
            formId="add-now-process"
            initialValues={initialValuesNewOne}
            validationSchema={formValidationNewOne}
            onSubmitAsync={async (values: any) => {
                handleSubmitNewOne(values);
            }}
        >
            <NewOneForm/>
        </FormProvider>
    );
};
