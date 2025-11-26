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
import {useDownloadResumeQuery} from "@hrbox/modules/hrlink/apis";
import {AwardModal} from "@hrbox/modules/hrlink/modals/AwardModal";
import {ModalSize, ModalType} from "@hrbox/core/providers";
import {useModal} from "@hrbox/core/hooks";
import {
    formValidationAward,
    handleSubmitAward,
    initialValuesAward
} from "@hrbox/modules/hrlink/forms/AwardForm";

const AwardSubHeader = (props: any) => {
    const {data:downloadResume} = useDownloadResumeQuery()
    const modal = useModal()
    const handleOpenAwardModal = () => {
      modal.open(
        ModalType.CREATE,
        "award-form",
        <AwardModal />,
        {
          isForm: true,
          title: "افزودن ",
          submitLabel: "ذخیره",
          cancelLabel: "لغو",
          formConfig: {
            initialValues: initialValuesAward,
            validationSchema: formValidationAward,
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
        <div className="flex justify-between">
            <AppPageTitle
                title="resume subheaders"
                icon={<Personalcard size={24} color="white" />}
            />
            <div className="flex gap-2">
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="sm"
                    content={<ArrowLeft2 className="text-secondary-1000" size="24" />}
                />
                <AppButton
                    isIconOnly
                    color="default"
                    size="xs"
                    radius="sm"
                    content={<ArrowRight2 className="text-secondary-1000" size="24" />}
                />
                <AppSearchInput onSearch={props.onSearch} />
                <AppButton
                  color="default"
                  size="md"
                  radius="sm"
                  onPress={handleOpenAwardModal}
                  startContent={<Add className="text-secondary-1000" size="16" />}
                  content={
                    <span className="text-secondary-1000 font-semibold text-base">
                      Add New One
                    </span>
                  }
                />
                <AppButton
                    color="default"
                    size="md"
                    radius="sm"
                    onPress={()=>downloadResume}
                    startContent={
                        <ReceiveSquare className="text-secondary-1000" size="16" />
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

export default AwardSubHeader;
