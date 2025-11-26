import React from "react";
import { AppButton } from "@hrbox/uikit/components";
import {FormField} from "@hrbox/uikit/components/FormField";
import {useFormContext} from "@hrbox/core/providers";


export const SkillModal = {
    name: "",
    category: "",
    level: "",
    years: "",
}

export default function Skills() {
const { errors, touched, handleSubmit, isSubmitting, setSubmitting, setErrors } = useFormContext();


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        name="name"
        label="Skill Name"
        helperText={touched.name && errors.name}
        disabled={isSubmitting}
      />

      <FormField
        label="Years of Experience"
        type="number"
      />

      <div className="flex justify-end gap-3 pt-6">
        <AppButton
          props={{ variant: "light", type: "button", onPress: onClose }}
        >
          Cancel
        </AppButton>
        <AppButton props={{ color: "primary", type: "submit" }}>
          Add Skill
        </AppButton>
      </div>
    </form>
  );
}
