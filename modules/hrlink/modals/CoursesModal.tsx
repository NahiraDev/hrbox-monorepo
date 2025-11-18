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
    // <AppModal icon={<Personalcard className="text-white" size="22" />} size="3xl" title="Edit General Informations">
    <>
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
              size: "md",
              variant: "light",
              color: "default",
              content: "Close",
            }}
          />
          <AppButton
            props={{
              size: "md",
              variant: "light",
              color: "secondary",
              type: "submit",
              content: "Submit",
            }}
          />
        </div>
      </AppModal.Footer>
    </>
    // </AppModal>
  );
};
