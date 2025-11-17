import { AppButton, AppInput, AppModal } from '@hrbox-monorepo/UIKit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete } from "@HRBox/UIKit/components";
import * as Yup from "yup";
export const initialValuesAction = {
  EducationalInstitution : null,
  SearchbyNameorPosition : null,
  PersonnelCode : null,
  NationalCode : null,
};
export const formValidationAction = Yup.object().shape({
  EducationalInstitution: Yup.string().required(),
  SearchbyNameorPosition: Yup.string().required(),
  PersonnelCode: Yup.string().required(),
  NationalCode: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.EducationalInstitution);
  console.log(values.SearchbyNameorPosition);
  console.log(values.PersonnelCode);
  console.log(values.NationalCode);
  return {
    EducationalInstitution: values.EducationalInstitution,
    SearchbyNameorPosition: values.SearchbyNameorPosition,
    PersonnelCode: values.PersonnelCode,
    NationalCode: values.NationalCode,
  };
};
const FilterCalenderModal = () => {

  const { openModal } = useModalContext();

  return (
    <>

      <AppModal.Body>
        <FormField name="Educational Institution" label='Educational Institution' component={AppAutoComplete} />
        <FormField name="Search by Name or Position" label='Search by Name or Position'/>
        <FormField name=" Personnel Code" label=' Personnel Code'/>
        <FormField name="National Code" label='National Code'/>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            // onPress: () => openModal('delete', undefined),
            content: <span>Cancel</span>,
            className:
              'text-white py-1.5 px-3 text-xl rounded-lg !bg-red-500 hover:text-white transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => console.log('a'),
            content: <span>Submit</span>,
            className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
          }}
        />
      </AppModal.Footer>
    </>
  );
};

export default FilterCalenderModal;
