import { AppButton, AppModal } from "@hrbox/uikit/components";
import { FormProvider } from "@hrbox/core/providers/FormProvider";
import { useCreateCourseMutation } from "@hrbox/module/hrlink/features/resume/apis";

import {
  CourseForm,
  formValidationCourse,
  handleSubmitCourse,
  initialValuesCourse,
} from "@module/hrlink/features/resume/forms";

export const CourseModal = () => {
  const [createCourse] = useCreateCourseMutation();

  return (
      <FormProvider
          formId="course-form"
          initialValues={initialValuesCourse}
          validationSchema={formValidationCourse}
          onSubmitAsync={async (values: any) => {
              await createCourse(handleSubmitCourse(values)).unwrap();
          }}
      >
          <CourseForm />
      </FormProvider>
  );
};
