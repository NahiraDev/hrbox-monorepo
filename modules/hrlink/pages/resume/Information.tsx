/*  hrlink/resume/information.tsx  */
import {
  Calendar,
  DollarCircle,
  Flag,
  GlobalSearch,
  GpsSlash,
  Heart,
  Location,
  Menu,
  More2,
  Profile,
  ProfileTick,
  Shield,
} from 'iconsax-reactjs';
import { Card, Button } from '@heroui/react';
import { GeneralInformation } from '@hrbox/modules/hrlink/components/GeneralInformation';
import { UserLocation } from '@hrbox/modules/hrlink/components/UserLocation';
import { GeneralInformationModal } from '@hrbox/modules/hrlink/modals/GeneralInformationModal';
import { useFetchProfileQuery } from '@hrbox/modules/hrlink/apis/Setting';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { Paths } from '@hrbox/modules/paths';
import { useEffect } from 'react';

/* --------------------------------------------------------------
   Helper – decide if the profile is “complete”.
   Add / remove fields here to match your business rule.
   -------------------------------------------------------------- */
   
const isProfileComplete = (profile?: any): boolean => {
  if (!profile) return false;
  return !!(
    profile.name &&
    profile.lastName &&
    profile.nationalCode &&
    profile.birthDate &&
    profile.gender &&
    profile.MaritalStatusName &&
    profile.city &&
    profile.Address
  );
};

const ResumeInfo = () => {
  const { push } = useNavigation();
  const { data: profileData, isLoading, isError } = useFetchProfileQuery();

  const profile = profileData?.profile;

  /* ----------------------------------------------------------
     Guard – redirect to the form when the profile is incomplete
     ---------------------------------------------------------- */
  useEffect(() => {
    if (isLoading) return;               // still fetching
    if (isError) return;                 // let UI show error if you want
    if (!isProfileComplete(profile)) {
      // you can use any path that points to the form page
      push({ to: Paths.HRLink.ResumeInformation ?? '/hrlink/profile-form' });
    }
  }, [profile, isLoading, isError, push]);

  /* ----------------------------------------------------------
     Loading / error UI (optional – you already have a spinner)
     ---------------------------------------------------------- */
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">خطا در دریافت اطلاعات پروفایل</p>
      </div>
    );
  }

  /* ----------------------------------------------------------
     MAIN UI – unchanged from your original file
     ---------------------------------------------------------- */
  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      {/* ---------- LEFT COLUMN (Detailed Information) ---------- */}
      <div className="col-span-3">
        <div className="flex gap-3 h-full">
          {/* ---- Personal Info Card ---- */}
          <Card className="bg-white shadow-theme-sm rounded-xl p-4 w-full">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
              <span className="text-secondary-900 text-xl font-semibold leading-normal">
                Detailed Information
              </span>
            </div>

            <div className="flex flex-col gap-8">
              {/* First Name */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Profile className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    First Name
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.name}
                </span>
              </div>

              {/* Last Name */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Profile className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Last Name
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.lastName}
                </span>
              </div>

              {/* National Code */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <GpsSlash className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    National Code
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.nationalCode}
                </span>
              </div>

              {/* Date Of Birth */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Date Of Birth
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {/* Uncomment & install moment if you need formatting */}
                  {/* {profile.birthDate ? moment(profile.birthDate).format('YYYY/MM/DD') : '-'} */}
                  {profile.birthDate ?? '-'}
                </span>
              </div>

              {/* Marital Status */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Heart className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Marital Status
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.MaritalStatusName ?? '-'}
                </span>
              </div>

              {/* Gender */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <ProfileTick className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Gender
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.gender ?? '-'}
                </span>
              </div>

              {/* Military Service (you displayed nationalCode again – keep as-is) */}
              <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Shield className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Military Service Status
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.nationalCode ?? '-'}
                </span>
              </div>
            </div>
          </Card>

          {/* ---- Job / Location Card ---- */}
          <div className="bg-white shadow-shadow-light-tight/1 rounded-[14px] p-4 w-full">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
              <span className="text-secondary-900 text-xl font-semibold leading-normal">
                Detailed Information
              </span>
            </div>

            <div className="flex flex-col gap-8">
              {/* Organizational category */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <More2 className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Organizational category
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.jobGroupNames ?? '-'}
                </span>
              </div>

              {/* Minimum salary */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <DollarCircle className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light leading-normal">
                    Minimum salary
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold leading-normal">
                  {profile.RequestedSalary ?? '-'}
                </span>
              </div>

              {/* Working Category */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Menu className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light">
                    Working Category
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold">
                  {profile.jobGroupNames ?? '-'}
                </span>
              </div>

              {/* Nationality (hard-coded in your original code) */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Flag className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light">
                    Nationality
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold">
                  Iranian
                </span>
              </div>

              {/* City (hard-coded) */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <DollarCircle className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light">
                    City
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold">
                  Qazvin
                </span>
              </div>

              {/* City from API */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <GlobalSearch className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light">
                    City
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold">
                  {profile.city ?? '-'}
                </span>
              </div>

              {/* Address */}
              <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                <div className="flex items-center gap-1.5">
                  <Location className="text-[#292D32]" size="16" />
                  <span className="text-secondary-900 text-base font-light">
                    Address
                  </span>
                </div>
                <span className="text-secondary-900 text-base font-semibold">
                  {profile.Address ?? '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT COLUMN (GeneralInformation + UserLocation) ---------- */}
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>

      {/* <GeneralInformationModal /> */}
    </div>
  );
};

export default ResumeInfo;