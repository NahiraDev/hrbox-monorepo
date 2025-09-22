import { Edit, Lock } from 'iconsax-react';
import { Avatar } from '@heroui/react';
import React, { useRef, useState } from 'react';

import { AppButton } from '@core/components';
import { FormProvider } from '@core/context';

import { ChangePasswordModal, DeactiveAccountModal } from './modals';
import {
  EditProfileForm,
  GeneralSettingForm,
  handleSubmitEditProfile,
  initialValuesEditGeralSetting,
  initialValuesEditProfile,
  validationErrorEditGeneralSetting,
  validationErrorEditProfile,
} from './forms';
import { useEditGeneralSettingMutation, useEditProfileMutation } from './apis';

const Setting = () => {
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editProfile] = useEditProfileMutation();
  const [editGeneralSetting] = useEditGeneralSettingMutation();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-1 flex flex-col gap-3">
        <div className="bg-white shadow-light-tight/1 rounded-5 px-3 !py-3 h-full relative">
          <img
            alt=""
            className="h-full absolute left-0 top-0 opacity-[0.2] blur rounded-[14px] object-cover"
            src={''}
          />
          <div className="flex justify-between border-b-1 border-neutral-100 dark:border-neutral-700 pb-1.5">
            <span className="text-secondary-900 text-xl">General Details</span>
            <div className="flex gap-1.5">
              <AppButton
                props={{
                  size: 'sm',
                  radius: 'lg',
                  color: 'white',
                  content: (
                    <>
                      <Lock className="" size="16" />
                      <span className="text-secondary-1000 text-base">Edit Password</span>
                    </>
                  ),
                }}
              />
              <AppButton
                props={{
                  size: 'sm',
                  color: 'white',
                  radius: 'lg',
                  isIconOnly: true,
                  onPress: () => setShowSubmitButton(!showSubmitButton),
                  content: <Edit className="text-secondary-1000" size="18" />,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-3 px-[63px]">
            <div className="flex justify-center">
              <Avatar className="w-[72px] h-[72px] cursor-pointer" src={avatarSrc} onClick={handleAvatarClick} />
              <input ref={fileInputRef} accept="image/*" className="hidden" type="file" onChange={handleFileChange} />
            </div>
            <FormProvider
              initialValues={initialValuesEditProfile}
              validationSchema={validationErrorEditProfile}
              onSubmitAsync={async (values: any) => {
                handleSubmitEditProfile(editProfile(values));
              }}
            >
              <EditProfileForm showSubmitButton={showSubmitButton} />
            </FormProvider>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <div className="bg-white shadow-light-tight/1 rounded-5 px-3 !py-3">
          <FormProvider
            initialValues={initialValuesEditGeralSetting}
            validationSchema={validationErrorEditGeneralSetting}
            onSubmitAsync={async (values: any) => {
              handleSubmitEditProfile(editGeneralSetting(values));
            }}
          >
            <GeneralSettingForm />
          </FormProvider>
        </div>
      </div>
      <ChangePasswordModal />
      <DeactiveAccountModal />
    </div>
  );
};

export default Setting;
