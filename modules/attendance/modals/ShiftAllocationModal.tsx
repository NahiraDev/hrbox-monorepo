import { AppButton, AppModal } from "@hrbox/uikit/components";
import { FormProvider } from "@hrbox/core/providers/FormProvider";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import ShiftAllocationForm from "@hrbox/modules/attendance/forms/ShiftAllocationForm";
import * as Yup from "yup";
import { addAllocation } from "../app/mock";
interface ShiftAllocationModalProps {
  onSuccess?: () => void;
}
const ShiftAllocationModal = ({ onSuccess }: ShiftAllocationModalProps) => {
  const { getOpenModal , closeModal } = useModalContext();
  const modalData = getOpenModal()?.data;
  const dataRow = modalData?.data;

  console.log("=== MODAL DEBUG ===");
  console.log("modalData:", modalData);
  console.log("dataRow:", dataRow);

  const initialValues = {
    type: dataRow?.type?.toLowerCase() || "person",
    ChooseShift: dataRow?.ChooseShift || "",
    FormDate: dataRow?.FormDate || "",
    organization: dataRow?.organization || "",
    Department: dataRow?.Department || "",
    JobTitle: dataRow?.JobTitle || "",
    Employee: dataRow?.Employee || "",
    Description: dataRow?.Description || "",
  };

  const formValidation = Yup.object().shape({
    type: Yup.string().required(),
    ChooseShift: Yup.string().required(),
    FormDate: Yup.string().required(),
    organization: Yup.string().required(),
    Department: Yup.string(),
    JobTitle: Yup.string(),
    Employee: Yup.string(),
    Description: Yup.string().required(),
  });
  const handleSubmitAction = async (values: any) => {
    try {
      const newItem = addAllocation({
        type: values.type,
        ChooseShift: values.ChooseShift,
        FormDate: values.FormDate,
        organization: values.organization,
        Department: values.Department,
        JobTitle: values.JobTitle,
        Employee: values.Employee,
        Description: values.Description,
      });
      console.log("✅ Added successfully:", newItem);
      onSuccess?.();
      closeModal();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  };
  return (
    <FormProvider
      formId="shift-allocation"
      initialValues={initialValues}
      validationSchema={formValidation}
      onSubmitAsync={handleSubmitAction}
      enableReinitialize={true}
      enableCache={false}
    >
      <ShiftAllocationForm />
    </FormProvider>
  );
};
export default ShiftAllocationModal;
