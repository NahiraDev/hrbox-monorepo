import {
  AppButton,
  AppInput,
  AppModal,
  AppTextArea,
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { OrganizationDepartmentChoseModal } from "@hrbox-monorepo/modules/basic-info/modals/OrganizationDepartmentChoseModal";
import { Category } from "iconsax-reactjs";
import { useState } from "react";

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
  color: ColorType | null;
}

export const OrganizationDepartmentModal = () => {
  const { openModal } = useModalContext();
  const [formData, setFormData] = useState<DepartmentFormData>({
    title: "",
    description: "",
    color: null,
  });

  const commonInputProps = {
    className: "border border-[#DCF0F9]",
    size: "lg",
    color: "primary",
    radius: "lg",
  };

  const handleColorSelect = (color: ColorType) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleInputChange = (
    field: keyof DepartmentFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    (openModal as any)("", "", null);
  };

  const handleSave = () => {
    if (formData.color) {
      openModal(
        "custom",
        "",
        <OrganizationDepartmentChoseModal
          initialData={formData}
          selectedColor={formData.color}
        />,
        undefined,
        "3xl",
        "Organization Departments",
        <Category className="text-white" />,
      );
    }
  };

  const colorSwatches = colors.map((color) => {
    const isSelected = formData.color === color;
    return (
      <div
        key={color}
        className={`w-8 h-8 rounded-sm transition duration-100 cursor-pointer relative mt-2 ${
          isSelected
            ? "ring-2 ring-primary-panel ring-offset-2 scale-110"
            : "hover:scale-125"
        }`}
        style={{
          backgroundColor: color,
          ...(isSelected && {
            boxShadow: `0 0 0 2px ${color === "#000000" ? "#fff" : "#000"}`,
          }),
        }}
        onClick={() => handleColorSelect(color)}
        aria-label={`Select color ${color}`}
        role="radio"
        aria-checked={isSelected}
        tabIndex={0}
      />
    );
  });

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-4">
            <AppInput
              props={{
                ...commonInputProps,
                label: "Department Title",
                placeholder: "Enter department title",
                required: true,
                value: formData.title,
                onChange: (e) => handleInputChange("title", e.target.value),
              }}
            />
            <div className="flex flex-col gap-1">
              <span className="!text-sm !font-medium">Department Color</span>
              <div className="flex gap-2.5 flex-wrap" role="radiogroup">
                {colorSwatches}
              </div>
              <div
                className={`mt-2 flex items-center gap-2 transition-all duration-300 ease-in-out ${
                  formData.color
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                style={{
                  opacity: formData.color ? 0.85 : 0,
                }}
              >
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: formData.color || "transparent" }}
                />
                <span className="text-sm text-gray-600">
                  Selected: {formData.color || ""}
                </span>
              </div>
            </div>
          </div>

          <AppTextArea
            props={{
              ...commonInputProps,
              label: "Description",
              placeholder: "Enter department description",
              rows: 4,
              value: formData.description,
              onChange: (e) => handleInputChange("description", e.target.value),
            }}
          />
        </div>
      </AppModal.Body>

      <AppModal.Footer>
        <AppButton
          props={{
            size: "xs",
            radius: "sm",
            variant: "light",
            onPress: handleCancel,
            content: <span>Cancel</span>,
            className:
              "text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200",
          }}
        />
        <AppButton
          props={{
            size: "xs",
            radius: "sm",
            variant: "light",
            onPress: handleSave,
            content: <span>Save Changes</span>,
            className:
              "bg-primary-panel text-white py-1.5 px-3 text-xl rounded-lg hover:bg-primary-panel",
            disabled: !formData.color,
          }}
        />
      </AppModal.Footer>
    </>
  );
};
