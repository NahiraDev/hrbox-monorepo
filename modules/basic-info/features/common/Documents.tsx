import { Avatar, Card } from '@heroui/react';
import { identityCard } from 'mock';
import { AppButton } from 'core/components';
import { Trash, ArrowRotateLeft, User, Status, Calendar } from 'iconsax-react';

import ReportBox from '../../components/ReportBox';
import BlueHeaderEmployees from '../../components/BlueHeaderEmployees';

const Documents = () => {
  return (
    <>
      <BlueHeaderEmployees />
      TODO
      <div className="flex w-full gap-8">
        <ReportBox />
        <div className="grid grid-cols-4 gap-4 w-full">
          {identityCard.map((user, index) => (
            <Card key={index} className="p-3 w-full h-full ">
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar radius="sm" size="lg" />
                    <span>Identity Card</span>
                  </div>
                  <div className="flex gap-1">
                    <AppButton
                      props={{
                        size: 'sm',
                        radius: 'sm',
                        variant: 'light',
                        content: (
                          <Trash className="text-black group-hover:text-white transition-colors duration-200 w-5 h-6" />
                        ),
                        className: 'hover:!bg-red-500 transition-all duration-200',
                      }}
                    />
                    <AppButton
                      props={{
                        size: 'sm',
                        radius: 'sm',
                        variant: 'light',
                        content: (
                          <ArrowRotateLeft className="text-black group-hover:text-white transition-colors duration-200 w-5 h-6" />
                        ),
                        className: 'hover:!bg-primary-400 transition-all duration-200',
                      }}
                    />
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
      </div>
    </>
  );
};

export default Documents;
