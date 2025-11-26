import {
    AppButton,
    AppPageTitle,
    AppSearchInput,
} from "@hrbox/uikit/components";
import {
    Add,
    ArrowLeft2,
    ArrowRight2,
    Personalcard,
    ReceiveSquare,
} from "iconsax-reactjs";
import {ModalSize, ModalType} from "@hrbox/core/providers";
import {useModal} from "@hrbox/core/hooks";
import {SkillModal} from "@hrbox/modules/hrlink/modals/SkillModal";

const SkillsSubHeader = (props: any) => {
    // const {data: downloadResume} = useDownloadResumeQuery()
    const modal = useModal()
    const handleOpenSkillModal = () => {
        modal.open(
            ModalType.CREATE,
            "skills-form",
            <SkillModal/>,
            {
                isForm: true,
                title: "افزودن ",
                submitLabel: "ذخیره",
                cancelLabel: "لغو",
            },
            ModalSize.XL,
        );
    };

    return (
        <div className="flex justify-between">
            <AppPageTitle
                title="resume subheaders"
                icon={<Personalcard size={24} color="white"/>}
            />
            <div className="flex gap-2">
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="lg"
                    content={<ArrowLeft2 className="text-secondary-1000" size="24"/>}
                />
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="lg"
                    content={<ArrowRight2 className="text-secondary-1000" size="24"/>}
                />
                <AppSearchInput onSearch={props.onSearch}/>
                <AppButton
                    color="default"
                    size="md"
                    radius="lg"
                    onPress={handleOpenSkillModal}
                    startContent={<Add className="text-secondary-1000" size="16"/>}
                    content={
                        <span className="text-secondary-1000 font-semibold text-base">
                      Add New One
                    </span>
                    }
                />
                <AppButton
                    color="default"
                    size="md"
                    radius="lg"
                    // onPress={() => downloadResume}
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

export default SkillsSubHeader;
