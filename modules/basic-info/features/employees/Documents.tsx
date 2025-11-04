import { Avatar, Card } from '@heroui/react';
import { identityCard } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import { Trash, ArrowRotateLeft, User, Status, Calendar } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { useState } from 'react';
import { BasicInfoLayout } from '@module/basic-info/features/common';
import DocumentsModal from '../employees/modals/DocumentsModal';
import { useSelectableCard } from '../customHooks/useSelectableCard';

interface Document {
  name: string;
  Publication: string;
  Edit: string;
  UploadStatus: string;
  avatarSrc?: string;
}

const Documents = () => {
  const { openModal } = useModalContext();
  const [documentsList, setDocumentsList] = useState<Document[]>(identityCard);

  const { selectedCardIndex, handleCardClick } = useSelectableCard();

  const handleDeleteClick = (index: number) => {
    openModal(
      'delete',
      '',
      <AppDeleteModal
        onConfirm={() => handleDeleteConfirm(index)}
        onCancel={() => console.log('Cancelled')}
      />,
      undefined,
      'sm',
      'Do you want to remove it?',
      <Trash className="text-white" />
    );
  };

  const handleDeleteConfirm = (index: number) => {
    setDocumentsList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <BasicInfoLayout
      content={
        <div className="grid max-h-[550px] w-full grid-cols-4 gap-3 overflow-y-auto p-4">
          {documentsList.map((user, index) => (
            <Card
              key={index}
              isPressable
              onPress={() => openModal('custom', '', <DocumentsModal />, undefined, 'lg')}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(index);
              }}
              className={`cursor-pointer border p-4 transition-all duration-200 ease-in-out
                ${
                selectedCardIndex === index
                  ? 'bg-primary-50 border-primary-400'
                  : 'bg-white border-transparent'
              }
                hover:border-primary-400 hover:shadow-md
              `}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="mb-2 flex items-center gap-3">
                    <Avatar
                      radius="sm"
                      size="lg"
                      color="primary"
                      className="text-white"
                      src={user.avatarSrc || undefined}
                    />
                    <span className="text-secondary-1000 !font-semibold">Identity Card</span>
                  </div>
                  <div className="flex gap-1">
                    <AppButton
                      props={{
                        size: 'sm',
                        radius: 'sm',
                        variant: 'light',
                        isIconOnly: true,
                        onPress: () => handleDeleteClick(index),
                        content: (
                          <Trash
                            className="text-secondary-1000 group-hover:text-white"
                            size={16}
                          />
                        ),
                        className:
                          'p-1 hover:!bg-red-500 transition-all duration-200 border border-transparent hover:border-red-500',
                      }}
                    />

                    <AppButton
                      props={{
                        size: 'sm',
                        radius: 'sm',
                        variant: 'light',
                        isIconOnly: true,
                        onPress: () => {},
                        content: (
                          <ArrowRotateLeft
                            className="text-secondary-1000 group-hover:text-white"
                            size={16}
                          />
                        ),
                        className:
                          'p-1 hover:!bg-primary-400 transition-all duration-200 border border-transparent hover:border-primary-400',
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="rounded-lg border border-[#DCF0F9]/40 p-1.5 flex items-center gap-1.5">
                    <User size={16} />
                    <span className="text-secondary-900 !text-xs">{user.name}</span>
                  </div>

                  <div className="rounded-lg border border-[#DCF0F9]/40 p-1.5 flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span className="text-secondary-900 !text-xs">{user.Publication}</span>
                  </div>

                  <div className="rounded-lg border border-[#DCF0F9]/40 p-1.5 flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span className="text-secondary-900 !text-xs">{user.Edit}</span>
                  </div>

                  <div className="rounded-lg border border-[#DCF0F9]/40 p-1.5 flex items-center gap-1.5">
                    <Status size={16} />
                    <span className="text-secondary-900 !text-xs">{user.UploadStatus}</span>
                  </div>
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
