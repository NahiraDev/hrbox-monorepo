import {Form} from "@heroui/react";
import {Link21} from "iconsax-reactjs";
import {AppDatePicker, AppInput, AppTextArea} from "@hrbox/uikit/components";
import {useFormContext} from "@hrbox/core/providers/FormProvider";
import * as Yup from "yup";
import {FormField} from "@hrbox-monorepo/UIKit/components/FormField";

export const initialValuesAward = {
    Title: null,
    Date: null,
    Description: "",
    FileId: null,
};

export const formValidationAward = Yup.object().shape({
    Title: Yup.string().required(),
    Date: Yup.string().required(),
    Description: Yup.string().required(),
    FileId: Yup.string().required(),
});

export const handleSubmitAward = (values: any) => {
    return {
        Title: values.Title,
        Date: values.Date,
        Description: values.Description,
        FileId: values.FileId,
    };
};

export const AwardForm = () => {
    const {values, errors, touched, handleChange, handleBlur, handleSubmit} =
        useFormContext();

    return (
        <Form
            className="w-full flex flex-col gap-6"
            id="create-award-form"
            onSubmit={handleSubmit}
        >
            <div className="flex gap-[52px] w-full">
                <div className="flex flex-col gap-1 w-1/2">
                    <FormField
                        label="Title"
                        name="Name"
                        error={touched.Name && errors.Name}
                    />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                    <FormField
                        label="Date"
                        name="Date"
                        helperText={touched.Date && errors.Date}
                        component={AppDatePicker}
                    />
                </div>
            </div>
            <div className="flex gap-[52px] w-full">
                <div className="flex flex-col gap-1 w-1/2">
                    <FormField
                        label="Upload portfolio"
                        name="FileId"
                        endContent={<Link21 size="24"/>}
                        helperText={touched.FileId && errors.FileId}
                    />
                </div>
                <div className="flex flex-col gap-1 w-1/2"/>
            </div>
            <div className="flex gap-14 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <FormField
                        label="Description"
                        name="Description"
                        component={AppTextArea}
                        helperText={touched.Description && errors.Description}
                    />
                </div>
            </div>
        </Form>
    );
};
