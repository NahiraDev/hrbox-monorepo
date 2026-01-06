import { Card } from "@heroui/react";
import { dataWorker2, dataWorker, Spouse } from "@module/basic-info/app/mock";
import { AppButton } from "@hrbox/uikit/components";
import {
  Settings,
  Trash,
  Calendar,
  GpsSlash,
  Call,
  Heart,
  ProfileTick,
  Profile2User,
  MessageEdit,
  Add,
  Profile,
  User, People, Edit, Designtools, UserSquare
} from "iconsax-reactjs";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import { RelativesModal } from "@hrbox/modules/basic-info/modals/RelativesModal";
import { useModal } from "@hrbox/core/hooks";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { formValidationAction, initialValuesAction } from "@hrbox/modules/basic-info/forms/DependentsForm";
import {initialValuesRelative,formValidationRelative} from "@hrbox/modules/basic-info/forms/RelativeForm";
import SpouseModal from "@hrbox/modules/basic-info/modals/SpouseModal";
import DependentsModal from "@hrbox/modules/basic-info/modals/DependentsModal";
import React from "react";

const Dependents = () => {
  const { openModal } = useModalContext();


  const modal = useModal()
  const handleOpenSpouse = () => {
    modal.open(
      ModalType.CREATE,
      "Spouse",
      <SpouseModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/> Add New Spouse</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenSpouseShow = () => {
    modal.open(
      ModalType.VIEW,
      "Spouse",
      <SpouseModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/>  Spouse Details</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenSpouseEdit = () => {
    modal.open(
      ModalType.EDIT,
      "Spouse",
      <SpouseModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/> Edit Spouse</div>,
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenDependents = () => {
    modal.open(
      ModalType.CREATE,
      " Dependents",
      < DependentsModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/> Add New Dependents</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenDependentsShow = () => {
    modal.open(
      ModalType.VIEW,
      " Dependents",
      < DependentsModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/>  Dependents Details</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenDependentsEdit = () => {
    modal.open(
      ModalType.VIEW,
      " Dependents",
      < DependentsModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Profile2User size={22}/> Edit Dependents </div>,
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesAction,
          validationSchema: formValidationAction,
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
  const handleOpenRelative = () => {
    modal.open(
      ModalType.CREATE,
      " Relatives",
      < RelativesModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <People size={22}/> Add New Relatives </div>,
        submitLabel: "Submit",
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
      ModalSize.XL,
    );
  };
  const handleOpenRelativeShow = () => {
    modal.open(
      ModalType.VIEW,
      " Relatives",
      < RelativesModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <People size={22}/> Relatives Details </div>,
        submitLabel: "Submit",
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
      ModalSize.XL,
    );
  };
  const handleOpenRelativeEdit = () => {
    modal.open(
      ModalType.EDIT,
      " Relatives",
      < RelativesModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <People size={22}/>Edit Relatives  </div>,
        submitLabel: "Save Changes",
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
      ModalSize.XL,
    );
  };
  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-2 gap-5 mt-4 ml-3">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1 ">
                  <Profile2User size={24} />
                  <span className="text-xl font-semibold text-secondary-1000">Spouse</span>
                </div>
                <div className="flex items-center gap-1">
                  <AppButton
                      size="xs"
                      radius="sm"
                      color="white"
                      variant="solid"
                      onPress={handleOpenSpouseEdit}
                      isIconOnly={true}
                      className="bg-white border-1 border-primary p-1"
                      content={
                        <MessageEdit className="text-secondary-900" size={19} />
                      }
                  />
                  <AppButton
                      size="xs"
                      radius="sm"
                      color="white"
                      variant="solid"
                      isIconOnly={true}
                      onPress={handleOpenSpouse}
                      className="bg-white border-1 border-primary p-1"
                      content={<Add className="text-secondary-900" size={19} />}
                  />
                </div>
              </div>
              <div className="w-full ">
                {Spouse.map((user: any, index) => (
                  <Card
                    isPressable
                    onPress={handleOpenSpouseShow}
                    key={index}
                    className="p-2.5 w-full  shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer bg-white flex flex-col gap-3"
                  >
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm gap-1.5 items-center">
                          <GpsSlash size={14} />
                          <span className="font-light text-sm text-secondary-1000t">First Name</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.firstName}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-1.5 items-center">
                          <Call size={14} />
                          <span className="font-light text-sm text-secondary-1000">Last Name</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.lastName}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-1.5 items-center">
                          <User size={14} />
                          <span className="font-light text-sm text-secondary-1000">Job Title</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.job}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-1.5 items-center">
                          <Calendar size={14} />
                          <span className="font-light text-sm text-secondary-1000">National ID</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-1.5 items-center">
                          <Heart size={14} />
                          <span className="font-light text-sm text-secondary-1000">Education</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.education}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-1.5 items-center">
                          <Calendar size={14} />
                          <span className="font-light text-sm text-secondary-1000">Relation</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.mobile}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm gap-1.5 items-center">
                          <ProfileTick size={14} />
                          <span className="font-light text-sm text-secondary-1000">Date of Birth</span>
                        </div>
                        <div className="font-semibold text-secondary-1000 text-xs">
                          <span>{user.birth}</span>
                        </div>
                      </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-1">
                  <UserSquare size={24} />
                  <span className="text-xl font-semibold text-secondary-1000">Dependents</span>
                </div>
                <div className="mr-5">
                  <AppButton
                      size="xs"
                      radius="sm"
                      color="white"
                      variant="solid"
                      isIconOnly={true}
                      onPress={handleOpenDependents}
                      className="bg-white border-1 border-primary p-1"
                      content={<Add className="text-secondary-900" size={19} />}
                  />
                </div>
              </div>
              <div className=" overflow-y-scroll  max-h-[calc(63.5vh)] pr-3">
                {dataWorker.map((user: any, index) => (
                  <Card
                    isPressable
                    onPress={handleOpenDependentsShow}
                    key={index}
                    className="p-3 w-full shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer  bg-white flex flex-col gap-2 mb-2.5"
                  >
                      <div className="flex justify-between border-b border-neutral-100 pb-1.5 px-1.5">
                        <div className="flex items-center gap-2">
                          <Profile size={20} variant="Bold"/>
                          <span className="text-lg text-secondary-1000 font-semibold">{user.worker}</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex items-center">
                            <AppButton
                              size= 'xs'
                              radius= 'sm'
                              variant= 'light'
                              isIconOnly= {true}
                              onPress= {handleOpenDependentsEdit}
                              content= {<Edit className="text-secondary-1000 group-hover:text-white" size={16} />}
                              className= 'p-2 hover:!bg-primary-400 transition-all duration-200'
                            />
                            <AppButton
                              size='xs'
                              radius='sm'
                              variant='light'
                              isIconOnly={true}
                              content={<Trash className="text-secondary-1000 group-hover:text-white" size={16} />}
                              className='p-1 hover:!bg-red-500 transition-all duration-200'
                            />
                          </div>
                        </div>
                      </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center ">
                          <Settings size={16} />
                          <span className="text-xs text-secondary-1000">job</span>
                        </div>
                        <div>
                          <span  className="text-xs text-secondary-1000 font-semibold">{user.job}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center ">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">National ID</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Education</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Mobile</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Date of Birth</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Relation</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>

                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mr-2.5">
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center gap-1">
                <People size={24} />
                <span className="text-xl font-semibold text-secondary-1000">Relatives</span>
              </div>
              <div>
                <div className="mr-7">
                <AppButton
                  size="xs"
                  radius="sm"
                  color="white"
                  variant="solid"
                  isIconOnly={true}
                  onPress={handleOpenRelative}
                  className="bg-white border-1 border-primary p-1"
                  content={<Add className="text-secondary-900" size={19} />}
                />
              </div>
              </div>
            </div>
            <div className="  overflow-y-scroll  max-h-[calc(63.5vh)] ">
              <div className="grid grid-cols-2 gap-x-2.5 w-full pr-2.5 ">
                {dataWorker2.map((user: any, index) => (
                  <Card
                    isPressable
                    onPress={handleOpenRelativeShow}
                    key={index}
                    className="p-3 w-full shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer  bg-white flex flex-col gap-2 mb-2.5"
                  >
                    <div className="flex justify-between border-b border-neutral-100 pb-1.5 px-1.5">
                      <div className="flex items-center gap-2">
                        <Profile size={20} variant="Bold"/>
                        <span className="text-lg text-secondary-1000 font-semibold">{user.worker}</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex items-center">
                          <AppButton
                            size= 'xs'
                            radius= 'sm'
                            variant= 'light'
                            isIconOnly= {true}
                            onPress= {handleOpenRelativeEdit}
                            content= {<Edit className="text-secondary-1000 group-hover:text-white" size={16} />}
                            className= 'p-2 hover:!bg-primary-400 transition-all duration-200'
                          />
                          <AppButton
                            size='xs'
                            radius='sm'
                            variant='light'
                            isIconOnly={true}
                            content={<Trash className="text-secondary-1000 group-hover:text-white" size={16} />}
                            className='p-1 hover:!bg-red-500 transition-all duration-200'
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center ">
                          <Settings size={16} />
                          <span className="text-xs text-secondary-1000">job</span>
                        </div>
                        <div>
                          <span  className="text-xs text-secondary-1000 font-semibold">{user.job}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center ">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">National ID</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Education</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Mobile</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Date of Birth</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2  py-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-1.5 items-center">
                          <Calendar size={16} />
                          <span className="text-xs text-secondary-1000">Relation</span>
                        </div>
                        <div>
                          <span className="text-xs text-secondary-1000 font-semibold">{user.num}</span>
                        </div>
                      </div>

                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Dependents;
