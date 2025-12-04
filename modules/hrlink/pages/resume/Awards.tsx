import { Edit, Trash } from "iconsax-reactjs";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { AppButton, AppPagination } from "@hrbox/uikit/components";
import { CupStarIcon } from "@hrbox/uikit/icons/CupStarIcon";
import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";
import { AwardModal } from "@hrbox/modules/hrlink/modals/AwardModal";
import {
  useFetchAwardsQuery,
  useDeleteAwardMutation,
} from "@hrbox/modules/hrlink/apis";
import { useState } from "react";
import { ModalSize } from "@hrbox/core/providers";
import { ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks/useModal";
import DeleteConfirmModal from '@hrbox/core/components/DeleteConfirmModal';

const MOCK_RESPONSE = {
  data: {
    ViewList: [
      { Id: 13998, Title: "new record", Description: "test", Date: 1399, Place: "-" },
      { Id: 14006, Title: "تستی", Description: "توضیحات", Date: 1400, Place: "-" },
      { Id: 14019, Title: "ش", Description: "description", Date: 1400, Place: "-" },
      { Id: 14020, Title: "ش", Description: "description", Date: 1400, Place: "-نسیم شهر" },
      { Id: 14021, Title: "ش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14022, Title: "ش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14023, Title: "جدیدش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14024, Title: "تست جدید", Description: "description", Date: 1400, Place: "ایران-آذرشهر" },
      { Id: 14025, Title: "ش", Description: "description", Date: 1400, Place: "-" },
      { Id: 14026, Title: "ش", Description: "description", Date: 1400, Place: "-" },
    ],
    LastPage: 2,
    Page: 0,
    PageSize: 10,
  },
  msg: null,
  IsSucces: true,
};

const Awards = () => {
  const { data: responseData, isLoading, isError } = useFetchAwardsQuery({
    page: 0,
    pageSize: 10,
  });

  const [deleteAward] = useDeleteAwardMutation();

  // Track which award is currently being deleted
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const response = responseData || MOCK_RESPONSE;
  const awards = response.data.ViewList;
  const pagination = {
    currentPage: (response.data.Page ?? 0) + 1,
    totalPages: response.data.LastPage ?? 1,
  };

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    awardId: number | null;
    awardName: string;
  }>({
    isOpen: false,
    awardId: null,
    awardName: '',
  });

  const openDeleteModal = (id: number, name: string) => {
    setDeleteModal({ isOpen: true, awardId: id, awardName: name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, awardId: null, awardName: '' });
  };

  const handleDelete = async () => {
    const id = deleteModal.awardId;
    if (!id) return;

    setDeletingIds((prev) => new Set(prev).add(id));

    try {
      await deleteAward(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("حذف با خطا مواجه شد");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  //edit awards modal
  const modal = useModal();
  const [isOpen] = useState()
  const handleEdit = (award: any) => {
    modal.open(
      ModalType.EDIT,
      "edit-award",
      <AwardModal
        award={award}
        onSuccess={() => {
          modal.close(); // optional: close after success
          // RTK Query will auto-refetch thanks to tags
        }}
      />,
      {
        title: "Edit Award",
        isForm: true,
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "award-form",
        },

        onCancel: () => modal.close("edit-award"),
      },
      ModalSize.MD
    );
  };

  const isDeleting = (id: number) => deletingIds.has(id);

  // if (isLoading) return <div className="p-8 text-center">Loading awards...</div>;
  // if (isError) return <div className="p-8 text-center text-red-600">Error loading awards</div>;

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {/* Awards List */}
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-4">
            {awards.map((award) => (
              <Card
                key={award.Id}
                className="rounded-2xl shadow-theme-sm p-5 bg-white flex flex-col gap-3 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="border-b border-neutral-100 pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CupStarIcon color="#04070e" size={20} />
                      <h3 className="text-lg font-bold text-secondary-1000">
                        {award.Title}
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <AppButton
                        isIconOnly
                        color="white"
                        size="md"
                        radius="sm"
                        content={<Edit size="16" className="text-secondary-700" />}
                        onPress={() => handleEdit(award)}
                      />

                      <AppButton
                        isIconOnly
                        color="white"
                        size="md"
                        radius="sm"
                        isDisabled={isDeleting(award.Id)}
                        content={
                          isDeleting(award.Id) ? (
                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash size="16" className="text-red-600" />
                          )
                        }
                        onPress={() => handleDelete(award.Id)}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="text-sm space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-secondary-900">
                    <div>
                      <span className="font-light text-secondary-600">Title: </span>
                      <span className="font-medium">{award.Title}</span>
                    </div>
                    <div>
                      <span className="font-light text-secondary-600">Year: </span>
                      <span className="font-medium">{award.Date}</span>
                    </div>
                  </div>

                  {award.Place && award.Place !== "-" && (
                    <div>
                      <span className="font-light text-secondary-600">Location: </span>
                      <span className="font-medium">
                        {award.Place.replace(/^[-–—]\s*/, "")}
                      </span>
                    </div>
                  )}

                  {award.Description && award.Description.trim() && award.Description !== "description" && (
                    <div>
                      <span className="font-light text-secondary-600">Description: </span>
                      <p className="font-medium text-secondary-800 mt-1">
                        {award.Description}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <AppPagination
              meta={{
                page: pagination.currentPage,
                totalPages: pagination.totalPages,
              }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Awards;