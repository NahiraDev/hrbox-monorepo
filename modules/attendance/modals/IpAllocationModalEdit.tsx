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
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'IpAllocationModalEdit');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <IpAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('edit', 'IpAllocationModalEdit'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              form:'ip-allocation-edit',
              className: 'text-white',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default IpAllocationModalEdit;
