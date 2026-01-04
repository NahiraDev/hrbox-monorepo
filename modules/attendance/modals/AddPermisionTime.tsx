import { AppButton, AppModal } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import {FormProvider} from "@hrbox/core/providers/FormProvider"
import AddPermisionForm from '@hrbox/modules/attendance/forms/AddPermisionForm';
import * as Yup from "yup";
const AddPermisionTime=()=>{
 const initialValuesPermision = {
    formTime: "",
    toTime:"",
    ChooseType:""
  };

  const formValidationPermision = Yup.object().shape({
    formTime: Yup.string().required(),
    toTime: Yup.string().required(),
    ChooseType: Yup.string().required(),
  });
  const handelSubmit=async(values:any)=>{
    console.log("hello");
  }
  return(
    <>
    <FormProvider formId='permision-form' initialValues={initialValuesPermision} validationSchema={formValidationPermision} onSubmitAsync={handelSubmit}>
          <AddPermisionForm/>
          </FormProvider>
    </>
  )
}
export default AddPermisionTime
