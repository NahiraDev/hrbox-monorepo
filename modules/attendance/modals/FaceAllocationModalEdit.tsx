import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/FaceAllocationEdit';
import FaceAllocationEdit from '@hrbox/modules/attendance/forms/FaceAllocationEdit';
const FaceAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <FaceAllocationEdit/>
    </>
  )
}
export default FaceAllocationModalEdit;
