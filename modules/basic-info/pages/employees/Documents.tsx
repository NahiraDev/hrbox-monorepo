import { Avatar, Card } from "@heroui/react";
import { identityCard } from "@module/basic-info/app/mock";
import { AppButton } from "@hrbox/uikit/components";
import {
  ArrowRotateLeft,
  Calendar, DocumentUpload,
  Status,
  Trash,
  User
} from "iconsax-reactjs";
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";
import { useState } from "react";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import DocumentsModal from "../../modals/DocumentsModal";
import {
  formValidationRelative,
  initialValuesRelative,
} from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";
import { useTranslation } from "react-i18next";

interface Document {
  name: string;
  Publication: string;
  Edit: string;
  UploadStatus: string;
  avatarSrc?: string;
}

const Documents = () => {
  const modal = useModal();
  const { t } = useTranslation();
  const [documentsList, setDocumentsList] = useState<Document[]>(identityCard);
  const handleDeleteClick = (index: number) => {
    // modals.open(
    //     ModalType.DELETE,
    //     "",
    //     < DocumentsModal />,
    //     {
    //         isForm: false,
    //         title:t("Do you want to remove it?"),
    //         submitLabel: "ذخیره",
    //         cancelLabel: "لغو",
    //     },
    //     ModalSize.XL,
    // );
  };

  const handleDeleteConfirm = (index: number) => {
    setDocumentsList((prev) => {
      const newDocuments = [...prev];
      newDocuments.splice(index, 1);
      return newDocuments;
    });
  };

  const handleImageSubmit = (index: number, imageSrc: string) => {
    setDocumentsList((prev) => {
      const newDocuments = [...prev];
      newDocuments[index] = { ...newDocuments[index], avatarSrc: imageSrc };
      return newDocuments;
    });
  };

  const cardContainerClass = `grid grid-cols-4 gap-4  overflow-y-scroll  max-h-[calc(66.5vh)] my-6 mx-2.5 pr-4.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;

  const handleOpenDocuments = () => {
    modal.open(
      ModalType.CREATE,
      " Documents",
      <DocumentsModal />,
      {
        isForm: true,
        title: " ",
        submitLabel: <div className="flex items-center gap-2"> <DocumentUpload size={22}/> Upload File</div>,
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
      ModalSize.LG,
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);


  return (
    <BasicInfoLayout
      content={
        <div className={cardContainerClass}>
          {documentsList.map((user, index) => (
            <Card
              isPressable
              onPress={() => setActiveIndex(index)}
              onClick={handleOpenDocuments}
              key={index}
              className={`
              p-3 w-full shadow-sm  hover:cursor-pointer
                transition-all duration-200
                hover:!bg-[#D6F2FF]
                ${activeIndex === index
                ? "bg-[#D6F2FF] border border-primary-400"
                : "border border-transparent"
              }
              `}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                        <Avatar
                          radius="sm"
                          color="primary"
                          size="lg"
                          src={user.avatarSrc || undefined}
                        />
                    <span>Identity Card</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <AppButton
                        size="xs"
                        radius="sm"
                        variant="light"
                        isIconOnly={true}
                        onPress={() => handleDeleteClick(index)}
                        content={
                          <Trash className="text-secondary-1000 group-hover:text-white" size={16} />
                        }
                        className="p-2 hover:!bg-red-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <AppButton
                        size="xs"
                        radius="sm"
                        variant="light"
                        isIconOnly={true}
                        onPress={handleOpenDocuments}
                        content={
                          <ArrowRotateLeft className="text-secondary-1000 group-hover:text-white" size={16} />
                        }
                        className="p-2 hover:!bg-primary transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 items-center w-full border border-[#DCF0F9]/40 rounded-lg py-1.5 px-2">
                  <User className="w-4 h-4" />
                  <span className="text-xs text-secondary-1000">{user.name}</span>
                </div>
                <div className="flex gap-1.5 items-center w-full border border-[#DCF0F9]/40 rounded-lg py-1.5 px-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs text-secondary-1000">{user.Publication}</span>
                </div>
                <div className="flex gap-1.5 items-center w-full border border-[#DCF0F9]/40 rounded-lg py-1.5 px-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs text-secondary-1000">{user.Edit}</span>
                </div>
                <div className="flex gap-1.5 items-center w-full border border-[#DCF0F9]/40 rounded-lg py-1.5 px-2">
                  <Status className="w-4 h-4" />
                  <span className="text-xs text-secondary-1000">{user.UploadStatus}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }
    />
  );
};

export default Documents;
