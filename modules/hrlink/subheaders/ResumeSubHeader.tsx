import {
    AppButton,
    AppPageTitle,
    AppSearchInput,
} from "@hrbox/uikit/components";
import {
    Add,
    Edit,
    ArrowLeft2,
    ArrowRight2,
    Personalcard,
    ReceiveSquare,
} from "iconsax-reactjs";
import {useDownloadResumeQuery} from "@hrbox/modules/hrlink/apis";
import { GeneralInformationModal } from "../modals/GeneralInformationModal";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";

const ResumeSubHeader = (props: any) => {

    const {data: downloadResume} = useDownloadResumeQuery()

    const modal = useModal();
    const handleGeneralInfoEdit = () => {
        modal.open(
        ModalType.EDIT,
        "face-allocation",
            <GeneralInformationModal/>,
        {
            isForm: true,
            submitLabel: "Submit Again",
            cancelLabel: "Cancel",
            formConfig: {
            formId: "face-form",
            },
        },
        ModalSize.LG
        );
    }

    return (
        <div className="flex justify-between">
            <AppPageTitle
                title="resume subheaders"
                icon={<Personalcard size={24} color="white"/>}
            />
            <div className="flex gap-2">
                <AppButton
                    color="default"
                    size="md"
                    radius="sm"
                    startContent={<Edit className="text-secondary-1000" size="16" />}
                    content={
                    <span className="text-secondary-1000 font-semibold text-base">
                      Edit
                    </span>
                    }
                    onPress={handleGeneralInfoEdit}
                /> 
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="sm"
                    content={<ArrowLeft2 className="text-secondary-1000" size="24"/>}
                />
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="sm"
                    content={<ArrowRight2 className="text-secondary-1000" size="24"/>}
                />
                <AppSearchInput onSearch={props.onSearch}/>
                <AppButton
                    color="default"
                    size="md"
                    radius="sm"
                    onPress={() => downloadResume}
                    startContent={
                        <ReceiveSquare className="text-secondary-1000" size="16"/>
                    }
                    content={
                        <span className="text-secondary-1000 font-semibold text-base">
              Download Resume
            </span>
                    }
                />
            </div>
        </div>
    );
};

export default ResumeSubHeader;
