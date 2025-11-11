import { AppModal } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider';
import { useModalContext } from '@core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/LocationAllocationEdit';
import LocationAllocationShowForm from '@module/attendance/features/forms/LocationAllocationShowForm';
const LocationAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('view', 'LocationAllocationShow');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <LocationAllocationShowForm/>
        </FormProvider>
      </AppModal.Body>
    </>
  )
}
export default LocationAllocationShow;
