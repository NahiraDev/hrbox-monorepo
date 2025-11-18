import {
  AppButton,
  AppInput,
  AppModal,
  AppTextArea,
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete } from "@hrbox/uikit/components";

const AddNewCourses = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          {/*<FormField name={} component={AppAutoComplete}/>*/}
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: "xs",
            radius: "sm",
            variant: "light",
            onPress: () => "",
            content: <span>Cancle</span>,
            className:
              "text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200",
          }}
        />
        <AppButton
          props={{
            size: "xs",
            radius: "sm",
            variant: "light",
            onPress: () => console.log("a"),
            content: <span>Submit</span>,
            className:
              "bg-primary-panel text-white py-1.5 px-3 text-xl rounded-lg ",
          }}
        />
      </AppModal.Footer>
    </>
  );
};

export default AddNewCourses;
