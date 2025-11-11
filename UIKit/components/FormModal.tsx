interface FormModalProps extends AppModalProps {
  formId?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
                                                      formId,
                                                      submitLabel = "ذخیره",
                                                      cancelLabel = "لغو",
                                                      ...props
                                                    }) => {
  let formContext: any = null;
  try {
    formContext = useFormContext();
  } catch {
  }

  const handleSubmit = () => {
    if (formContext) {
      formContext.handleSubmit();
    } else if (props.onSubmit) {
      props.onSubmit();
    }
  };

  const isDirty = formContext?.dirty ?? props.isDirty ?? false;
  const isSubmitting = formContext?.isSubmitting ?? props.isSubmitting ?? false;
  const formError = formContext?.formError ?? props.formError ?? null;

  return (
    <AppModal
      {...props}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      formError={formError}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      cancelLabel={cancelLabel}
    />
  );
};