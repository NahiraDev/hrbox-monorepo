import { AppButton, AppModal } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import {FormProvider} from "@hrbox/core/providers/FormProvider"
import AddPermisionForm from '@hrbox/modules/attendance/forms/AddPermisionForm';

const AddPermisionTime=()=>{
  const {closeModal} = useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider formId='AddPermision-form' enableCache clearCacheOnSubmit onSubmitAsync={} initialValues={}>
          <AddPermisionForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress={ () => closeModal('confirm', 'AddPermisionTime')}
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
export default AddPermisionTime
