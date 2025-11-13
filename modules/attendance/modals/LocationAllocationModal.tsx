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
      <AppModal.Body>
        <FormProvider  formId='LocationAllocation-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'LocationAllocation');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <LocationAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress= {() => closeModal('confirm', 'LocationAllocation')}
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
export default LocationAllocationModal;
