import { testReport } from "@module/basic-info/app/mock";
import {
  TickSquare,
  User,
  ArrowDown,
  DollarCircle,
  Status,
} from "iconsax-reactjs";
import { Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import { TestReportModal } from "@hrbox/modules/basic-info/modals/TestReportModal";
import { useModal } from "@hrbox/core/hooks";
import {
  formValidationHealth,
  initialValuesHealth
} from "@hrbox-monorepo/modules/basic-info/forms/OnDutyHealthRecordsForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";

const TestReport = () => {
    const {openModal} = useModalContext();

    const modal = useModal()
    const handleOpenTestReportModal = () => {
        modal.open(
            ModalType.CREATE,
            "Test Result",
            < TestReportModal/>,
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

    return (
        <BasicInfoLayout
            content={
                <div className="p-3">
                    <div className="flex items-center gap-1 p-3 text-xl text-secondary-900 font-semibold">
                        <TickSquare size="24"/>
                        <span>Test Report</span>
                    </div>
                    {/*todo height*/}
                    <div className="grid grid-cols-4 gap-3 overflow-y-scroll max-h-[39vh] p-2">
                        {testReport.map((worker, index) => (
                            <Card
                                key={index}
                                className="p-3 flex flex-col gap-2 shadow-light-tight-1"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <User
                                        className="bg-primary text-white rounded-4 p-2.5"
                                        size="50"
                                    />
                                    <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-secondary-1000">
                      {worker.titleJob}
                    </span>
                                        <AppButton
                                            className=
                                                "bg-[#DCF0F94]/40 border border-[#DCF0F9] p-0.5  text-[10px]"
                                            size="xs"
                                            radius="lg"
                                            onPress={() => handleOpenTestReportModal}
                                            content={<span>{worker.job}</span>}
                                        />
                                    </div>
                                    <AppButton
                                        className="bg-[#DCF0F94]/40 "
                                        size="xs"
                                        onPress={}
                                        content={<ArrowDown/>}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-1.5">
                                    <div className="flex  gap-1">
                                        <User size="16"/>
                                        <span className="text-xs text-secondary-900">
                      Full Name
                    </span>
                                    </div>
                                    <div>
                    <span className="text-xs text-secondary-900 font-semibold">
                      {worker.name}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-1.5">
                                    <div className="flex  gap-1">
                                        <DollarCircle size="16"/>
                                        <span className="text-xs text-secondary-900">Price</span>
                                    </div>
                                    <div>
                    <span className="text-xs text-secondary-900 font-semibold">
                      {worker.price}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-1.5">
                                    <div className="flex gap-1">
                                        <Status color="green" size="16"/>
                                        <span className="text-xs text-success-400">Status</span>
                                    </div>
                                    <div>
                    <span className="text-success-400 text-xs font-semibold">
                      {worker.status}
                    </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            }
        />
    )
}

export default TestReport;