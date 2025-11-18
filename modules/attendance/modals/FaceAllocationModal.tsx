import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/FaceAllocationForm';
import FaceAllocationForm from '@hrbox/modules/attendance/forms/FaceAllocationForm';
const FaceAllocationModal=()=>{
  const {closeModal}=useModalContext();
  
  return(
    <>
        <FaceAllocationForm/>
    </>
  )
}
export default FaceAllocationModal;
