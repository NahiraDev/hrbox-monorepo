import {CheckboxGroup, Form} from '@heroui/react';
import * as Yup from 'yup';

import {AppAutoComplete, AppInput, AppTextArea, AppCheckBox} from '@hrbox/uikit/components';
import {useFormContext} from '@hrbox/core/providers/FormProvider';
import {FormField} from "@hrbox-monorepo/UIKit/components/FormField";
import {useTranslation} from "react-i18next";

export const initialValuesProcess = {
    title: null,
    related_forms: null,
    Action_Type: null,
    workflowImplementation: null,
    cartableStartType: null,
    textarea: null,
};
export const formValidationProcess = Yup.object().shape({
    title: Yup.string().required(),
    related_forms: Yup.string().required(),
    Action_Type: Yup.string().required(),
    workflowImplementation: Yup.string().required(),
    cartableStartType: Yup.string().required(),
    textarea: Yup.string().required(),
});
export const handleSubmitProcess = (values: any) => {
    return {
        title: values.title,
        related_forms: values.related_forms,
        Action_Type: values.Action_Type,
        workflowImplementation: values.workflowImplementation,
        cartableStartType: values.cartableStartType,
        textarea: values.textarea,
    };
};

export const ProcessForm = () => {
    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormContext();
    const {t} = useTranslation()

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px]">
                <div className="flex-row flex">
                    <FormField
                        label='title'
                        name='title'
                        helperText={touched.title && errors.title}
                    />
                    <FormField
                        label='type'
                        name='type'
                        component={AppAutoComplete}
                        helperText={touched.type && errors.type}
                    />
                </div>
                <div className="flex flex-row">
                    <FormField
                        label={t('action_type')}
                        name='Action_Type'
                        component={AppAutoComplete}
                        helperText={touched.Action_Type && errors.Action_Type}
                    />
                    <FormField
                        label={t('implementation_of_workflow')}
                        name='workflowImplementation'
                        helperText={touched.workflowImplementation && errors.workflowImplementation}
                    />
                </div>
                <div>
                    <FormField
                        label={t('cartable_start_type')}
                        name='cartableStartType'
                        helperText={touched.cartableStartType && errors.cartableStartType}
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
                                name="is_notification_of_steps_on"
                                component={AppCheckBox}
                                children={
                                    <>
                                        <option>0</option>
                                    </>
                                }
                            />
                        </CheckboxGroup>
                    </div>
                </div>
                <div>
                    <FormField
                        label='descriptions'
                        name='textarea'
                        component={AppTextArea}
                        error={touched.textarea && errors.textarea}
                    />
                </div>
            </div>
        </Form>
    );
};
