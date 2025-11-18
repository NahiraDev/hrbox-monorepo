import { AppInput, AppModal, AppTextArea } from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { FC } from "react";

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

interface OrganizationDepartmentChoseModalProps {
  initialData: DepartmentFormData;
  selectedColor: ColorType;
}

export const OrganizationDepartmentChoseModal: FC<
  OrganizationDepartmentChoseModalProps
> = ({ initialData, selectedColor }) => {
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
            <AppInput
              props={{
                ...commonInputProps,
                label: "Department Title",
                value: initialData.title,
                placeholder: "Describe Title",
                readOnly: true,
                className: "bg-gray-50 cursor-not-allowed",
              }}
            />
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

          <AppTextArea
            props={{
              ...commonInputProps,
              label: "Description",
              value: initialData.description,
              placeholder: "Enter department description",
              readOnly: true,
              className: "bg-gray-50",
            }}
          />
        </div>
      </AppModal.Body>
    </>
  );
};
