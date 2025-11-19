import {useFormContext} from '@hrbox/core/providers/FormProvider';
import * as Yup from 'yup';
import {Form} from '@heroui/react';
import {FormField} from "@hrbox-monorepo/UIKit/components/FormField";

export const initialValuesEvent = {
    title: null,
};

export const formValidationEvent = Yup.object().shape({
    title: Yup.string().required(),
});

export const handleSubmitEvent = (values: any) => {
    return {
        title: values.title,
    };
};

export const EventForm = () => {
    const {values, errors, touched, handleSubmit} = useFormContext();

    return (
        <Form onSubmit={handleSubmit}>
            <FormField
                label='Title'
                name='title'
                error={touched.title && errors.title}
            />
        </Form>
    );
};

