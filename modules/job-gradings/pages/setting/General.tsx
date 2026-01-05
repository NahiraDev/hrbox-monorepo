import { AppTable } from "@hrbox/uikit/components";
import { GeneralMock } from "@hrbox/modules/job-gradings/app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalType, ModalSize } from "@hrbox/core/providers";
import GeneralModal from "../../modals/GeneralModal";
import type { ColumnConfig } from "@hrbox/uikit/components";
import {Ranking} from "iconsax-reactjs";

    const columns: ColumnConfig[] = [
      { key: "id", label: "No", width: 80, align: "center", cellClassName: "text-center", },

      { key: "ofpoint", label: "of point", width: 80, align: "center" ,cellClassName: "text-center", },

      { key: "uptopoints", label: "up to point", width: 80, align: "center" , cellClassName: "text-center", },

      {
        key: "Grade",
        label: "Grade",
        width: 120,
        align: "center",
          cellClassName: "text-center",
        render: (_, row: any) => (
          <span
            className="px-2 py-1   rounded-lg text-md font-semibold text-white"
            style={{ backgroundColor: row.gradeColor }}
          >
            {row.Grade}
          </span>
        ),
      },

      { key: "Grouping", label: "Grouping", width: 80 },

      { key: "Description", label: "Description", width: 100 },
    ];

const General = () => {
  const modal = useModal();
  const openViewModal = (row: any) => {
    modal.open(
      ModalType.VIEW,
      "general-form",
      <GeneralModal  />,
      {
        data:row,
        isForm:true,
        title:"Grade",
        icon:<Ranking/>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "general-form",
        },
      },
      ModalSize["3XL"]
    );
  };

  return (
    <AppTable data={GeneralMock} columns={columns} onRowClick={(row)=>openViewModal(row)}  />
  );
};

export default General;
