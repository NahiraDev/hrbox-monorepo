import { OrganizationalLocation } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { Location, More, Trash } from 'iconsax-react';
import { useState, useMemo } from 'react';
import { useModalContext } from '@core/context';
import { AppButton, AppDeleteModal, AppPagination } from '@core/components';
import {
  OrganizationLocationShowModeModal
} from '@module/basic-info/features/departments/modals/OrganizationLocationShowModeModal';

const OrganizationalLocations = () => {
  const { openModal } = useModalContext();
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [locations, setLocations] = useState(OrganizationalLocation);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number | null>(null);

  const handleMoreClick = (index: number, location: any) => {
    setActiveButton(activeButton === index ? null : index);
    setSelectedLocationIndex(index);
  };

  const handleCloseActions = () => {
    setActiveButton(null);
  };

  const handleDeleteClick = (index: number) => {
    setActiveButton(null);
    setSelectedLocationIndex(index);

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
        <Trash className='text-white'/>
      );
    };

  const handleDeleteConfirm = (index: number) => {
    setLocations(prev => {
      const newLocations = [...prev];
      newLocations.splice(index, 1);
      return newLocations;
    });
    setSelectedLocationIndex(null);
  };


  const filteredLocations = useMemo(() => locations, [locations]);

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full p-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full h-full">
          {filteredLocations.map((detail, index) => (
            <div key={`${detail.title}-${index}`} className="relative group">
              <Card
                isPressable
                onPress={() => {
                      openModal(
                    'edit',
                    '',
                    <OrganizationLocationShowModeModal />,
                    undefined,
                    '3xl',
                    'Organizational Locations',
                    <Location className="text-white" />
                  );
                }}
                className="cursor-pointer w-full bg-white shadow-sm rounded-xl p-4 flex flex-col items-center justify-center gap-3
                Headquarters  border-1 border-transparent hover:border-primary-400
               hover:!bg-[#D6F2FF]
                transition-all duration-150"
               >
                <Avatar
                  className="w-full h-32 sm:h-40 text-white"
                  color="primary"
                  radius="sm"
                  src=""
                />
                <div className="w-full text-left">
                  <span className="!font-bold !text-[16px] text-secondary-1000">{detail.title}</span>
                </div>

                <div className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Location size="12" />
                    <span className="!text-[10px] text-secondary-1000">Address</span>
                  </div>
                  <p className="!text-[10px] !font-bold truncate">{detail.Address}</p>
                </div>

                <div className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <Location size="12" />
                    <span className="!text-[10px] text-secondary-1000">Email</span>
                  </div>
                  <p className="!text-xs !font-bold truncate">{detail.email}</p>
                </div>

                <div className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <Location size="12" />
                    <span className="!text-[10px] text-secondary-1000">Website</span>
                  </div>
                  <a className="!text-xs !font-bold hover:underline truncate" href={detail.webLink} target="_blank" rel="noopener noreferrer">
                    {detail.webLink}
                  </a>
                </div>

                <div className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <Location size="12" />
                    <span className="!text-[10px] text-secondary-1000">Is it visible?</span>
                  </div>
                  <p className="!text-xs !font-bold">
                    <span className={`px-2 py-1 rounded-full !text-xs !font-bold truncate ${
                      detail.visible === 'Yes' ? '' : ''
                    }`}>
                      {detail.visible}
                    </span>
                  </p>
                </div>
              </Card>

              <div className="absolute top-2 right-2 pt-1 pr-1 z-10">
                <AppButton
                  props={{
                    size: 'xl',
                    radius: 'sm',
                    variant: 'light',
                    onPress: () => handleMoreClick(index, detail),
                    content: <More size="20" />,
                    className: "text-black p-1.5 bg-white text-lg  border border-primary-400 shadow-md hover:!bg-primary-400 hover:!text-white transition-all duration-200"
                  }}
                />
              </div>

              {activeButton === index && (
                <div className="absolute top-10.5 right-6 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-30 animate-in slide-in-from-top-2 duration-200">
                  <AppButton
                    props={{
                      size: 'sm',
                      variant: 'light',
                      onPress: () => handleDeleteClick(index),
                      content: (
                        <div className="flex items-center gap-1 p-3">
                          <Trash size='20' />
                          <span className="text-secondary-1000 ">Delete</span>
                        </div>
                      ),
                      className: 'w-full justify-start text-left hover:bg-red-50 transition-colors duration-150'
                    }}
                  />
                </div>
              )}

              {activeButton === index && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleCloseActions}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end p-2 mt-4">
          <AppPagination total={5} />
        </div>
      </div>
    </>
  );
};

export default OrganizationalLocations;
