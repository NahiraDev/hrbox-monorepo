  import { useEffect } from "react";
  import { Form } from "@heroui/react";
  import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
  import { useFormContext } from "@hrbox/core/providers/FormProvider";
  import { FormField } from "@hrbox/uikit/components/FormField";
  import { useModalContext } from "@hrbox/core/providers";
  import ColorPicker from "@hrbox/uikit/components/ColorPicker";
  import { Scan } from "iconsax-reactjs";


  import {
    GRADE_OPTIONS,
    GROUP_OPTIONS,
    OF_POINTS,
    UP_TO_POINT,
    GRADE_COLORS,
  } from "../app/mock";

  // ✅ کامپوننت helper

  const GeneralForm = () => {
  const { values, handleSubmit, setFieldValue } = useFormContext();
  const { getOpenModal } = useModalContext();

  const currenttype = getOpenModal()?.type;
   

  useEffect(() => {
    console.log("📋 VALUES:", values);
  }, [values]);

  return (
    <Form id="general-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">

        <FormField
          formMode={currenttype}
          name="Grade"
          label="Grade title"
          component={AppAutoComplete}
          data={GRADE_OPTIONS}
        />

        <FormField
          formMode={currenttype}
          name="Grouping"
          label="Select Group"
          component={AppAutoComplete}
          data={GROUP_OPTIONS}
        />

        <FormField
          formMode={currenttype}
          name="ofpoint"
          label="Of Points"
          component={AppAutoComplete}
          data={OF_POINTS}
        />

        <FormField
          formMode={currenttype}
          name="uptopoints"
          label="Up To Points"
          component={AppAutoComplete}
          data={UP_TO_POINT}
        />

        {/* Color */}
        <div className="col-span-2">
          {currenttype === "view" ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-secondary-900">
                Color Grade
              </label>
              <div className="!h-10 px-3 flex items-center rounded-lg border border-[#DCF0F9]">
                <span
                  className="w-6 h-6 rounded-md"
                  style={{ backgroundColor: values.gradeColor }}
                />
              </div>
            </div>
          ) : (
            <ColorPicker
              colors={GRADE_COLORS}
              value={values.gradeColor}
              onChange={(c) => setFieldValue("gradeColor", c)}
            />
          )}
        </div>

        <div className="col-span-2">
          <FormField
            formMode={currenttype}
            name="Description"
            label="Descriptions"
            component={AppTextArea}
          />
        </div>
      </div>

      <Scan
        color="gray"
        size={80}
        className="absolute bottom-4 left-4 pointer-events-none"
      />
    </Form>
  );
};


  export default GeneralForm;
