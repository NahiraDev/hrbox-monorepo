import { FormField } from "@hrbox/uikit/components/FormField";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesHealth = {
  Title: null,
  Amount: null,
};
export const formValidationHealth = Yup.object().shape({
  Title: Yup.string().required(),
  Amount: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    Title: values.title,
    Amount: values.type,
  };
};

const OnDutyHealthRecords = () => {
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Title"
          label="Title"
          helperText={touched.Title && errors.Title}
          formMode={currentType}
        />
        <FormField
          name="Amount"
          label="Amount"
          helperText={touched.Amount && errors.Amount}
          formMode={currentType}
        />
      </div>
    </form>
  );
};
