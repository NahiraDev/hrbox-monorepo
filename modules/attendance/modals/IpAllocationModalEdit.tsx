import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider, useModalContext } from '@hrbox/core/providers';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/IpAllocationEdit';
import IpAllocationEdit from '@hrbox/modules/attendance/forms/IpAllocationEdit';
const IpAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <IpAllocationEdit/>
    </>
  )
}
export default IpAllocationModalEdit;
