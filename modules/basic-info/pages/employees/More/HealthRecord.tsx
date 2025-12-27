import { useState } from "react";
import { healthy } from "@module/basic-info/app/mock";
import { Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import {
  Add,
  Calendar,
  Drop,
  HeartAdd,
  HeartEdit,
  Hospital,
  NotificationFavorite,
} from "iconsax-reactjs";

import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import PreEmploymentHealthRecordsModals from "@hrbox/modules/basic-info/modals/PreEmploymentHealthRecordsModals";
import {
  ModalSize,
  ModalType,
  useModalContext,
} from "@hrbox/core/providers/ModalProvider";
import AddNewOnDutyHealthRecords from "@hrbox-monorepo/modules/basic-info/modals/OnDutyHealthRecords";
import OnDutyHealthRecords from "@hrbox/modules/basic-info/modals/OnDutyHealthRecords";
import { useModal } from "@hrbox/core/hooks";
import {
  formValidationHealth,
  initialValuesHealth,
} from "@hrbox-monorepo/modules/basic-info/forms/OnDutyHealthRecordsForm";
import {
  formValidationHealthDuty,
  initialValuesHealthDuty,
} from "@hrbox/modules/basic-info/forms/PreEmploymentHealthRecordsForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";

const HealthRecord = () => {
  const { openModal } = useModalContext();

  const [preEmploymentRecords, setPreEmploymentRecords] = useState([]);

  const handlePreEmploymentSubmit = (newRecord: any) => {
    setPreEmploymentRecords((prev) => [...prev, newRecord]);
  };

  const openPreEmploymentModal = () => {
    openModal(
      "edit",
      "",
      <PreEmploymentHealthRecordsModals
        {...{ onSubmit: handlePreEmploymentSubmit }}
      />,
      undefined,
      "3xl",
      "Add New Pre-Employment Health Records",
      <NotificationFavorite className="text-white" />,
    );
  };

  const modal = useModal();
  const handleOpenAddNewOnDutyHealthRecords = () => {
    modal.open(
      ModalType.CREATE,
      " Edit Pre-Employment Health Records",
      <AddNewOnDutyHealthRecords />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesHealth,
          validationSchema: formValidationHealth,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.XL,
    );
  };
  const handleOpenOnDutyHealthRecords = () => {
    modal.open(
      ModalType.CREATE,
      " Add New On-Duty Health Records",
      <OnDutyHealthRecords />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesHealthDuty,
          validationSchema: formValidationHealthDuty,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.XL,
    );
  };
  // const handleOpenAddNewOnDutyHealthRecords = () => {
  //     modals.open(
  //       ModalType.CREATE,
  //       " Edit Pre-Employment Health Records",
  //       < AddNewOnDutyHealthRecords />,
  //       {
  //         isForm: true,
  //         title: "افزودن ",
  //         submitLabel: "ذخیره",
  //         cancelLabel: "لغو",
  //         formConfig: {
  //           initialValues: initialValuesHealthDuty,
  //           validationSchema: formValidationHealthDuty,
  //           formId: "award-form",
  //           enableCache: true,
  //           clearCacheOnSubmit: true,
  //           onSubmitAsync: async (values: any) => {
  //             handleSubmitAward(values);
  //             modals.close(ModalType.CREATE, "award-form");
  //           },
  //         },
  //       },
  //       ModalSize.XL,
  //     );
  //   };

  return (
    <BasicInfoLayout
      content={
        <div className="p-4 grid grid-cols-2 gap-15">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <NotificationFavorite size="24" />
                <span className="text-xl font-semibold text-secondary-900">
                  Pre-Employment Health Records ({preEmploymentRecords.length})
                </span>
              </div>
              <AppButton
                isIconOnly={true}
                color="white"
                className="border border-primary"
                onPress={openPreEmploymentModal}
                content={<Add />}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[...healthy, ...preEmploymentRecords].map(
                (worker: any, index) => (
                  <Card
                    key={worker.id || index}
                    className="p-3 flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-secondary-900 font-semibold">
                        {worker.title}
                      </span>
                      <AppButton
                        className="bg-[#DCF0F94]/40 border border-[#DCF0F9] h-[20px] max-w-[107px]"
                        size="xs"
                        radius="lg"
                        onPress={() => handleOpenAddNewOnDutyHealthRecords}
                        content={
                          <div className="flex items-center gap-0.5">
                            <HeartAdd color="#05587A" size="11" />
                            <span className="!text-[10px] text-primary-700">
                              {worker.titleButton}
                            </span>
                          </div>
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                      <div className="flex items-center gap-1 text-xs text-secondary-900">
                        <Drop color="red" size="12" variant="Bold" />
                        <span>Type</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-900">
                          {worker.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                      <div className="flex items-center gap-1 text-xs text-secondary-900">
                        <Calendar size="12" />
                        <span>Date</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-900">
                          {worker.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-1.5 border border-[#DCF0F9]/40 rounded-4">
                      <div className="flex items-center gap-1 text-xs text-secondary-900">
                        <Hospital size="12" />
                        <span>Does he/she require treatment?</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-900">
                          {worker.question}
                        </span>
                      </div>
                    </div>
                  </Card>
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <HeartEdit size="24" />
                <span className="text-xl font-semibold text-secondary-900">
                  On-Duty Health Records
                </span>
              </div>
              <AppButton
                isIconOnly={true}
                color="white"
                className="border border-primary"
                onPress={() => {
                  handleOpenOnDutyHealthRecords;
                }}
                content={<Add />}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {healthy.map((worker, index) => (
                <Card key={index} className="p-3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-secondary-900 font-semibold">
                      {worker.title}
                    </span>
                    <AppButton
                      className="bg-[#DCF0F94]/40 border border-[#DCF0F9] h-[20px] max-w-[107px]"
                      size="xs"
                      radius="lg"
                      onPress={() => handleOpenOnDutyHealthRecords}
                      content={
                        <div className="flex items-center gap-0.5">
                          <HeartAdd color="#05587A" size="11" />
                          <span className="!text-[10px] text-primary-700">
                            {worker.titleButton}
                          </span>
                        </div>
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Drop color="red" size="12" variant="Bold" />
                      <span>Type</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">
                        {worker.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Calendar size="12" />
                      <span>Date</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">
                        {worker.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Hospital size="12" />
                      <span>Does he/she require treatment?</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">
                        {worker.question}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default HealthRecord;
