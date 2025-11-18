import { AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/FaceAllocationEdit';
import FaceAllocationShowForm from '@hrbox/modules/attendance/forms/FaceAllocationShowForm';
const FaceAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <FaceAllocationShowForm/>
    </>
  )
}
export default FaceAllocationShow;
