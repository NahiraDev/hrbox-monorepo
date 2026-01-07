import { AppTable } from "@hrbox/uikit/components";
import { GeneralMock } from "@hrbox/modules/job-gradings/app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalType, ModalSize } from "@hrbox/core/providers";
import GeneralModal from "../../modals/GeneralModal";
import type { ColumnConfig } from "@hrbox/uikit/components";
import {Hierarchy3, Ranking} from "iconsax-reactjs";
import {useTranslation} from "react-i18next";

    const columns: ColumnConfig[] = [
      { key: "id", label: "No",  align: "center", cellClassName: "text-center", },

      { key: "ofpoint", label: "of point",  align: "center" ,cellClassName: "text-center", },

      { key: "uptopoints", label: "up to point",  align: "center" , cellClassName: "text-center", },

      {
        key: "Grade",
        label: "Grade",

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

      { key: "Grouping", label: "Grouping",  },

      { key: "Description", label: "Description",  },
    ];

const General = () => {
  const modal = useModal();
    const { t } = useTranslation();
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
    const handleEditClick = (row:any) => {
        modal.open(
            ModalType.EDIT,
            "face-allocation-form",
            <GeneralModal/>,
            {
                data:row,
                isForm: true,
                title:t("edit-face-recognition-assignment"),
                submitLabel: t("submit"),
                cancelLabel: t("cancel"),
                icon:<Hierarchy3 size={18} />,
                formConfig: {
                    formId: "general-form"
                }
            },
            ModalSize["3XL"]
        );
    };
  return (
    <AppTable data={GeneralMock}
              onDelete={()=>console.log('deleting')}
              onEdit={(row)=>handleEditClick(row)} columns={columns} onRowClick={(row)=>openViewModal(row)}  />
  );
};

export default General;
