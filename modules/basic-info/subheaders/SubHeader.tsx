import { AppButton } from "@hrbox/uikit/components";
import { Add, MessageEdit } from "iconsax-reactjs";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";

const SubHeader = () => {
  const { openModal } = useModalContext();
  return (
    <div>
      <AppButton
        props={{
          size: "xs",
          radius: "sm",
          color: "white",
          variant: "solid",
          isIconOnly: true,
          onPress: () => openModal("edit", undefined),
          className: "bg-white border-1 border-primary",
          content: <MessageEdit className="text-secondary-900" size="20" />,
        }}
      />
      <AppButton
        props={{
          size: "xs",
          radius: "sm",
          color: "white",
          variant: "solid",
          isIconOnly: true,
          onPress: () => openModal("edit", undefined),
          className: "bg-white border-1 border-primary",
          content: <Add className="text-secondary-900" size="20" />,
        }}
      />
    </div>
  );
};

export default SubHeader;
