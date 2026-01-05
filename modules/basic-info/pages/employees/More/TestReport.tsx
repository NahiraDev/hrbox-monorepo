import { testReport } from "@module/basic-info/app/mock";
import { Add, ArrowDown, DollarCircle, Status, Teacher, TickSquare, User, UserSearch } from "iconsax-reactjs";
import { Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import { TestReportModal } from "@hrbox/modules/basic-info/modals/TestReportModal";
import { useModal } from "@hrbox/core/hooks";

import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import React, { useState } from "react";

const TestReport = () => {
  const { openModal } = useModalContext();

  const modal = useModal();
  const handleOpenTestReportModalShow = () => {
    modal.open(
      ModalType.VIEW,
      "Test Result",
      <TestReportModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <TickSquare size={22}/> Test Result </div>,
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
  // const handleOpenTestReportModal = () => {
  //   modal.open(
  //     ModalType.CREATE,
  //     "Test Result",
  //     <TestReportModal />,
  //     {
  //       isForm: true,
  //       title:<div className="flex items-center gap-2"> <TickSquare size={22}/>Add new Test</div>,
  //       submitLabel: "Submit",
  //       cancelLabel: "Cancel",
  //       formConfig: {
  //         // initialValues: initialValuesHealth,
  //         // validationSchema: formValidationHealth,
  //         formId: "award-form",
  //         enableCache: true,
  //         clearCacheOnSubmit: true,
  //         onSubmitAsync: async (values: any) => {
  //           handleSubmitAward(values);
  //           modal.close(ModalType.CREATE, "award-form");
  //         },
  //       },
  //     },
  //     ModalSize.XL,
  //   );
  // };

  const cardContainerClass = `grid grid-cols-4 gap-3  overflow-y-scroll  max-h-[calc(62.5vh)]   pr-3  
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <BasicInfoLayout
      content={
        <div className="p-3">
          <div className="flex items-center justify-between px-3 pt-6 pb-3">
            <div className="flex items-center gap-1 ">
              <TickSquare size="24" />
              <span className="text-xl text-semibold text-secondary-1000">Test Report</span>
            </div>
            {/*<AppButton*/}
            {/*  size="xs"*/}
            {/*  radius="sm"*/}
            {/*  color="white"*/}
            {/*  variant="solid"*/}
            {/*  onPress={handleOpenTestReportModal}*/}
            {/*  isIconOnly={true}*/}
            {/*  className="bg-white border-1 border-primary p-1 mr-2"*/}
            {/*  content={<Add className="text-secondary-900" size={19} />}*/}
            {/*/>*/}
          </div>
          <div className={cardContainerClass}>
            {testReport.map((worker, index) => (
              <Card
                isPressable
                onPress={handleOpenTestReportModalShow}
                onClick={() => setActiveIndex(index)}
                key={index}
                className={`p-3 flex flex-col gap-2  shadow-sm  hover:cursor-pointer
                 transition-all duration-200
                  hover:!bg-[#D6F2FF]
                 ${activeIndex === index
                  ? "bg-[#D6F2FF] border border-primary-400"
                  : "border border-transparent"
                }
                `}
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
