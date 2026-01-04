import { AppTable } from "@hrbox/uikit/components";
import { GeneralMock } from "@hrbox/modules/job-gradings/app/mock";
import GeneralModal from "../../modals/GeneralModal";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import type { ColumnConfig } from "@hrbox/uikit/components";

const gradeColorMap: Record<string, string> = {
  "Grade A": "bg-green-500 text-white",
  "Grade B": "bg-blue-500 text-white",
  "Grade C": "bg-orange-500 text-white",
  "Grade D": "bg-red-500 text-white",
};

const columns: ColumnConfig[] = [
  { key: "NO", label: "No" },
  { key: "Index_title", label: "Index title" },
  { key: "Grouping", label: "Grouping" },
  {
    key: "Grade",
    label: "Grade",
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          gradeColorMap[value] ?? "bg-gray-300 text-black"
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: "Creation_data", label: "Creation date" },
];

const General = () => {
  const modal = useModal();

  const openViewModal = () => {
    modal.open(
      ModalType.VIEW,
      "general-view",
      <GeneralModal />,
      {},
      ModalSize["3XL"]
    );
  };

  return (
    <div className="w-full h-full">
      <AppTable
        data={GeneralMock}
        columns={columns}
        onRowClick={openViewModal}
        hasPagination
      />
    </div>
  );
};

export default General;
