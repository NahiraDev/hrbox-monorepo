import { Form } from '@heroui/react';
import { Link21 } from 'iconsax-react';
import { AppDatePicker, AppInput, AppTextArea } from '@core/components';
import { useFormContext } from '@core/context';
import * as Yup from 'yup';

export const initialValuesAward = {
  Title: null,
  Date: null,
  Description: '',
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
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return (
    <Form className="w-full flex flex-col gap-6" id="create-award-form" onSubmit={handleSubmit}>
      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Title',
              name: 'Name',
              error: touched.Name && errors.Name,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'Date',
              name: 'Date',
              error: touched.Date && errors.Date,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Upload portfolio',
              name: 'FileId',
              endContent: <Link21 size="24" />,
              error: touched.FileId && errors.FileId,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2" />
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-full">
          <AppTextArea
            props={{
              label: 'Description',
              name: 'Description',
              error: touched.Description && errors.Description,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
