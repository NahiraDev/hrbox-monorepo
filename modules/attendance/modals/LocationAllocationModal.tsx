import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/LocationAllocationForm';
import LocationAllocationForm from '@hrbox/modules/attendance/forms/LocationAllocationForm';

const LocationAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <LocationAllocationForm/>
    </>
  )
}
export default LocationAllocationModal;
