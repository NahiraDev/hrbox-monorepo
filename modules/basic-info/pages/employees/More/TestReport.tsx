import { testReport } from "@module/basic-info/app/mock";
import { ArrowDown, DollarCircle, Status, TickSquare, User } from "iconsax-reactjs";
import { Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import { TestReportModal } from "@hrbox/modules/basic-info/modals/TestReportModal";
import { useModal } from "@hrbox/core/hooks";

import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";

const TestReport = () => {
  const { openModal } = useModalContext();

  const modal = useModal();
  const handleOpenTestReportModal = () => {
    modal.open(
      ModalType.VIEW,
      "Test Result",
      <TestReportModal />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          // initialValues: initialValuesHealth,
          // validationSchema: formValidationHealth,
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
        <div className="p-3">
          <div className="flex items-center gap-1 py-3">
            <TickSquare size="24" />
            <span className="text-xl text-semibold text-secondary-1000">Test Report</span>
          </div>
          {/*todo height*/}
          <div className="grid grid-cols-4 gap-3">
            {testReport.map((worker, index) => (
              <Card
                isPressable
                onPress={handleOpenTestReportModal}
                key={index}
                className="p-3 flex flex-col gap-2  shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User
                      className="text-white bg-primary-400 rounded-lg p-2.5"
                      size="50"
                    />
                    <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-secondary-1000">
                      {worker.titleJob}
                    </span>
                      <AppButton
                        className="bg-[#DCF0F94]/40 border border-[#DCF0F9] py-0.5 px-1.5 text-[10px] text-primary-700"
                        size="xs"
                        radius="lg"
                        onPress={() => handleOpenTestReportModal}
                        content={<span>{worker.job}</span>}
                      />
                    </div>
                  </div>
                  <AppButton
                    className="bg-[#DCF0F94]/40 "
                    size="xs"
                    content={<ArrowDown size={16} />}
                  />
                </div>
                <div className="flex flex-col">
                <div className="flex items-center justify-between py-1.5 px-2">
                  <div className="flex  gap-1.5">
                    <User size="16" />
                    <span className="text-xs text-secondary-1000">
                      Full Name
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-secondary-1000 font-semibold">
                      {worker.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between  py-1.5 px-2">
                  <div className="flex  gap-1.5">
                    <DollarCircle size="16" />
                    <span className="text-xs text-secondary-900">Price</span>
                  </div>
                  <div>
                    <span className="text-xs text-secondary-900 font-semibold">
                      {worker.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2">
                  <div className="flex gap-1.5">
                    <Status color="green" size="16" />
                    <span className="text-xs text-success-400">Status</span>
                  </div>
                  <div>
                    <span className="text-success-400 text-xs font-semibold">
                      {worker.status}
                    </span>
                  </div>
                </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default TestReport;
