import { AppTable } from "@hrbox/uikit/components";
import { GeneralMock } from "@hrbox/modules/job-gradings/app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalType, ModalSize } from "@hrbox/core/providers";
import GeneralModal from "../../modals/GeneralModal";
import type { ColumnConfig } from "@hrbox/uikit/components";

const columns: ColumnConfig[] = [
  { key: "NO", label: "No", width: 80, align: "center" },

  { key: "ofpoint", label: "of point", width: 80, align: "center" },

  { key: "uptopoints", label: "up to point", width: 80, align: "center" },

  {
    key: "Grade",
    label: "Grade",
    width: 110,
    align: "center",
    render: (_, row: any) => (
      <span
        className="px-2 py-0.5 rounded text-xs font-semibold text-white"
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
      "general-view",
      <GeneralModal />,
      {
        data:row,
        isForm:true,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "general-view",
        },
      },
      ModalSize["3XL"]
    );
  };

  return (
    <AppTable data={GeneralMock} columns={columns} onRowClick={(row)=>openViewModal(row)} />
  );
};

export default General;
