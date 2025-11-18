import { AppModal } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/IpAllocationEdit';
import IpAllocationShowForm from '../forms/IpAllocationShowForm';
const IpAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <IpAllocationShowForm/>
    </>
  )
}
export default IpAllocationShow;
