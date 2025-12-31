import { Link21 } from "iconsax-reactjs";
import { AppDatePicker, AppTextArea } from "@hrbox/uikit/components";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import * as Yup from "yup";
import { FormField } from "@hrbox/uikit/components/FormField";

// export const formValidationAward = Yup.object().shape({
//     Title: Yup.string().required(),
//     Date: Yup.string().required(),
//     Description: Yup.string().required(),
//     FileId: Yup.string().required(),
// });

export const formValidationAward = Yup.object().shape({
  Title: Yup.string().nullable(),
  Date: Yup.string().nullable(),
  Description: Yup.string().nullable(),
  FileId: Yup.mixed().nullable()
});

export const handleSubmitAward = (values: any) => {
  return {
    Title: values.Title,
    Date: values.Date,
    Description: values.Description,
    FileId: values.FileId
  };
};

export const AwardForm = ({ isEdit }: { isEdit?: boolean }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  return (
    <form className="w-full flex flex-col gap-6" id="award-form" onSubmit={handleSubmit}>
      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <FormField
            label="Title"
            name="Title"
            error={touched.Title && errors.Title}
            placeholder="e.g. Best Employee of the Year"
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <FormField
            label="Year"
            name="Date"
            component={AppDatePicker}
            helperText={touched.Date && errors.Date}
          />
        </div>
      </div>

      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <FormField
            label="Upload Certificate (optional)"
            name="FileId"
            endContent={<Link21 size="24" />}
            helperText={touched.FileId && errors.FileId}
          />
        </div>
        <div className="w-1/2" />
      </div>

      <div className="flex gap-14 w-full">
        <FormField
          label="Description"
          name="Description"
          component={AppTextArea}
          helperText={touched.Description && errors.Description}
          placeholder="Brief description of the award..."
        />
      </div>


    </form>
  );
};

