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
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseIp: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  JobTitle: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.title);
  console.log(values.type);
  console.log(values.ChooseShift);
  console.log(values.FromDate);
  console.log(values.organization);
  console.log(values.Employee);
  console.log(values.Description);
  return {
    title: values.title,
    type: values.type,
    ChooseIp: values.ChooseIp,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
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
