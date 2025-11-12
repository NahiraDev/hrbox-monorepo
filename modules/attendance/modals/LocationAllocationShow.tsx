import { AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/LocationAllocationEdit';
import LocationAllocationShowForm from '@hrbox/modules/attendance/forms/LocationAllocationShowForm';
const LocationAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider  formId='LocationAllocationShow-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
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
