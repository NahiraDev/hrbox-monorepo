import {
  ArrowLeft2,
  ArrowRight2,
  Calendar,
  DollarCircle,
  Edit,
  Flag,
  GlobalSearch,
  GpsSlash,
  Heart,
  Location,
  Menu,
  More2,
  Personalcard,
  Profile,
  ProfileTick,
  ReceiveSquare,
  Shield,
} from 'iconsax-react';
import moment from 'moment-jalaali';
import { AppButton } from 'core/components';
import { Card } from '@heroui/react';
import { useModalContext } from 'core/context';

import { GeneralInformation, UserLocation } from '../common';

import { GeneralInformationModal } from './modals';

const ResumeInfo = () => {
  const { openModal } = useModalContext();
  const profileData = null;

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col h-full gap-[14px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 rounded-md bg-secondary-400 dark:bg-surface-200 shadow-theme-sm px-3 py-1.5 w-fit">
            <Personalcard className="text-white" size="22" />
            <span className="text-white text-xl font-normal">User Information</span>
          </div>
          <div className="flex gap-2">
            <AppButton
              props={{
                isIconOnly: true,
                color: 'default',
                size: 'xs',
                radius: 'md',
                content: <Edit className="text-secondary-1000" size="24" />,
                onPress: () => openModal('edit', 'information', profileData),
              }}
            />
            <AppButton
              props={{
                isIconOnly: true,
                color: 'default',
                size: 'xs',
                radius: 'md',
                content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
              }}
            />
            <AppButton
              props={{
                isIconOnly: true,
                color: 'default',
                size: 'xs',
                radius: 'md',
                content: <ArrowRight2 className="text-secondary-1000" size="24" />,
              }}
            />
            <AppButton
              props={{
                color: 'default',
                size: 'md',
                radius: 'md',
                content: (
                  <>
                    <ReceiveSquare className="text-secondary-1000" size="16" />
                    <span className="text-secondary-1000 font-semibold text-base">Download Resume</span>
                  </>
                ),
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 h-full">
          <div className="col-span-3">
            <div className="flex gap-3 h-full">
              <Card className="bg-white shadow-theme-sm rounded-xl p-4 w-full">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
                  <span className="text-secondary-900 text-xl font-semibold leading-normal">Detailed Information</span>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Profile className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">First Name</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.name}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Profile className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">Last Name</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.lastName}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <GpsSlash className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">National Code</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.nationalCode}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">Date Of Birth</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {moment(profileData?.profile.birthDate).format('YYYY/MM/DD')}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">Marital Status</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.MaritalStatusName}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <ProfileTick className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">Gender</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.gender}
                    </span>
                  </div>
                  <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Shield className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">
                        Military Service Status
                      </span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.nationalCode}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="bg-white shadow-shadow-light-tight/1 rounded-[14px] p-4 w-full">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
                  <span className="text-secondary-900 text-xl font-semibold leading-normal">Detailed Information</span>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <More2 className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">
                        Organizational category
                      </span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.jobGroupNames}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <DollarCircle className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light leading-normal">Minimum salary</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold leading-normal">
                      {profileData?.profile?.RequestedSalary}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Menu className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900  text-base font-light">Working Category</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold">
                      {profileData?.profile?.jobGroupNames}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Flag className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light">Nationality</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold">Iranian</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <DollarCircle className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light">City</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold">Qazvin</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <GlobalSearch className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light">City</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold">{profileData?.profile?.city}</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Location className="text-[#292D32]" size="16" />
                      <span className="text-secondary-900 text-base font-light">Address</span>
                    </div>
                    <span className="text-secondary-900 text-base font-semibold">{profileData?.profile?.Address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <GeneralInformation />
            <UserLocation />
          </div>
        </div>
      </div>
      <GeneralInformationModal />
    </div>
  );
};

export default ResumeInfo;
