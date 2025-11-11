import { AppButton, AppModal } from '@hrbox-monorepo/UIKit/components';
import { FormProvider } from '@hrbox-monorepo/core/providers/FormProvider';
import {
  formValidationGeneralInformation, GeneralInformationForm, handleSubmitGeneralInformation,
  initialValuesGeneralInformation
} from "@hrbox-monorepo/modules/hrlink/forms/GeneralInformationForm";

export const GeneralInformationModal = () =>{
  return(
      <>
        <AppModal.Body>
          <FormProvider
          formId="general-information-form"
            initialValues={initialValuesGeneralInformation}
            validationSchema={formValidationGeneralInformation}
            onSubmitAsync={async (values: any) => {
              // await createGeneralInformation(handleSubmitGeneralInformation(values)).unwrap();
            }}
          >
              <></>
            <GeneralInformationForm />
          </FormProvider>
        </AppModal.Body>
      </>
    // </AppModal>
  )
}
