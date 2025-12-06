import { FormProvider, useFormContext } from "@hrbox/core/providers/FormProvider";
import {
  AwardForm,
  formValidationAward,
  handleSubmitAward,
  initialValuesAward,
} from "@hrbox/modules/hrlink/forms/AwardForm";
import {
  useCreateAwardMutation,
  useEditAwardMutation,
} from "@hrbox/modules/hrlink/apis";
import { useEffect } from "react";

type AwardModalProps = {
  award?: {
    Id: number;
    Title: string;
    Date: number;
    Description: string;
    FileId?: string | null;
  } | null;
  onSuccess: () => void;
};

export const AwardModal = ({ award, onSuccess }: AwardModalProps) => {
  const [createAward] = useCreateAwardMutation();
  const [editAward, { isLoading }] = useEditAwardMutation();

  const isEdit = !!award;

  const handleSubmit = async (values: any) => {
     if (!isEdit) return;
    try{
      await editAward({
        id: award.Id,
        ...values,
      }).unwrap()

      onSuccess();
    } catch(err: any){
      throw new Error(err?.data?.msg || "failed to update award");
    }
  }

  const defaultInitialValues = isEdit?
      {
        Title: award.Title || "",
        Date: award.Date || null,
        Description: award.Description || "",
        FileId: award.FileId || null,
      }
    : initialValuesAward;


  return (
    <FormProvider
      formId="award-form"
      initialValues={defaultInitialValues}
      validationSchema={formValidationAward}
      onSubmitAsync={handleSubmit}
      enableReinitialize={true}
    >

      {({ isSubmitting }) => (
        <>

          <AwardForm isEdit={isEdit} />
          
          {/* Optional: show loading state */}
          {isSubmitting && <p className="text-center">Saving...</p>}
          
        </>
      )}
      
    </FormProvider>
    
  );
};

const WithFormikFix = () => {
  const { submitForm, isValid, dirty } = useFormContext();

  useEffect(() => {
    const form = document.getElementById("award-form");
    if (!form) return;

    const handleNativeSubmit = (e: Event) => {
      e.preventDefault();                 // stop normal HTML submit
      if (isValid && (dirty || true)) {   // allow submit even if not dirty (edit case)
        submitForm();                     // THIS triggers Formik + your mutation
      }
    };

    form.addEventListener("submit", handleNativeSubmit);
    return () => form.removeEventListener("submit", handleNativeSubmit);
  }, [isValid, dirty, submitForm]);

  return null; // this component renders nothing, just fixes the submit
};