import IpAllocationForm from "@hrbox/modules/attendance/forms/IpAllocationForm";
import * as Yup from "yup";
import {FormProvider} from "@hrbox/core/providers/FormProvider"
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { addAllocation } from "../app/mock";

const IpAllocationModal = () => {
  const {getOpenModal,closeModal}=useModalContext();
  const modalData=getOpenModal()?.data;
  const rowData=modalData?.data;
  console.log("RowData-Ip",rowData);
  console.log("modalData-Ip",modalData);
  
  
  const initialValuesAction = {
    type: rowData?.type?.toLowerCase() ||  "person",
    ChooseIp:rowData?.ChooseShift || "",
    FormDate: rowData?.FormDate ||  "",
    organization: rowData?.organization|| "",
    Department: rowData?.Department|| "",
    Employee: rowData?.Employee|| "",
    Description: rowData?.Description || "",
    JobTitle: rowData?.JobTitle|| "",
  };
  const formValidationAction = Yup.object().shape({
    type: Yup.string().required(),
    ChooseIp: Yup.string().required(),
    FormDate: Yup.string().required(),
    organization: Yup.string().required(),
    Department: Yup.string(),
    JobTitle: Yup.string(),
    Employee: Yup.string(),
    Description: Yup.string().required(),
  });
  const handleSubmitAction = async (values: any) => {
    try {
      const newItem=addAllocation({
    type: values.type,
    ChooseShift:values.ChooseIp,
    FormDate: values.FormDate,
    organization: values.organization,
    Department: values.Department,
    Employee: values.Employee,
    Description: values.Description,
    JobTitle: values.JobTitle,
      });
      console.log("✅ Added successfully Ip:", newItem);
      closeModal();
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  };
  return (
    <>
      <FormProvider
        formId="ip-allocation-form"
        initialValues={initialValuesAction}
        validationSchema={formValidationAction}
        onSubmitAsync={handleSubmitAction}
        enableReinitialize={true}
        enableCache={false}
      >
        <IpAllocationForm />
      </FormProvider>
    </>
  );
};
export default IpAllocationModal;
