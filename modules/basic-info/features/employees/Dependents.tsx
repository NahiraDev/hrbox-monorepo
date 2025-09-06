import { Card } from '@heroui/react';
import { dataWorker2, dataWorker, Spouse } from 'mock';
import { AppButton, AppDeleteModal } from 'core/components';
import { Settings, Trash, Calendar, User, GpsSlash, Call, Heart, ProfileTick } from 'iconsax-react';
import { useModalContext } from 'core/context';

import { BasicInfoLayout } from '../common';

const Dependents = () => {
  const { openModal } = useModalContext();

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-2 gap-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-full">
              {Spouse.map((user: any, index) => (
                <Card key={index} className="p-3 w-full h-full shadow-light-tight-1 bg-white ">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <GpsSlash size="20" />
                        <span>First Name</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.firstName}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Call size="20" />
                        <span>Last Name</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.lastName}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <User size="20" />
                        <span>Job Title</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.job}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>National ID</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.id}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Heart size="20" />
                        <span>Education</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.education}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>Relation</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.mobile}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <ProfileTick size="20" />
                        <span>Date of Birth</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.birth}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <AppDeleteModal />
            </div>
            <div className="w-full">
              {dataWorker.map((user: any, index) => (
                <Card key={index} className="p-3 w-full h-full shadow-light-tight-1 bg-white ">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex justify-between border-b border-gray-200 p-1">
                      <div className="flex items-center gap-3 text-lg font-semibold">
                        <User />
                        <span>{user.worker}</span>
                      </div>
                      <div className="flex gap-1">
                        <div>
                          <AppButton
                            props={{
                              size: 'xs',
                              radius: 'sm',
                              variant: 'light',
                              isIconOnly: true,
                              onPress: () => openModal('delete', user),
                              content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                              className: 'hover:!bg-red-500 transition-all duration-200',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Settings size="20" />
                        <span>job</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.job}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>National ID</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.num}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>Education</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.num}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>Mobile</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.num}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>Date of Birth</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.num}</span>
                      </div>
                    </div>
                    <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                      <div className="flex gap-2 items-center">
                        <Calendar size="20" />
                        <span>Relation</span>
                      </div>
                      <div className="font-semibold">
                        <span>{user.num}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <AppDeleteModal />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full"  >
            {dataWorker2.map((user: any, index) => (
              <Card key={index} className="p-3 w-full h-full shadow-light-tight-1 bg-white ">
                <div className="flex flex-col gap-2 ">
                  <div className="flex justify-between border-b border-gray-200 p-1">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <User />
                      <span>{user.worker}</span>
                    </div>
                    <div className="flex gap-1">
                      <div>
                        <AppButton
                          props={{
                            size: 'xs',
                            radius: 'sm',
                            variant: 'light',
                            isIconOnly: true,
                            onPress: () => openModal('delete', user),
                            content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                            className: 'hover:!bg-red-500 transition-all duration-200',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Settings size="20" />
                      <span>job</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.job}</span>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Calendar size="20" />
                      <span>National ID</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.num}</span>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Calendar size="20" />
                      <span>Education</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.num}</span>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Calendar size="20" />
                      <span>Mobile</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.num}</span>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Calendar size="20" />
                      <span>Date of Birth</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.num}</span>
                    </div>
                  </div>
                  <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                    <div className="flex gap-2 items-center">
                      <Calendar size="20" />
                      <span>Relation</span>
                    </div>
                    <div className="font-semibold">
                      <span>{user.num}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <AppDeleteModal />
          </div>
        </div>
      }
    />
  );
};

export default Dependents;
