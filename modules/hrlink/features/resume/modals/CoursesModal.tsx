import { AppButton, AppModal } from 'core/components';
import { Personalcard } from 'iconsax-react';
import { FormProvider } from 'core/context';
import { useCreateCourseMutation } from '../apis';

import { CourseForm, formValidationCourse, handleSubmitCourse, initialValuesCourse } from '../forms';

export const CourseModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
    <AppModal icon={<Personalcard className="text-white" size="22" />} size="3xl" title="Edit General Informations">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesCourse}
          validationSchema={formValidationCourse}
          onSubmitAsync={async (values: any) => {
            await createCourse(handleSubmitCourse(values)).unwrap();
          }}
        >
          <CourseForm />
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex gap-2">
          <AppButton
            props={{
              size: 'md',
              variant: 'light',
              color: 'default',
              content: 'Close',
            }}
          />
          <AppButton
            props={{
              size: 'md',
              variant: 'light',
              color: 'secondary',
              type: 'submit',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};
