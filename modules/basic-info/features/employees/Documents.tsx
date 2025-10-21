import { Avatar, Card } from '@heroui/react';
import { identityCard } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import { Trash, ArrowRotateLeft, User, Status, Calendar } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { useState } from 'react';
import { BasicInfoLayout } from '@module/basic-info/features/common';
import DocumentsModal from '../employees/modals/DocumentsModal';
// import DocumentsModal from '../employees/modals/DocumentsModal';
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

  const closeAllModals = () => {

  };

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

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-4 gap-4 w-full p-4">
          {documentsList.map((user, index) => (
            <Card key={index} className="p-3 w-full h-full">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <AppButton
                      props={{
                        size: 'xs',
                        radius: 'sm',
                        variant: 'light',
                        isIconOnly: true,
                        onPress: () =>
                          openModal(
                            'custom',
                            '',
                            <DocumentsModal
                              onClose={() => {}}
                              onCloseAll={closeAllModals}
                              onSubmit={(imageSrc: string) => handleImageSubmit(index, imageSrc)}
                            />,
                            undefined,
                            'sm'
                          ),
                        content: (
                          <Avatar
                            radius="sm"
                            size="lg"
                            src={user.avatarSrc || undefined}
                          />
                        ),
                      }}
                    />
                    <span>Identity Card</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <AppButton
                        props={{
                          size: 'xs',
                          radius: 'sm',
                          variant: 'light',
                          isIconOnly: true,
                          onPress: () => handleDeleteClick(index),
                          content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                          className: 'p-2 hover:!bg-red-500 transition-all duration-200',
                        }}
                      />
                    </div>
                    <div>
                      <AppButton
                        props={{
                          size: 'xs',
                          radius: 'sm',
                          variant: 'light',
                          isIconOnly: true,
                          onPress: () =>
                            openModal(
                              'edit',
                              '',
                              <DocumentsModal
                                onClose={() => {}}
                                onCloseAll={closeAllModals}
                                onSubmit={(imageSrc: string) => handleImageSubmit(index, imageSrc)}
                              />,
                              undefined,
                              'lg'
                            ),
                          content: <ArrowRotateLeft className="text-secondary-1000 group-hover:text-white" />,
                          className: 'p-2 hover:!bg-primary-400 transition-all duration-200',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <div className="flex gap-1 items-center w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{user.Publication}</span>
                </div>
                <div className="flex gap-1 items-center w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{user.Edit}</span>
                </div>
                <div className="flex gap-1 items-center w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <Status className="w-4 h-4" />
                  <span className="text-sm">{user.UploadStatus}</span>
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
