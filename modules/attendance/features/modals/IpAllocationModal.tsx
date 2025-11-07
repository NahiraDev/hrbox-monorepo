import { AppButton, AppModal } from '@core/components';
import { FormProvider, useModalContext } from '@core/context';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/IpAllocationForm';
import IpAllocationForm from '@module/attendance/features/forms/IpAllocationForm';
const IpAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'IpAllocation');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <IpAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'IpAllocation'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              form:'ip-allocation-form',
              className: 'text-white',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default IpAllocationModal;
