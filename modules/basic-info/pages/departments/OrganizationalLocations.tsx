import {OrganizationalLocation} from '@module/basic-info/app/mock';
import {Avatar, Card} from '@heroui/react';
import { Category, Edit, Location, More, Trash } from "iconsax-reactjs";
import React, {useMemo, useState} from 'react';
import {ModalSize, ModalType, useModalContext} from "@hrbox/core/providers/ModalProvider";
import { AppButton, AppPagination } from "@hrbox/uikit/components";
import {useModal} from "@hrbox/core/hooks";
import {handleSubmitAward} from "@hrbox/modules/hrlink/forms/AwardForm";
import {
    formValidationOrganizationLocation,
    initialValuesOrganizationLocation
} from "@hrbox/modules/basic-info/forms/OrganizationLocationForm";
import { OrganizationLocationModal } from "@hrbox/modules/basic-info/modals/OrganizationLocationModal";
import { meta } from "@eslint/js";

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
      ModalType.VIEW,
      "OrganizationLocationModal",
      <OrganizationLocationModal/>,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Location size={18}/> Organizational Locations</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "OrganizationLocationModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "OrganizationLocationModal");
          },
        },
      },
      ModalSize.XL,
    );
  };
  const handleOpenOrganizationLocationEdit = () => {
    modal.open(
      ModalType.EDIT,
      "OrganizationLocationModal",
      <OrganizationLocationModal/>,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Location size={18}/> Organizational Locations</div>,
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "OrganizationLocationModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "OrganizationLocationModal");
          },
        },
      },
      ModalSize.XL,
    );
  };


  return (
        <>
            <div className="flex flex-col justify-between w-full h-full relative">
                <div className="grid grid-cols-5  gap-4 w-full  ">
                    {filteredLocations.map((detail, index) => (
                        <div key={`${detail.title}-${index}`} className="relative group">
                            <Card
                              isPressable
                              onPress={handleOpenOrganizationLocation}
                              className="w-full bg-white shadow-sm rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border  hover:!bg-[#D6F2FF] hover:cursor-pointer border-primary relative z-0"

                            >
                                <Avatar
                                    className="w-full h-32 sm:h-40"
                                    radius="sm"
                                    src=""
                                    color="primary"
                                />
                                <div className="w-full flex items-start">
                                    <span className="!font-bold text-secondary-1000">{detail.title}</span>
                                </div>

                                <div
                                    className="bg-gradient-to-r from-white via-sky-100 to-white w-full rounded-lg border border-sky-100 p-2 flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Address</span>
                                    </div>
                                    <p className="!text-xs !font-bold truncate">{detail.Address}</p>
                                </div>

                                <div
                                    className="bg-gradient-to-r from-white via-sky-100 to-white w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Email</span>
                                    </div>
                                    <p className="!text-xs !font-bold truncate">{detail.email}</p>
                                </div>

                                <div
                                    className="bg-gradient-to-r from-white via-sky-100 to-white w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
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
                                    className="bg-gradient-to-r from-white via-sky-100 to-white w-full rounded-lg border border-sky-100 p-2 flex items-center gap-2 overflow-hidden">
                                    <div className="flex items-center gap-1">
                                        <Location size="15"/>
                                        <span className="!text-xs">Is it visible?</span>
                                    </div>
                                    <p className="!text-xs !font-bol d">
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
                                size="xl"
                                radius="sm"
                                variant="light"
                                onPress={() => handleMoreClick(index, detail)}
                                  className={`group text-black p-1.5 bg-white hover:!bg-primary-400 text-lg rounded-lg border border-primary-400 shadow-md transition-all duration-200 ${
                                  activeButton === index
                                    ? "scale-105 ring-2 ring-primary"
                                    : "hover:scale-105"
                                }`}
                                content={
                                  <More
                                    size={20}
                                    className="text-black transition-colors duration-200 hover:!text-white"
                                  />
                                }
                              />

                            </div>

                            {activeButton === index && (
                                <div
                                    className="absolute top-12 right-2 z-20 bg-white rounded-lg shadow-lg border border-gray-200  w-30 animate-in slide-in-from-top-2 duration-200">
                                    <AppButton
                                        size='sm'
                                        variant='light'
                                        // onPress={() => handleDeleteClick(index)}
                                        content={
                                            <div className="flex items-center gap-2">
                                                <Trash size={20}/>
                                                <span className="text-sm text-secondary-1000 ">Delete</span>
                                            </div>
                                        }
                                        className='w-full justify-start text-left hover:bg-red-50 transition-colors rounded-[6px] duration-150 py-3 px-6'
                                    />
                                  <AppButton
                                    size='sm'
                                    variant='light'
                                    onPress={handleOpenOrganizationLocationEdit}
                                    content={
                                      <div className="flex items-center gap-2">
                                        <Edit size={20}/>
                                        <span className="text-sm text-secondary-1000 ">Edit</span>
                                      </div>
                                    }
                                    className='w-full justify-start text-left hover:bg-red-50 transition-colors rounded-[6px] duration-150 py-3 px-6'
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
                  <AppPagination meta={meta}  />
                </div>
            </div>
        </>
    );
};

export default OrganizationalLocations;
