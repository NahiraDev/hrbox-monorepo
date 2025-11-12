import { Form } from "@heroui/react";
import { AppAutoComplete, AppInput } from "@hrbox/uikit/components";
import { FormField } from "@hrbox/UIKit/components/FormField";

const AddPermisionForm = () => {
  return (
    <>
      <Form className="gap-6">
        <div className="flex flex-row w-full gap-x-9 justify-between ">
          <div className="w-full">
            <FormField name="title" label="From Time" type="text" />
          </div>
          <div className="w-full">
            <FormField name="title" label="To Time" type="text" />
          </div>
        </div>{" "}
        <div className="flex flex-row w-full justify-between gap-x-9 ">
          <div className="w-[48%]">
            <FormField
              name="title"
              label="Choose Type"
              component={AppAutoComplete}
              data={[
                { id: 1, name: "فناوری اطلاعات" },
                { id: 2, name: "منابع انسانی" },
                { id: 3, name: "مالی" },
              ]}
              displayKey="name"
              valueKey="id"
            />
            {/* <AppAutoComplete
              props={{
                type: 'text',
                label: 'Choose Type',
                name: 'title',
                size: 'md',
                variant:"bordered",
                className: '!w-ful ',
              }}
            /> */}
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddPermisionForm;
