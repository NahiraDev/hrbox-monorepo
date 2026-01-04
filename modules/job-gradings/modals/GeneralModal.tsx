import { FormProvider, useModalContext } from "@hrbox/core/providers";
import GeneralForm from "../forms/GeneralForm";
import * as Yup from "yup";

const GeneralModal = () => {
  const { getOpenModal } = useModalContext();
  const modalData = getOpenModal()?.data;
  const rowData = modalData?.data;
  console.log(rowData);
  
  const initialValues = {
    Grade: rowData?.Grade || null,
    Grouping: rowData?.Grouping || null,
    ofpoint: rowData?.ofpoint || null,
    uptopoints: rowData?.uptopoints || null,
    gradeColor: rowData?.gradeColor || null,
    Description: rowData?.Description || null,
  };


  const formValidationAction = Yup.object({
    Grade: Yup.string().required(),
    Grouping: Yup.string().required(),
    ofpoint: Yup.string().required(),
    uptopoints: Yup.string().required(),
    Description: Yup.string().required(),
  });

  const handelSubmit = async (values: any) => {
    console.log("hello");
  };
  return (
    <FormProvider
      formId="general-form"
      initialValues={initialValues}
      validationSchema={formValidationAction}
      onSubmitAsync={handelSubmit}
    >
      <GeneralForm />
    </FormProvider>
  );
};

export default GeneralModal;
