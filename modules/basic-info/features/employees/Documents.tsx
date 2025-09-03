import { Avatar, Card } from '@heroui/react';
import { identityCard } from 'mock';
import { AppButton, AppDeleteModal } from 'core/components';
import { Trash, ArrowRotateLeft, User, Status, Calendar } from 'iconsax-react';

import { BasicInfoLayout } from '../common';

const Documents = () => {
  const deleteModal = AppDeleteModal.useModal()

  const handleDeleteDocument = (user:any) =>{
    console.log(user);
  }
  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-4 gap-4 w-full">
          {identityCard.map((user:any, index) => (
            <Card key={index} className="p-3 w-full h-full ">
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar radius="sm" size="lg" />
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
                          onPress: () => deleteModal.open({
                            onConfirm: handleDeleteDocument(user),
                            onCancel: deleteModal.close,
                          }),
                          content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                          className: 'hover:!bg-red-500 transition-all duration-200',
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
                          content: <ArrowRotateLeft className="text-secondary-1000 group-hover:text-white" />,
                          className: 'hover:!bg-primary-400 transition-all duration-200',
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
          <AppDeleteModal />
        </div>
      }
    />
  );
};

export default Documents;
