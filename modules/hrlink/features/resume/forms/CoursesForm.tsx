import * as Yup from 'yup';
import { useFormContext } from 'core/context';
import { Form } from '@heroui/react';
import { AppDatePicker, AppInput, AppTextArea } from 'core/components';
import { Link21 } from 'iconsax-react';

export const initialValuesCourse = {
  UniversityId: null,
  FieldOfStudy: null,
  thesisTitle: '',
  Degree: null,
  PlaceOfStudy: null,
  Gpa: null,
  UniversityType: null,
  StartDate: null,
  EndDate: null,
};

export const formValidationCourse = Yup.object().shape({
  UniversityId: Yup.string().required(),
  FieldOfStudy: Yup.string().required(),
  thesisTitle: Yup.string().required(),
  Degree: Yup.string().required(),
  PlaceOfStudy: Yup.string().required(),
  Gpa: Yup.string().required(),
  UniversityType: Yup.string().required(),
  StartDate: Yup.string().required(),
  EndDate: Yup.string().required(),
});

export const handleSubmitCourse = (values: any) => {
  return {
    UniversityId: values.UniversityId,
    FieldOfStudy: values.FieldOfStudy,
    thesisTitle: values.thesisTitle,
    Degree: values.thesisTitle,
    PlaceOfStudy: values.thesisTitle,
    Gpa: values.thesisTitle,
    UniversityType: values.thesisTitle,
    StartDate: values.thesisTitle,
    EndDate: values.thesisTitle,
  };
};

export const CourseForm = () => {
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
              value: values.Name,
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
              value: values.Date,
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
              value: values.FileId,
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
              value: values.Description,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
