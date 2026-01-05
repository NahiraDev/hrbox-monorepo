import { AppTextArea } from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useFormContext } from "@hrbox/core/providers";
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

export const initialValuesOrganizationDepartment = {
  department_title: "",
  rank: "",
  description: "",
};
export const formValidationOrganizationDepartment = Yup.object().shape({
  department_title: Yup.string().required("Please enter a department title"),
  rank: Yup.string().required("Please enter a rank"),
  description: Yup.string().required("Please enter a description"),
});
export const handleSubmitOrganizationDepartment = (values: any) => {
  return {
    department_title: values.department_title,
    rank: values.rank,
    description: values.description,
  };
};

export const OrganizationDepartmentModal = () => {
  const { openModal, getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  const { values, errors, touched, handleSubmit, setFieldValue } =
    useFormContext();

  const handleColorSelect = async (color: any) => {
    await setFieldValue("rank", color);
  };

  const colorSwatches = colors.map((color) => {
    const isSelected = values.rank === color;
    return (
      <div
        key={color}
        className={`w-8 h-8 rounded-sm transition duration-100 cursor-pointer relative mt-2 ${
          isSelected
            ? "ring-2 ring-primary ring-offset-2 scale-110"
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="department"
          label="Department Title"
          helperText={touched.department && errors.department}
          formMode={currentType}
        />
        <div className="flex flex-col ">
          <span className="!text-sm !font-medium">Department Color</span>
          <div className="flex gap-2.5 flex-wrap" role="radiogroup">
            {colorSwatches}
          </div>
          <div
            className={`mt-2 flex items-center gap-2 transition-all duration-300 ease-in-out ${
              values.rank
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{
              opacity: values.rank ? 0.85 : 0,
            }}
          >
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: values.rank || "transparent" }}
            />
            <span className="text-sm text-gray-600">
              Selected: {values.rank || ""}
            </span>
          </div>
        </div>
      </div>
      <FormField
        formMode={currentType}
        name="descriptions"
        label="Descriptions"
        component={AppTextArea}
        helperText={touched.Descriptions && errors.Descriptions}
      />

    </form>
  );
};
