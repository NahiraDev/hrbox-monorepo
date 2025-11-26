import {OrganizationalLocation} from '@module/basic-info/app/mock';
import {Avatar, Card} from '@heroui/react';
import {Location, MoreSquare, Trash} from 'iconsax-reactjs';
import {useState, useMemo} from 'react';
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import {AppButton, AppDeleteModal, AppPagination} from '@hrbox/uikit/components';
import { useModal } from "@HRBox/core/hooks";
import { AwardModal } from "@HRBox/modules/hrlink/modals/AwardModal";
import { handleSubmitAward } from "@HRBox/modules/hrlink/forms/AwardForm";
import { formValidationOrganizationLocation, initialValuesOrganizationLocation } from "@HRBox/modules/basic-info/forms/OrganizationLocationForm";

    const OrganizationalLocations = () => {
    const {openModal} = useModalContext();
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

  const modal = useModal()
  const handleOpenOrganizationLocation = () => {
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
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
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
        <>
            <div className="flex flex-col justify-between w-full h-full p-4 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full h-full">
                    {filteredLocations.map((detail, index) => (
                        <div key={`${detail.title}-${index}`} className="relative group">
                            <Card
                                className="w-full bg-white shadow-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border border-primary transition-all duration-200 relative z-0"
                            >
                                <Avatar
                                    className="w-full h-32 sm:h-40"
                                    radius="sm"
                                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                                />
                                <div className="w-full">
                                    <span className="!font-bold text-left">{detail.title}</span>
                                </div>

                                <div
                                    className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Address</span>
                                    </div>
                                    <p className="!text-xs !font-bold truncate">{detail.Address}</p>
                                </div>

                                <div
                                    className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Email</span>
                                    </div>
                                    <p className="!text-xs !font-bold truncate">{detail.email}</p>
                                </div>

                                <div
                                    className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Website</span>
                                    </div>
                                    <a className="!text-xs !font-bold hover:underline truncate" href={detail.webLink}
                                       target="_blank" rel="noopener noreferrer">
                                        {detail.webLink}
                                    </a>
                                </div>

                                <div
                                    className="bg-[#EEF9FF] w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Is it visible?</span>
                                    </div>
                                    <p className="!text-xs !font-bold">
                                      <span className={`px-2 py-1 rounded-full !text-xs ${
                                          detail.visible === 'Yes' ? '' : ''
                                      }`}>
                                        {detail.visible}
                                      </span>
                                    </p>
                                </div>
                            </Card>

                            <div className="absolute top-2 right-2 z-10">
                                <AppButton
                                    size='xl'
                                    radius='sm'
                                    variant='light'
                                    onPress={() => handleMoreClick(index, detail)}
                                    content={<MoreSquare/>}
                                    className={`text-black p-2 bg-white text-lg rounded-lg border-2 border-primary-panel shadow-md transition-all duration-200 ${
                                        activeButton === index ? 'scale-105 ring-2 ring-primary' : 'hover:scale-105'
                                    }`}
                                />
                            </div>

                            {activeButton === index && (
                                <div
                                    className="absolute top-14 right-2 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-30 animate-in slide-in-from-top-2 duration-200">
                                    <AppButton
                                        size='sm'
                                        variant='light'
                                        onPress={() => handleDeleteClick(index)}
                                        content={
                                            <div className="flex items-center gap-2">
                                                <Trash size={16}/>
                                                <span>Delete</span>
                                            </div>
                                        }
                                        className='w-full justify-start text-left hover:bg-red-50 transition-colors duration-150'
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
                    {/*<AppPagination/>*/}
                </div>
            </div>
        </>
    );
};

export default OrganizationalLocations;
