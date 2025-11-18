import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider'
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/IpAllocationForm';
import IpAllocationForm from '@hrbox/modules/attendance/forms/IpAllocationForm';

const IpAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
     
        <IpAllocationForm/>
    </>
  )
}
export default IpAllocationModal;
