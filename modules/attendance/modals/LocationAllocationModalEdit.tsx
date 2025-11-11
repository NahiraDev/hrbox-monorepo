import { AppButton, AppModal } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider';
import { useModalContext } from '@core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/LocationAllocationEdit';
import LocationAllocationEdit from '@module/attendance/features/forms/LocationAllocationEdit';
const LocationAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'LocationAllocationEdit');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <LocationAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('edit', 'LocationAllocationEdit'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              form:'location-allocation-edit',
              className: 'text-white',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default LocationAllocationModalEdit;
