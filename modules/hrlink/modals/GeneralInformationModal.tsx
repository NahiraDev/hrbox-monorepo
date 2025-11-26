import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {
  formValidationGeneralInformation, GeneralInformationForm, handleSubmitGeneralInformation,
  initialValuesGeneralInformation
} from "@hrbox/modules/hrlink/forms/GeneralInformationForm";

export const GeneralInformationModal = () =>{
  return(
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
  )
}
