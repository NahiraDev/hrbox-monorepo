import { Form, FormProvider } from "@hrbox/core/providers";
import { AppButton, AppSearchInput, FormField } from "@hrbox/uikit/components";
import { Add } from "iconsax-reactjs";
import * as Yup from "yup";
export const initialValuesAction = {
  reviewofPrevious: null,
};
export const formValidationAction = Yup.object().shape({
  reviewofPrevious: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.reviewofPrevious);
  return {
    reviewofPrevious: values.reviewofPrevious,
  };
};
const SearchForm = () => {
  return (
    <>
      <FormProvider
        formId="behavior-form-search"
        initialValues={initialValuesAction}
        onSubmit={(values) => handleSubmitAction(values)}
      >
        <Form >
          <div className=" flex flex-row items-center px-4 py-3 gap-3">
            <FormField name="reviewofPrevious" component={AppSearchInput} />
            <AppButton
              content={<Add size={20} />}
              variant="bordered"
              size=""
              className="p-1.5"
              color="primary"
            />
          </div>
        </Form>
      </FormProvider>
    </>
  );
};
export default SearchForm;