import { Button } from "@heroui/button";
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
} from "iconsax-react";
import {
  Form,
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppInput } from "@/components/AppInput.tsx";
import { ResumeLayout } from "@/pages/Resume/Layout.tsx";
import { AppTextArea } from "@/components/AppTextArea.tsx";
import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
import { AppMap } from "@/components/AppMap.tsx";
import { AppDatePicker } from "@/components/AppDatePicker.tsx";
import {
  genderOptions,
  maritalStatusOptions,
} from "@/utils/general.ts";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import { AppDispatch, RootState } from "@/redux/createStore.ts";
import moment from "moment-jalaali";
import { handleEditUserDataApi } from "@/services/User/apis.ts";
import { useState } from "react";
import { AppModal } from "@/components/AppModal.tsx";
import { useTranslation } from "react-i18next";

export default function ResumeInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const profileData: any = useSelector((state: RootState) => state.profile);
  const [openGeneralInformationModal, setOpenGeneralInformationModal] =
    useState<boolean>(false);
  const handleNavigateToWorkExperince = () => {
    navigate("/resume/job-experience");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      FirstName: profileData?.profile?.name || "",
      LastName: profileData?.profile?.lastName || "",
      NationalCode: profileData?.profile?.nationalCode || "",
      MilitaryStatusId: profileData?.profile?.MaritalStatusName || "",
      MaritalStatus: profileData?.profile?.MaritalStatusName || "",
      BirthDate: profileData?.profile?.birthDate || "",
      Address: "",
      AddressCityId: profileData?.profile?.city || "",
      Gender: profileData?.profile?.gender || "",
      OtherSocials: profileData?.profile?.OtherSocials || "",
      Biography: profileData?.profile?.OtherSocials || "",
      UserjobGroup: profileData?.profile?.jobGroupNames || "",
      UserJobCategory: profileData?.profile?.JobCategoriesName || "",
      RequestedSalary: profileData?.profile?.RequestedSalary || "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      dispatch(handleEditUserDataApi(values))
    },
  });

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col h-full gap-[14px]">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit">
                  <Personalcard className="text-white" size="22" />
                  <span className="text-white text-xl font-normal">
                    User Information
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="!min-w-fit !rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 !p-2"
                    color="default"
                    variant="light"
                    onPress={()=>setOpenGeneralInformationModal(true)}
                  >
                    <Edit
                      className="text-secondary-1000 dark:text-white"
                      size="24"
                    />
                  </Button>
                  <Button
                    isIconOnly
                    className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                    color="default"
                    variant="light"
                  >
                    <ArrowLeft2
                      className="text-secondary-1000 dark:text-white"
                      size="24"
                    />
                  </Button>
                  <Button
                    isIconOnly
                    className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                    color="default"
                    variant="light"
                    onPress={handleNavigateToWorkExperince}
                  >
                    <ArrowRight2
                      className="text-secondary-1000 dark:text-white"
                      size="24"
                    />
                  </Button>
                  <Button
                    className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                    color="default"
                    variant="light"
                  >
                    <ReceiveSquare className="text-secondary-1000 dark:text-white" />
                    <span className="text-secondary-1000 dark:text-white font-semibold text-base">
                      {t("download_resume")}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 h-full">
                <div className="col-span-3">
                  <div className="flex gap-3 h-full">
                    <div className="bg-white dark:bg-secondary-1000 shadow-shadow-light-tight/1 rounded-[14px] p-4 w-full">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
                        <span className="text-secondary-900 dark:text-white text-xl font-semibold leading-normal">
                          Detailed Information
                        </span>
                      </div>

                      <div className="flex flex-col gap-8">
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Profile
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              First Name
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.name}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Profile
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Last Name
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.lastName}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <GpsSlash
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              National Code
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.nationalCode}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Date Of Birth
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {moment(profileData?.profile.birthDate).format(
                              "YYYY/MM/DD",
                            )}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Heart
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Marital Status
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.MaritalStatusName}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <ProfileTick
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Gender
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.gender}
                          </span>
                        </div>
                        <div className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Shield
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Military Service Status
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.nationalCode}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-secondary-1000 shadow-shadow-light-tight/1 rounded-[14px] p-4 w-full">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
                        <span className="text-secondary-900 dark:text-white text-xl font-semibold leading-normal">
                          Detailed Information
                        </span>
                      </div>

                      <div className="flex flex-col gap-8">
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <More2
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Organizational category
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                             {profileData?.profile?.jobGroupNames}
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <DollarCircle
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Minimum salary
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.RequestedSalary}
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Menu
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white  text-base font-light leading-normal">
                              Working Category
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.jobGroupNames}
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Flag
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              Nationality
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            Iranian
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <DollarCircle
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              City
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            Qazvin
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <GlobalSearch
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                              City
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                            {profileData?.profile?.city}
                          </span>
                        </div>
                        <div className="px-4 py-3 flex justify-between rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-[4px] dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                          <div className="flex items-center gap-1.5">
                            <Location
                              className="text-[#292D32] dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-900 text-base font-light leading-normal">
                              Address
                            </span>
                          </div>
                          <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                           {profileData?.profile?.Address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                  <AppGeneralDetails />
                  <AppMap
                    props={{
                      isEdit: true,
                    }}
                  />
                </div>
              </div>
            </div>
            <AppModal
              footer={
                <div className="flex gap-[30px] items-center justify-end">
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenGeneralInformationModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white"
                    form="edit-general-information"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <Personalcard className="text-white" size="22" />
                  <span className="text-white font-normal text-xl">
              Edit General Informations
            </span>
                </div>
              }
              isOpen={openGeneralInformationModal}
              size="4xl"
              onClose={() => setOpenGeneralInformationModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                id="edit-general-information"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("first_name"),
                        required: true,
                        error: formik.errors.FirstName,
                        name: "FirstName",
                        placeholder: "",
                        type: "text",
                        value: formik.values.FirstName,
                        formik: formik,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("last_name"),
                        required: true,
                        error: formik.errors.LastName,
                        name: "LastName",
                        placeholder: "",
                        type: "text",
                        value: formik.values.LastName,
                        formik: formik,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("national_code"),
                        required: true,
                        error: formik.errors.NationalCode,
                        name: "NationalCode",
                        placeholder: "",
                        type: "text",
                        value: formik.values.NationalCode,
                        formik: formik,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: t("date_of_birth"),
                        required: true,
                        error: formik.errors.BirthDate,
                        name: "BirthDate",
                        placeholder: "Please Enter Birth Date ...",
                        formik: formik,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "gender",
                        label: t("gender"),
                        placeholder: "Please Select Gender ...",
                        required: true,
                        value: formik.values.Gender,
                        displayKey: `label.${lang}`,
                        valueKey: "key",
                        formik,
                        error: formik.touched.Gender && formik.errors.Gender,
                        data: genderOptions,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "MaritalStatus",
                        label: t("marital_status"),
                        placeholder: "Please Select Marital Status ...",
                        required: true,
                        value: formik.values.MaritalStatus,
                        displayKey: `label.${lang}`,
                        valueKey: "id",
                        formik,
                        error:
                          formik.touched.MaritalStatus && formik.errors.MaritalStatus,
                        data: maritalStatusOptions,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "MilitaryStatusId",
                        label: "Military Status",
                        placeholder: "Please Select Military Status ...",
                        required: true,
                        value: formik.values.MilitaryStatusId,
                        displayKey: "Namde",
                        valueKey: "Id",
                        formik,
                        error:
                          formik.touched.MilitaryStatusId &&
                          formik.errors.MilitaryStatusId,
                        data: profileData?.military,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "AddressCityId",
                        label: "city",
                        placeholder: "Please Select Military Status ...",
                        required: true,
                        value: formik.values.AddressCityId,
                        displayKey: "Name",
                        valueKey: "Id",
                        formik,
                        error:
                          formik.touched.AddressCityId && formik.errors.AddressCityId,
                        data: profileData?.cities,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("address"),
                        required: true,
                        error: formik.errors.Address,
                        name: "Address",
                        placeholder: "",
                        type: "text",
                        value: formik.values.Address,
                        formik: formik,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("minimum_salary"),
                        required: true,
                        error: formik.errors.RequestedSalary,
                        name: "RequestedSalary",
                        placeholder: "",
                        type: "text",
                        value: formik.values.RequestedSalary,
                        formik: formik,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "UserJobCategory",
                        label: t("working_category"),
                        placeholder: "Please Select Working Category Status ...",
                        required: true,
                        valueKey: "Id",
                        value: formik.values.UserJobCategory,
                        displayKey: "Name",
                        formik,
                        error:
                          formik.touched.UserJobCategory &&
                          formik.errors.UserJobCategory,
                        data: profileData?.jobCategory,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "UserjobGroup",
                        label: t("organizational_category"),
                        placeholder: "Please Select Working Category Status ...",
                        required: true,
                        value: formik.values.UserjobGroup,
                        displayKey: "Name",
                        valueKey: "Id",
                        formik,
                        error:
                          formik.touched.UserjobGroup && formik.errors.UserjobGroup,
                        data: profileData?.jobGroups,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: t("social_media_links"),
                        required: true,
                        error: formik.errors.OtherSocials,
                        name: "OtherSocials",
                        placeholder: "",
                        type: "text",
                        value: formik.values.OtherSocials,
                        formik: formik,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <AppTextArea
                      props={{
                        label: "Biography",
                        required: true,
                        error: formik.errors.Biography,
                        name: "Biography",
                        placeholder: "",
                        type: "text",
                        value: formik.values.Biography,
                        formik: formik,
                      }}
                    />
                  </div>
                </div>
              </Form>
            </AppModal>
          </div>
        ),
      }}
    />
  );
}
