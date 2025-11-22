// OrganizationDepartmentChoseModal.tsx
import { AppInput, AppModal, AppTextArea } from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { FC } from "react";
import { FormField } from "@hrbox/uikit/components/FormField";
import * as Yup from "yup";

const colors = [
  "#000000",
  "#A61111",
  "#F4D082",
  "#05856F",
  "#0ED2F7",
  "#2F80ED",
  "#DB5918",
  "#9F9C90",
] as const;

type ColorType = (typeof colors)[number];

interface DepartmentFormData {
  title: string;
  description: string;
  color: ColorType;
}

interface TechnicalDepartmentModalProps {
  initialData: DepartmentFormData;
  selectedColor: ColorType;
}
export const initialValuesTechnicalDepartment = {
  DepartmentTitle: null,
  Description: null,
};
export const formValidationTechnicalDepartment = Yup.object().shape({
  DepartmentTitle: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.DepartmentTitle);
  console.log(values.Description);
  return {
    DepartmentTitle: values.DepartmentTitle,
    Description: values.Description,
  };
};
export const TechnicalDepartmentForm: FC<TechnicalDepartmentModalProps> = ({
  initialData,
  selectedColor,
}) => {
  const { openModal } = useModalContext();

  const commonInputProps = {
    className: "border border-[#DCF0F9]",
    size: "lg",
    color: "primary",
    radius: "lg",
  };

  const handleCancel = () => {
    (openModal as any)("", "", null);
  };

  const handleSave = () => {
    // Save logic با داده‌های initial
    console.log("Final save department:", {
      ...initialData,
      color: selectedColor,
    });

    // TODO: API call یا store update
    alert("Department saved successfully!");

    (openModal as any)("", "", null);
  };

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField name="Department Title" label="Department Title" />
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-lg "
                style={{ backgroundColor: selectedColor }}
              />
              <span className="!font-medium text-secondary-1000">
                Department Color
              </span>
            </div>
          </div>
          <FormField
            name="Description"
            label="Description"
            component={AppTextArea}
          />
        </div>
      </AppModal.Body>
    </>
  );
};
