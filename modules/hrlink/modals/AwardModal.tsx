// @hrbox/modules/hrlink/modals/AwardModal.tsx
import { FormProvider } from "@hrbox/core/providers/FormProvider";
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

type AwardModalProps = {
  award?: {
    Id: number;
    Title: string;
    Date: number;
    Description: string;
    FileId?: string | null;
  } | null;
  onSuccess?: () => void;
};

export const AwardModal = ({ award, onSuccess }: AwardModalProps) => {
  const [createAward] = useCreateAwardMutation();
  const [updateAward] = useEditAwardMutation();

  const isEdit = !!award;

  return (
    <FormProvider
      formId="award-form"
      initialValues={{
        ...initialValuesAward,
        Title: award?.Title || "",
        Date: award?.Date?.toString() || "",
        Description: award?.Description || "",
        FileId: award?.FileId || null,
      }}
      validationSchema={formValidationAward}
      onSubmitAsync={async (values: any) => {
        const payload = handleSubmitAward(values);

        if (isEdit) {
          await updateAward({ id: award!.Id, ...payload }).unwrap();
        } else {
          await createAward(payload).unwrap();
        }

        onSuccess?.();
      }}
    >
      <AwardForm isEdit={isEdit} />
    </FormProvider>
  );
};
