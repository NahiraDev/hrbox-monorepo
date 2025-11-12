import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider'
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/IpAllocationForm';
import IpAllocationForm from '@hrbox/modules/attendance/forms/IpAllocationForm';

const IpAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider  formId='IpAllocation-form' enableCache clearCacheOnSubmit  onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'IpAllocation');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <IpAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress={ () => closeModal('confirm', 'IpAllocation')}
              content= 'Cancel'
          />
          <AppButton
              color ='primary'
              size='md'
              radius='lg'
              className='text-white'
              content='Submit'
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default IpAllocationModal;
