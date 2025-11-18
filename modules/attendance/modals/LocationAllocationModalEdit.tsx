import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/LocationAllocationEdit';
import LocationAllocationEdit from '@hrbox/modules/attendance/forms/LocationAllocationEdit';
const LocationAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <LocationAllocationEdit/>
    </>
  )
}
export default LocationAllocationModalEdit;
