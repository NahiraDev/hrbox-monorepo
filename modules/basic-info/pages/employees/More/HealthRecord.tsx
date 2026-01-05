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
  Edit
} from "iconsax-reactjs";

import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import PreEmploymentHealthRecordsModals from "@hrbox/modules/basic-info/modals/PreEmploymentHealthRecordsModals";
import {
  ModalSize,
  ModalType,
  useModalContext,
} from "@hrbox/core/providers/ModalProvider";
import OnDutyHealthRecords from "@hrbox/modules/basic-info/modals/OnDutyHealthRecords";
import { useModal } from "@hrbox/core/hooks";

import {
  formValidationHealthDuty,
  initialValuesHealthDuty,
} from "@hrbox/modules/basic-info/forms/PreEmploymentHealthRecordsForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import AddNewOnDutyHealthRecords from "@hrbox/modules/basic-info/modals/OnDutyHealthRecords";
  import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";

const HealthRecord = () => {
  const { openModal } = useModalContext();

  const [preEmploymentRecords, setPreEmploymentRecords] = useState([]);


  const modal = useModal();

  const  handleOpenAddNewOnDutyHealthRecords = () => {
    modal.open(
      ModalType.CREATE,
      " Documents",
      <PreEmploymentHealthRecordsModals />,
      {
        isForm: true,
        title: "Add New Pre-Employment Health Records ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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
  const  handleOpenAddNewOnDutyHealthRecordsShow = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <PreEmploymentHealthRecordsModals />,
      {
        isForm: true,
        title: "Pre-Employment Health Records ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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
  const  handleOpenAddNewOnDutyHealthRecordsEdit = () => {
    modal.open(
      ModalType.EDIT,
      " Documents",
      <PreEmploymentHealthRecordsModals />,
      {
        isForm: true,
        title: "Edit Pre-Employment Health Records ",
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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
  const  handleOpenOnDutyHealthRecords = () => {
    modal.open(
      ModalType.CREATE,
      " Documents",
      <AddNewOnDutyHealthRecords />,
      {
        isForm: true,
        title: "Add New On-Duty Health Records ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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
  const  handleOpenOnDutyHealthRecordsEdit = () => {
    modal.open(
      ModalType.EDIT,
      " Documents",
      <AddNewOnDutyHealthRecords />,
      {
        isForm: true,
        title: "Edit On-Duty Health Records ",
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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
  const  handleOpenOnDutyHealthRecordsShow = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <AddNewOnDutyHealthRecords />,
      {
        isForm: true,
        title: "On-Duty Health Records ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
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

  return (
    <BasicInfoLayout
      content={
        <div className="p-4 grid grid-cols-2 gap-15">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <NotificationFavorite size="24" />
                <span className="text-xl font-semibold text-secondary-1000">
                  Pre-Employment Health Records
                </span>
              </div>
              <div className="flex gap-1">
                <AppButton
                  size="xs"
                  radius="sm"
                  color="white"
                  variant="solid"
                  onPress={handleOpenAddNewOnDutyHealthRecordsEdit}
                  isIconOnly
                  className="bg-white border-1 border-primary p-1"
                  content={<Edit className="text-secondary-900" size={19} />}
                />
                <AppButton
                size="xs"
                radius="sm"
                color="white"
                variant="solid"
                onPress={handleOpenAddNewOnDutyHealthRecords}
                isIconOnly
                className="bg-white border-1 border-primary p-1"
                content={<Add className="text-secondary-900" size={19} />}
              />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[...healthy, ...preEmploymentRecords].map(
                (worker: any, index) => (
                  <Card
                    isPressable
                    onPress={handleOpenAddNewOnDutyHealthRecordsShow}
                    key={worker.id || index}
                    className="p-3 flex flex-col gap-2  shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm text-secondary-1000 font-semibold">
                        {worker.title}
                      </span>
                      <div className="flex items-center gap-0.5 bg-[#DCF0F9]/40 border border-[#DCF0F9] rounded-lg w-27 py-0.5 px-1.5">
                        <HeartAdd color="#05587A" size="10" />
                        <span className="!text-[10px] text-primary-700">
                          {worker.titleButton}
                        </span>
                      </div>
                    </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs text-secondary-900">
                        <Drop color="red" size="12" variant="Bold" />
                        <span>Type</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-900">
                          {worker.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Calendar size="12" />
                        <span className="text-xs text-secondary-1000">Date</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-1000">
                          {worker.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5 ">
                        <Hospital size="12" />
                        <span className="text-xs font-semibold text-secondary-1000">Does he/she require treatment?</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-1000">
                          {worker.question}
                        </span>
                      </div>
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
                <span className="text-xl font-semibold text-secondary-1000">
                  On-Duty Health Records
                </span>
              </div>
              <div className="flex gap-1">
                <AppButton
                  size="xs"
                  radius="sm"
                  color="white"
                  variant="solid"
                  onPress={handleOpenOnDutyHealthRecordsEdit}
                  isIconOnly
                  className="bg-white border-1 border-primary p-1"
                  content={<Edit className="text-secondary-900" size={19} />}
                />
                <AppButton
                  size="xs"
                  radius="sm"
                  color="white"
                  variant="solid"
                  onPress={handleOpenOnDutyHealthRecords}
                  isIconOnly
                  className="bg-white border-1 border-primary p-1"
                  content={<Add className="text-secondary-900" size={19} />}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {healthy.map((worker, index) => (
                <Card
                  isPressable
                  onPress={handleOpenOnDutyHealthRecordsShow}
                  className="p-3 flex flex-col gap-2  shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-1">
                      <span className="text-sm text-secondary-1000 font-semibold">
                        {worker.title}
                      </span>
                    <div className="flex items-center gap-0.5 bg-[#DCF0F9]/40 border border-[#DCF0F9] rounded-lg w-27 py-0.5 px-1.5">
                      <HeartAdd color="#05587A" size="10" />
                      <span className="!text-[10px] text-primary-700">
                          {worker.titleButton}
                        </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs text-secondary-900">
                        <Drop color="red" size="12" variant="Bold" />
                        <span>Type</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-900">
                          {worker.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Calendar size="12" />
                        <span className="text-xs text-secondary-1000">Date</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-1000">
                          {worker.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 px-2 py-1.5 border border-[#DCF0F9]/40 rounded-4 rounded-lg">
                      <div className="flex items-center gap-1.5 ">
                        <Hospital size="12" />
                        <span className="text-xs font-semibold text-secondary-1000">Does he/she require treatment?</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-secondary-1000">
                          {worker.question}
                        </span>
                      </div>
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
