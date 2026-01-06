import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";
import { EntryExitData } from "@hrbox/modules/attendance/app/mock";
import { AppTable } from "@hrbox/uikit/components";
import UserLocationModal from "@hrbox/modules/attendance/modals/UserLocationModal";
import FaceIdModal from "../../modals/FaceIdModal";

const EntryExit = () => {
  const modal = useModal();
  const handlerRowClick = (row:any) => {
    modal.open(
      ModalType.CREATE,
      "entry-exit",
      row.Type2.props.children[2].props.children==="Location"?<FaceIdModal/>:<UserLocationModal/>,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig:{
          formId: "event-form",
        }
      },
      ModalSize.XL
    );
  };
  return (
    <>
      <div className="w-full h-full flex ">
        <AppTable data={EntryExitData} onRowClick={(row)=>handlerRowClick(row)} variant="bordered" />
      </div>
    </>
  );
};

export default EntryExit;
