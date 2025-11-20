import {CheckboxGroup, Form} from '@heroui/react';
import * as Yup from 'yup';

import {AppAutoComplete, AppTextArea, AppCheckBox} from '@hrbox/uikit/components';
import {useFormContext} from '@hrbox/core/providers/FormProvider'
import {FormField} from "@hrbox/uikit/components/FormField";
import {useTranslation} from "react-i18next";

export const initialValuesNewOne = {
    title: '',
    type: '',
    processbuilder: '',
    category_process: '',
    textarea: '',
    processModal: '',
};
export const formValidationNewOne = Yup.object().shape({
    title: Yup.string().required(),
    type: Yup.string().required(),
    processbuilder: Yup.string().required(),
    category_process: Yup.string().required(),
    textarea: Yup.string().required(),
    processModal: Yup.string().required(),
});
export const handleSubmitNewOne = (values: any) => {
    return {
        title: values.title,
        type: values.type,
        processbuilder: values.processbuilder,
        category_process: values.category_process,
        textarea: values.textarea,
        processModal: values.processModal,
    };
};
export const NewOneForm = () => {
    const {values, errors, touched, handleSubmit} = useFormContext();
    const {t} = useTranslation()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px] w-full">
                <div className="flex flex-row justify-between">
                    <FormField
                        label='title'
                        name='title'
                        helperText={touched.title && errors.title}
                    />
                    <FormField
                        label='type'
                        name='type'
                        helperText={touched.type && errors.type}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <FormField
                        label='Process_Builder'
                        name='processbuilder'
                        component={AppAutoComplete}
                        helperText={touched.processbuilder && errors.processbuilder}
                    />
                    <FormField
                        label={t('category_process')}
                        name='category_process'
                        error={touched.category_process && errors.category_process}
                    />
                </div>
                <div
                    className=" flex flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
                    <div className="py-[12px] px-[24px] ">
                        <p>{t('is_notification_of_steps_on')}</p>
                    </div>
                    <div className="flex items-center justify-between gap-[8px]">
                        <CheckboxGroup>
                            <FormField
                                name={'processModal'}
                                isSelected={values.is_notification_of_steps_on}
                                children='Notify me'
                                component={AppCheckBox}
                            />
                        </CheckboxGroup>
                    </div>
                </div>
                <div>
                    <FormField
                        label='descriptions'
                        name='textarea'
                        error={touched.textarea && errors.textarea}
                        component={AppTextArea}
                    />
                </div>
            </div>
        </Form>
    );
};
