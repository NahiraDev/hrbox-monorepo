import { AppModal } from 'core/components';
import { Personalcard } from 'iconsax-react';
import { FormProvider } from 'core/context';
import {
  GeneralInformationForm,
  formValidationGeneralInformation,
  handleSubmitGeneralInformation,
  initialValuesGeneralInformation,
} from '@module/hrlink/features/resume/forms';

export const GeneralInformationModal = () =>{
  return(
    <AppModal title="Add General Informations" icon={<Personalcard className="text-white" size="22" />} size="xl">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesGeneralInformation}
          validationSchema={formValidationGeneralInformation}
          onSubmitAsync={async (values: any) => {
            // await createGeneralInformation(handleSubmitGeneralInformation(values)).unwrap();
          }}
        >
          <GeneralInformationForm />
        </FormProvider>
      </AppModal.Body>
    </AppModal>
  )
}
