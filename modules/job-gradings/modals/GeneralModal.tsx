import { FormProvider, useModalContext } from "@hrbox/core/providers";
import GeneralForm from "../forms/GeneralForm";
import * as Yup from "yup";

const GeneralModal = () => {
  const { getOpenModal } = useModalContext();
  const modalData = getOpenModal()?.data;
  const rowData = modalData?.data;
  console.log(rowData);

  const initialValues = {
    Grade: rowData?.Grade ,
    Grouping: rowData?.Grouping ,
    ofpoint: rowData?.ofpoint ,
    uptopoints: rowData?.uptopoints ,
    gradeColor: rowData?.gradeColor ,
    Description: rowData?.Description ,
  };


  const formValidationAction = Yup.object().shape({
    Grade: Yup.string().required(),
    Grouping: Yup.string().required(),
    ofpoint: Yup.string().required(),
    uptopoints: Yup.string().required(),
    Description: Yup.string().required(),
  });

  const handelSubmit =async (values: any) => {
    console.log("hello", values);
  };
  return (
    <FormProvider
      formId="general-form"
      initialValues={initialValues}
      validationSchema={formValidationAction}
      onSubmit={handelSubmit}
      enableCache={true}
      clearCacheOnSubmit={true}
    >
      <GeneralForm />
    </FormProvider>
  );
};

export default GeneralModal;
