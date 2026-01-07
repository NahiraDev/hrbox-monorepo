import { AppTable } from "@hrbox/uikit/components";
import {
  Allocatio,
  getAllAllocations,
} from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import ShiftAllocationModal from "@hrbox/modules/attendance/modals/ShiftAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

const ShiftAllocation = () => {
  const [data, setData] = useState(getAllAllocations());
  const modal = useModal();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalItems = getAllAllocations().length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = getAllAllocations().slice(startIndex, endIndex);
  const meta = {
    page: currentPage,
    totalPages,
    pageSize,
    total: totalItems,
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const refreshData = () => {
    setData(getAllAllocations());
  };
  const handleRowClick = (row: any) => {
    modal.open(
      ModalType.VIEW,
      "shift-allocation",
      <ShiftAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("shift-allocation"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "shift-allocation",
        },
      },
      ModalSize["2XL"]
    );
  };
  const handleEditClick = (row: any) => {
    modal.open(
      ModalType.EDIT,
      "shift-allocation",
      <ShiftAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("edit-shift-allocation"),
        submitLabel: t("submit"),
        cancelLabel: t("cancel"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "shift-allocation",
          onSubmitAsync: async (values: any) => {
            console.log("shift allocation edit");
          }
        },
      },
      ModalSize["2XL"]
    );
  };

  return (
    <>
      <div className="h-full w-full flex flex-col  ">
        <AppTable
          data={data}
          onRowClick={(row) => handleRowClick(row)}
          variant="bordered"
          hasPagination={true}
          pageSize={pageSize}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onEdit={(row) => handleEditClick(row)}
          onDelete={()=>console.log("delete")}
        />
      </div>
    </>
  );
};
export default ShiftAllocation;
