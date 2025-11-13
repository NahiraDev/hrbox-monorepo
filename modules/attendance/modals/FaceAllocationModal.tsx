import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/FaceAllocationForm';
import FaceAllocationForm from '@hrbox/modules/attendance/forms/FaceAllocationForm';
const FaceAllocationModal=()=>{
  const {closeModal}=useModalContext();
  
  return(
    <>
      <AppModal.Body>
        <FormProvider formId='faceallocation-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'FaceAllocation');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <FaceAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color='white'
              size='md'
              radius='lg'
              onPress={() => closeModal('confirm', 'FaceAllocation')}
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
export default FaceAllocationModal;
