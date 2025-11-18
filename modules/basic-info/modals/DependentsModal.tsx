import {
  AppButton,
  AppInput,
  AppModal,
  AppTextArea,
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";

export const DependentsModal = () => {
  const { openModal } = useModalContext();

  return (
    // <AppModal icon={<UserSquare color="white" />} size="3xl" title="Dependents">
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                className: " border border-[#DCF0F9]",
                label: "First Name",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
            <AppInput
              props={{
                className: " border border-[#DCF0F9]",
                label: "Last Name",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
            <AppInput
              props={{
                className: " border border-[#DCF0F9]",
                label: "National ID",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
            <AppInput
              props={{
                className: " border border-[#DCF0F9]",
                label: "Education",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
            <AppInput
              props={{
                className: " border border-[#DCF0F9]",
                label: "Mobile",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
          </div>
          <div>
            <AppTextArea
              props={{
                className: " border border-[#DCF0F9]",
                label: "Descriptions and Achievements*",
                size: "lg",
                color: "primary",
                radius: "lg",
              }}
            />
          </div>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: "xs",
            radius: "sm",
            variant: "light",
            onPress: () => openModal("delete", undefined),
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
    // </AppModal>
  );
};
