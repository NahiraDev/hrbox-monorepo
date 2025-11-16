// OrganizationDepartmentChoseModal.tsx
import { AppInput, AppModal, AppTextArea } from '@hrbox/UIKit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { FC } from 'react';
import { FormField } from "@HRBox/UIKit/components/FormField";
import * as Yup from "yup";

const colors = ['#000000', '#A61111', '#F4D082', '#05856F', '#0ED2F7', '#2F80ED', '#DB5918', '#9F9C90'] as const;

type ColorType = typeof colors[number];

interface DepartmentFormData {
  title: string;
  description: string;
  color: ColorType;
}

interface TechnicalDepartmentModalProps {
  initialData: DepartmentFormData;
  selectedColor: ColorType;
}
export const initialValuesAction = {
    DepartmentTitle : null,
    Description : null,
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
export const TechnicalDepartmentForm: FC<TechnicalDepartmentModalProps> = ({
                                                                                              initialData,
                                                                                              selectedColor
                                                                                            }) => {
  const { openModal } = useModalContext();

  const commonInputProps = {
    className: 'border border-[#DCF0F9]',
    size: 'lg',
    color: 'primary',
    radius: 'lg',
  };

  const handleCancel = () => {
    (openModal as any)('', '', null);
  };

  const handleSave = () => {
    // Save logic با داده‌های initial
    console.log('Final save department:', {
      ...initialData,
      color: selectedColor
    });

    // TODO: API call یا store update
    alert('Department saved successfully!');

    (openModal as any)('', '', null);
  };

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField name="Department Title" label='Department Title'/>
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-lg "
                style={{ backgroundColor: selectedColor }}
              />
              <span className="!font-medium text-secondary-1000">Department Color</span>
            </div>
          </div>
          <FormField  name="Description" label='Description' component={AppTextArea} />
        </div>
      </AppModal.Body>
    </>
  );
};
