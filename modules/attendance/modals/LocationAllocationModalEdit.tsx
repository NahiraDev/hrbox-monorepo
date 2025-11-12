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
      <AppModal.Body>
        <FormProvider  formId='LocationAllocation-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'LocationAllocationEdit');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <LocationAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress={ () => closeModal('edit', 'LocationAllocationEdit')}
              content= 'Cancel'
          />
          <AppButton
              color= 'primary'
              size= 'md'
              radius= 'lg'
              className= 'text-white'
              content= 'Submit'
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default LocationAllocationModalEdit;
