import FaceAllocationForm from "@hrbox/modules/attendance/forms/FaceAllocationForm";
import * as Yup from "yup";
import { FormProvider, useModalContext } from "@hrbox/core/providers";
import { addAllocation } from "../app/mock";
const FaceAllocationModal = () => {
  const {getOpenModal,closeModal}=useModalContext();
  const modalData=getOpenModal()?.data;
  const rowData=modalData?.data
   const initialValuesAction = {
    type: rowData?.type?.toLowerCase() ||  "person",
    ChooseShift: rowData?.ChooseShift|| "",
    FormDate:rowData?.FormDate|| "",
    organization:rowData?.organization|| "",
    Department:rowData?.Department|| "",
    Employee:rowData?.Employee|| "",
    Description:rowData?.Description|| "",
    JobTitle:rowData?.JobTitle|| "",
  };
  const formValidationAction = Yup.object().shape({
    type: Yup.string().required(),
    ChooseShift: Yup.string().required(),
    FormDate: Yup.string().required(),
    organization: Yup.string().required(),
    Department: Yup.string(),
    JobTitle: Yup.string(),
    Employee: Yup.string(),
    Description: Yup.string().required(),
  });
   const handleSubmitAction =async (values: any) => {
    try {
      const newItem=addAllocation({
      type: values.type,
    ChooseShift:values.ChooseFace,
    FormDate: values.FormDate,
    organization: values.organization,
    Department: values.Department,
    Employee: values.Employee,
    Description: values.Description,
    JobTitle: values.JobTitle,
      });
        console.log("✅ Added successfully:", newItem);
        closeModal();
    } catch (error) {
      
    }
      };
  
  return (
    <>
    <FormProvider formId="face-allocation-form" initialValues={initialValuesAction} validationSchema={formValidationAction} onSubmitAsync={handleSubmitAction} enableCache={false} enableReinitialize={true} >
      <FaceAllocationForm />
    </FormProvider>
    </>
  );
};
export default FaceAllocationModal;
