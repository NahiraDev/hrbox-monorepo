import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/FaceAllocationEdit';
import FaceAllocationEdit from '@hrbox/modules/attendance/forms/FaceAllocationEdit';
const FaceAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider 
          formId='FaceAllocationEdit-form' enableCache clearCacheOnSubmit
        onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'FaceAllocationModalEdit');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <FaceAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress={ () => closeModal('edit', 'FaceAllocationModalEdit')}
              content='Cancel'
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
export default FaceAllocationModalEdit;
