import {
  CallCalling,
  Edit,
  Lock,
  MedalStar,
  Profile,
  Sms,
  UserRemove,
  VolumeHigh,
} from 'iconsax-react';
import {
  Avatar,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SettingLayout } from '@/pages/Setting/Layout.tsx';
import AvatarUser from '@/assets/img/Avatar.jpg';
import { AppInput } from '@/components/AppInput.tsx';
import { JobOffersIcon } from '@/icons/jobOffers.tsx';
import { AppDispatch, RootState } from '@/redux/createStore.ts';
import {
  handleChangePasswordApi,
  handleEditProfileApi,
  handleFetchGeneralSettingApi,
} from '@/services/Setting/apis.ts';
import { AppAutoComplete } from '@/components/AppAutoComplete.tsx';
import { companyPeopleOptions } from '@/utils/general.ts';
import { handleGetIndustriesApi } from '@/services/Resume/JobExperience/apis.ts';

export default function Setting() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.setting.data);
  const industries: any = useSelector((state: RootState) => state.resume.jobExperience.industries);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [showGeneralSettingButton, setShowGeneralSettingButton] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(AvatarUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const {
    isOpen: isDeActiveConfirmOpen,
    onOpen: onOpenDeActiveConfirmOpen,
    onOpenChange: onDeActiveConfirmOpenChange,
  } = useDisclosure();

  const formikEditProfile = useFormik({
    initialValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      DisplayName: '',
      Phone: '',
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required(),
      LastName: Yup.string().required(),
      Email: Yup.string().required(),
      DisplayName: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const editProfiledData = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        DisplayName: values.DisplayName,
        Email: values.Email,
      };

      dispatch(handleEditProfileApi(editProfiledData));
    },
  });

  const formikGeneralSetting = useFormik({
    initialValues: {
      NotificationByEmail: false,
      NotificationBySms: false,
      NotificationByPanel: false,
      AdaptationWithOldCompanies: false,
      AdaptationWithCurrentCompanies: false,
      AdaptationWithLowerSalary: false,
      PanelStatus: 0,
      AdaptationWithCompanyPersonal: 0,
      AdaptationDistanceLimit: 0,
    },
    validationSchema: Yup.object({
      NotificationByEmail: Yup.boolean().required(),
      NotificationBySms: Yup.boolean().required(),
      NotificationByPanel: Yup.boolean().required(),

      AdaptationWithOldCompanies: Yup.boolean().required(),
      AdaptationWithCurrentCompanies: Yup.boolean().required(),
      AdaptationWithLowerSalary: Yup.boolean().required(),

      PanelStatus: Yup.number()
        .required('Panel status is required')
        .oneOf([0, 1], 'Invalid panel status'),

      AdaptationWithCompanyPersonal: Yup.number()
        .oneOf(
          companyPeopleOptions.map((opt) => opt.id),
          'Invalid company size option',
        )
        .required('Company size is required'),

      AdaptationDistanceLimit: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      const selectedOption = companyPeopleOptions.find(
        (opt) => opt.id === values.AdaptationWithCompanyPersonal,
      );

      const editProfiledData = {
        NotificationByEmail: values.NotificationByEmail,
        NotificationBySms: values.NotificationBySms,
        NotificationByPanel: values.NotificationByPanel,
        AdaptationWithOldCompanies: values.AdaptationWithOldCompanies,
        AdaptationWithCurrentCompanies: values.AdaptationWithOldCompanies,
        AdaptationWithLowerSalary: values.AdaptationWithLowerSalary,
        PanelStatus: values.PanelStatus,
        AdaptationWithCompanyPersonalMin: selectedOption?.min ?? 0,
        AdaptationWithCompanyPersonalMax: selectedOption?.max ?? 0,
        AdaptationDistanceLimit: values.AdaptationDistanceLimit,
      };

      dispatch(handleEditProfileApi(editProfiledData));
    },
  });

  const formikChangePassword = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
      repeatPass: '',
    },
    validationSchema: Yup.object({
      oldPass: Yup.string().required('Current password is required'),
      newPass: Yup.string()
        .required('New password is required')
        .min(6, 'New password must be at least 6 characters'),
      repeatPass: Yup.string()
        .oneOf([Yup.ref('newPass')], 'Passwords must match')
        .required('Please confirm your new password'),
    }),
    onSubmit: (values) => {
      const changePasswordData = {
        oldPass: values.oldPass,
        newPass: values.newPass,
        repeatPass: values.repeatPass,
      };

      dispatch(handleChangePasswordApi(changePasswordData));
    },
  });

  useEffect(() => {
    dispatch(handleFetchGeneralSettingApi());
    dispatch(handleGetIndustriesApi());
  }, []);

  return (
    <SettingLayout
      props={{
        children: (
          <div className="grid grid-cols-2 gap-3 h-[calc(100%-132px)] w-full">
            <div className="col-span-1 flex flex-col gap-3 h-full w-full">
              <div className="bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 rounded-5 px-3 !py-3 w-full h-full relative">
                <img
                  alt=""
                  className="w-full h-full absolute left-0 top-0 opacity-[0.2] blur rounded-[14px] object-cover"
                  src={AvatarUser}
                />
                <div className="flex justify-between border-b-1 border-netural-100 dark:border-netural-700 pb-1.5">
                  <span className="text-secondary-900 dark:text-white text-xl font-normal leading-normal">
                    General Details
                  </span>

                  <div className="flex gap-1.5">
                    <Button
                      className="flex gap-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 !rounded-4 !h-[30px] !min-w-fit !px-2 !py-1"
                      onPress={onOpen}
                    >
                      <Lock className="" size="16" />
                      <span className="text-secondary-1000 dark:text-white font-normal text-base">
                        Edit Password
                      </span>
                    </Button>
                    <Button
                      className="!p-1 !rounded-4 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 !min-w-fit !w-[30px] !h-[30px]"
                      onPress={() => setShowSubmitButton(!showSubmitButton)}
                    >
                      <Edit className="text-secondary-1000" size="18" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-3 px-[63px]">
                  <div className="flex justify-center">
                    <Avatar
                      className="w-[72px] h-[72px] cursor-pointer"
                      src={avatarSrc}
                      onClick={handleAvatarClick}
                    />
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <Form className="w-full" onSubmit={formikEditProfile.handleSubmit}>
                    <div className="flex flex-col gap-6 w-full">
                      <div className="w-full flex flex-col gap-3">
                        <div className="w-full grid grid-cols-2 gap-[30px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1 items-center">
                              <Profile className="text-[#292D32] dark:text-white" size="12" />
                              <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">
                                {t('first_name')}
                              </span>
                            </div>
                            <AppInput
                              props={{
                                label: null,
                                required: false,
                                error: formikEditProfile.errors.FirstName,
                                name: 'FirstName',
                                placeholder: 'Please Enter Your First Name ...',
                                type: 'text',
                                value: formikEditProfile.values.FirstName,
                                formik: formikEditProfile,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1 items-center">
                              <Profile className="text-[#292D32] dark:text-white" size="12" />
                              <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">
                                {t('last_name')}
                              </span>
                            </div>
                            <AppInput
                              props={{
                                label: null,
                                required: false,
                                error: formikEditProfile.errors.LastName,
                                name: 'LastName',
                                placeholder: 'Please Enter Your Last Name ...',
                                type: 'text',
                                value: formikEditProfile.values.LastName,
                                formik: formikEditProfile,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-[30px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1 items-center">
                              <Sms className="text-[#292D32] dark:text-white" size="12" />
                              <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">
                                {t('email')}
                              </span>
                            </div>
                            <AppInput
                              props={{
                                label: null,
                                required: false,
                                error: formikEditProfile.errors.Email,
                                name: 'Email',
                                placeholder: 'Please Enter Your Email ...',
                                type: 'text',
                                value: formikEditProfile.values.Email,
                                formik: formikEditProfile,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1 items-center">
                              <CallCalling className="text-[#292D32] dark:text-white" size="12" />
                              <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">
                                {t('phone')}
                              </span>
                            </div>
                            <AppInput
                              props={{
                                label: null,
                                required: false,
                                error: formikEditProfile.errors.Phone,
                                name: 'Phone',
                                placeholder: '0013240450',
                                type: 'text',
                                value: formikEditProfile.values.Phone,
                                formik: formikEditProfile,
                              }}
                            />
                          </div>
                        </div>
                        {/*<div className="w-full grid grid-cols-2 gap-[30px]">*/}
                        {/*  <div className="flex flex-col gap-1">*/}
                        {/*    <div className="flex gap-1 items-center">*/}
                        {/*      <svg*/}
                        {/*        fill="none"*/}
                        {/*        height="12"*/}
                        {/*        viewBox="0 0 12 12"*/}
                        {/*        width="12"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*      >*/}
                        {/*        <path*/}
                        {/*          d="M11.7755 2.02495L10.013 10.275C9.88172 10.8562 9.54422 10.9875 9.05672 10.725L6.41297 8.77495L5.11922 10.0125C4.98797 10.1437 4.85672 10.275 4.55672 10.275L4.76297 7.5562L9.69422 3.07495C9.90047 2.8687 9.63797 2.7937 9.37547 2.96245L3.24422 6.82495L0.600469 6.0187C0.0192192 5.8312 0.0192192 5.43745 0.731719 5.17495L11.0067 1.1812C11.513 1.0312 11.9442 1.2937 11.7755 2.02495Z"*/}
                        {/*          fill="black"*/}
                        {/*        />*/}
                        {/*      </svg>*/}
                        {/*      <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">*/}
                        {/*        Telegram ID*/}
                        {/*      </span>*/}
                        {/*    </div>*/}
                        {/*    <AppInput*/}
                        {/*      props={{*/}
                        {/*        label: null,*/}
                        {/*        required: false,*/}
                        {/*        error: formikEditProfile.errors.oldPass,*/}
                        {/*        name: "firstname",*/}
                        {/*        placeholder: "Eva",*/}
                        {/*        type: "text",*/}
                        {/*        value: formikEditProfile.values.oldPass,*/}
                        {/*        formik: formikEditProfile,*/}
                        {/*      }}*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*  <div className="flex flex-col gap-1">*/}
                        {/*    <div className="flex gap-1 items-center">*/}
                        {/*      <svg*/}
                        {/*        fill="none"*/}
                        {/*        height="12"*/}
                        {/*        viewBox="0 0 12 12"*/}
                        {/*        width="12"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*      >*/}
                        {/*        <path*/}
                        {/*          d="M3.46973 2.5005C3.46959 2.76572 3.36411 3.02002 3.17648 3.20746C2.98885 3.3949 2.73444 3.50013 2.46923 3.5C2.20401 3.49987 1.94971 3.39438 1.76227 3.20675C1.57482 3.01912 1.46959 2.76472 1.46973 2.4995C1.46986 2.23428 1.57534 1.97998 1.76297 1.79254C1.9506 1.6051 2.20501 1.49987 2.47023 1.5C2.73544 1.50013 2.98974 1.60562 3.17719 1.79325C3.36463 1.98088 3.46986 2.23528 3.46973 2.5005ZM3.49973 4.2405H1.49973V10.5005H3.49973V4.2405ZM6.65973 4.2405H4.66973V10.5005H6.63973V7.2155C6.63973 5.3855 9.02473 5.2155 9.02473 7.2155V10.5005H10.9997V6.5355C10.9997 3.4505 7.46973 3.5655 6.63973 5.0805L6.65973 4.2405Z"*/}
                        {/*          fill="black"*/}
                        {/*        />*/}
                        {/*      </svg>*/}
                        {/*      <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">*/}
                        {/*        Linkedin ID*/}
                        {/*      </span>*/}
                        {/*    </div>*/}
                        {/*    <AppInput*/}
                        {/*      props={{*/}
                        {/*        label: null,*/}
                        {/*        required: false,*/}
                        {/*        error: formik.errors.oldPass,*/}
                        {/*        name: "firstname",*/}
                        {/*        placeholder: "Robinson",*/}
                        {/*        type: "text",*/}
                        {/*        value: formik.values.oldPass,*/}
                        {/*        formik: formik,*/}
                        {/*      }}*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/*<div className="w-full grid grid-cols-2 gap-[30px]">*/}
                        {/*  <div className="flex flex-col gap-1">*/}
                        {/*    <div className="flex gap-1 items-center">*/}
                        {/*      <svg*/}
                        {/*        fill="none"*/}
                        {/*        height="12"*/}
                        {/*        viewBox="0 0 12 12"*/}
                        {/*        width="12"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*      >*/}
                        {/*        <path*/}
                        {/*          d="M11.7755 2.02495L10.013 10.275C9.88172 10.8562 9.54422 10.9875 9.05672 10.725L6.41297 8.77495L5.11922 10.0125C4.98797 10.1437 4.85672 10.275 4.55672 10.275L4.76297 7.5562L9.69422 3.07495C9.90047 2.8687 9.63797 2.7937 9.37547 2.96245L3.24422 6.82495L0.600469 6.0187C0.0192192 5.8312 0.0192192 5.43745 0.731719 5.17495L11.0067 1.1812C11.513 1.0312 11.9442 1.2937 11.7755 2.02495Z"*/}
                        {/*          fill="black"*/}
                        {/*        />*/}
                        {/*      </svg>*/}
                        {/*      <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">*/}
                        {/*        Instagram ID*/}
                        {/*      </span>*/}
                        {/*    </div>*/}
                        {/*    <AppInput*/}
                        {/*      props={{*/}
                        {/*        label: null,*/}
                        {/*        required: false,*/}
                        {/*        error: formik.errors.oldPass,*/}
                        {/*        name: "firstname",*/}
                        {/*        placeholder: "Eva",*/}
                        {/*        type: "text",*/}
                        {/*        value: formik.values.oldPass,*/}
                        {/*        formik: formik,*/}
                        {/*      }}*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*  <div className="flex flex-col gap-1">*/}
                        {/*    <div className="flex gap-1 items-center">*/}
                        {/*      <svg*/}
                        {/*        fill="none"*/}
                        {/*        height="12"*/}
                        {/*        viewBox="0 0 12 12"*/}
                        {/*        width="12"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*      >*/}
                        {/*        <path*/}
                        {/*          d="M3.46973 2.5005C3.46959 2.76572 3.36411 3.02002 3.17648 3.20746C2.98885 3.3949 2.73444 3.50013 2.46923 3.5C2.20401 3.49987 1.94971 3.39438 1.76227 3.20675C1.57482 3.01912 1.46959 2.76472 1.46973 2.4995C1.46986 2.23428 1.57534 1.97998 1.76297 1.79254C1.9506 1.6051 2.20501 1.49987 2.47023 1.5C2.73544 1.50013 2.98974 1.60562 3.17719 1.79325C3.36463 1.98088 3.46986 2.23528 3.46973 2.5005ZM3.49973 4.2405H1.49973V10.5005H3.49973V4.2405ZM6.65973 4.2405H4.66973V10.5005H6.63973V7.2155C6.63973 5.3855 9.02473 5.2155 9.02473 7.2155V10.5005H10.9997V6.5355C10.9997 3.4505 7.46973 3.5655 6.63973 5.0805L6.65973 4.2405Z"*/}
                        {/*          fill="black"*/}
                        {/*        />*/}
                        {/*      </svg>*/}
                        {/*      <span className="font-normal leading-normal text-xs text-secondary-1000 dark:text-white">*/}
                        {/*        Linkedin ID*/}
                        {/*      </span>*/}
                        {/*    </div>*/}
                        {/*    <AppInput*/}
                        {/*      props={{*/}
                        {/*        label: null,*/}
                        {/*        required: false,*/}
                        {/*        error: formik.errors.oldPass,*/}
                        {/*        name: "firstname",*/}
                        {/*        placeholder: "Robinson",*/}
                        {/*        type: "text",*/}
                        {/*        value: formik.values.oldPass,*/}
                        {/*        formik: formik,*/}
                        {/*      }}*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {/*<div className="w-full">*/}
                        {/*  <AppTextArea*/}
                        {/*    props={{*/}
                        {/*      label: "Descriptions",*/}
                        {/*      required: false,*/}
                        {/*      error: formik.errors.oldPass,*/}
                        {/*      name: "firstname",*/}
                        {/*      placeholder: "",*/}
                        {/*      type: "text",*/}
                        {/*      value: formik.values.oldPass,*/}
                        {/*      formik: formik,*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/*</div>*/}
                      </div>
                      <div className="flex gap-7 justify-end">
                        {showSubmitButton && (
                          <>
                            <Button
                              className="text-xl font-normal !px-3 !py-1.5"
                              color="default"
                              variant="light"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white !px-3 !py-1.5"
                              type="submit"
                            >
                              Save Changes
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-3 w-full">
              <div className="bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 rounded-5 px-3 !py-3 w-full h-full">
                <Form onSubmit={formikGeneralSetting.handleSubmit}>
                  <div className="flex justify-between border-b-1 border-netural-100 dark:border-netural-700 pb-1.5 w-full">
                    <span className="text-secondary-900 dark:text-white text-xl font-normal leading-normal">
                      General Setting
                    </span>

                    <div className="flex gap-1.5">
                      <Button
                        className="flex gap-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 !rounded-4 !h-[30px] !min-w-fit !px-2 !py-1"
                        onPress={onOpenDeActiveConfirmOpen}
                      >
                        <UserRemove className="" size="16" />
                        <span className="text-secondary-1000 dark:text-white font-normal text-base">
                          Deactivate Account
                        </span>
                      </Button>
                      <Button
                        className="!p-1 !rounded-4 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 !min-w-fit !w-[30px] !h-[30px]"
                        onPress={() => setShowGeneralSettingButton(!showGeneralSettingButton)}
                      >
                        <Edit className="text-secondary-1000" size="18" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 mt-4 px-6">
                    <div className="bg-secondary-400 dark:bg-surface-200 !h-10 !rounded-4 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit flex gap-2 items-center">
                      <VolumeHigh className="text-white" size="22" />
                      <span className="text-white text-xl font-normal leading-normal">
                        Notifications
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 px-5">
                      <Switch
                        color="danger"
                        defaultSelected={setting.Panel}
                        name="NotificationByEmail"
                        size="sm"
                      >
                        <span className="text-secondary-1000 dark:text-white text-base leading-6 font-normal font-inter">
                          Messenger
                        </span>
                      </Switch>
                      <Switch
                        color="danger"
                        defaultSelected={setting.Sms}
                        name="NotificationBySms"
                        size="sm"
                      >
                        <span className="text-secondary-1000 dark:text-white text-base leading-6 font-normal font-inter">
                          SMS
                        </span>
                      </Switch>
                      <Switch
                        color="danger"
                        defaultSelected={setting.Emai}
                        isSelected={formikGeneralSetting.values.NotificationByEmail}
                        size="sm"
                        onValueChange={(val) =>
                          formikGeneralSetting.setFieldValue('NotificationByEmail', val)
                        }
                      >
                        <span className="text-secondary-1000 dark:text-white text-base leading-6 font-normal font-inter">
                          Email
                        </span>
                      </Switch>
                    </div>

                    <div className="bg-secondary-400 dark:bg-surface-200 !h-10 !rounded-4 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit flex gap-2 items-center">
                      <JobOffersIcon
                        props={{
                          color: '#fff',
                        }}
                      />
                      <span className="text-white text-xl font-normal leading-normal">Offers</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Switch
                        color="danger"
                        defaultSelected={setting.OldCompanies}
                        isSelected={formikGeneralSetting.values.AdaptationWithOldCompanies}
                        size="sm"
                        onValueChange={(val) =>
                          formikGeneralSetting.setFieldValue('AdaptationWithOldCompanies', val)
                        }
                      >
                        <span className="text-secondary-1000 dark:text-white text-base leading-6 font-normal font-inter">
                          Offer my resume to previous companies
                        </span>
                      </Switch>
                      <Switch
                        color="danger"
                        defaultSelected={setting.LowerSalary}
                        isSelected={formikGeneralSetting.values.AdaptationWithLowerSalary}
                        size="sm"
                        onValueChange={(val) =>
                          formikGeneralSetting.setFieldValue('AdaptationWithLowerSalary', val)
                        }
                      >
                        <span className="text-secondary-1000 dark:text-white text-base leading-6 font-normal font-inter">
                          Offer resume to opportunities lower than my requested salary
                        </span>
                      </Switch>
                    </div>

                    <div className="flex flex-col gap-1">
                      <AppAutoComplete
                        props={{
                          name: 'AdaptationWithCompanyPersonal',
                          label: 'Resume for Small Companies',
                          placeholder: 'Please Select Resume For Small Companies ...',
                          required: true,
                          value: formikGeneralSetting.values.AdaptationWithCompanyPersonal,
                          displayKey: 'label',
                          formikGeneralSetting,
                          error:
                            formikGeneralSetting.touched.AdaptationWithCompanyPersonal &&
                            formikGeneralSetting.errors.AdaptationWithCompanyPersonal,
                          data: companyPeopleOptions,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <AppAutoComplete
                        props={{
                          name: 'AdaptationWithCurrentCompanies',
                          label: 'Resume for Selected Industries',
                          placeholder: 'Please Selected Industries ...',
                          required: true,
                          value: formikGeneralSetting.values.AdaptationWithCurrentCompanies,
                          displayKey: 'Name',
                          formikGeneralSetting,
                          error:
                            formikGeneralSetting.touched.AdaptationWithCurrentCompanies &&
                            formikGeneralSetting.errors.AdaptationWithCurrentCompanies,
                          data: industries,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <AppAutoComplete
                        props={{
                          name: 'AdaptationWithOldCompanies',
                          label: 'Resume for Selected Companies',
                          placeholder: 'Please Select Companies ...',
                          required: true,
                          value: formikGeneralSetting.values.AdaptationWithOldCompanies,
                          displayKey: 'label',
                          formikGeneralSetting,
                          error:
                            formikGeneralSetting.touched.AdaptationWithOldCompanies &&
                            formikGeneralSetting.errors.AdaptationWithOldCompanies,
                          data: companyPeopleOptions,
                        }}
                      />
                    </div>
                    <div className="flex gap-7 justify-end w-full">
                      {showGeneralSettingButton && (
                        <>
                          <Button
                            className="text-xl font-normal !px-3 !py-1.5"
                            color="default"
                            variant="light"
                          >
                            Cancel
                          </Button>
                          <Button className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white !px-3 !py-1.5">
                            Save Changes
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <Modal
              backdrop="blur"
              classNames={{
                closeButton:
                  'right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent',
              }}
              isOpen={isOpen}
              size="3xl"
              onOpenChange={onOpenChange}
            >
              <ModalContent className="rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12">
                {(onClose) => (
                  <div className="flex flex-col gap-8">
                    <ModalHeader className="flex flex-col gap-1 !p-0">
                      <div className="flex justify-between items-center">
                        <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                          <Lock className="text-white" size="22" />
                          <span className="text-white font-normal text-xl">Confirm Password</span>
                        </div>
                      </div>
                    </ModalHeader>
                    <ModalBody className="!p-0">
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <div className="px-3 py-1.5 flex gap-2 items-center">
                            <MedalStar className="text-secondary-400" size="22" />
                            <span className="text-secondary-400 text-xl font-normal leading-normal">
                              Rulls
                            </span>
                          </div>
                          <p className="text-secondary-900 text-base font-normal leading-normal">
                            To change your password, go to account settings and select &#34;Change
                            Password.&#34; Enter your current password, then create a new strong
                            password. Confirm the new password and save the changes to enhance your
                            account security.
                          </p>
                        </div>
                        <Form
                          className="w-full flex flex-col gap-6"
                          id="change-password-form"
                          onSubmit={formikChangePassword.handleSubmit}
                        >
                          <div className="grid grid-cols-2 gap-[52px] w-full">
                            <div className="col-span-1 flex flex-col gap-1">
                              <AppInput
                                props={{
                                  label: 'Current password',
                                  required: true,
                                  error: formikChangePassword.errors.oldPass,
                                  name: 'oldPass',
                                  placeholder: 'Enter Your Current Password ...',
                                  type: 'text',
                                  value: formikChangePassword.values.oldPass,
                                  formik: formikChangePassword,
                                }}
                              />
                            </div>
                            <div className="col-span-1 flex flex-col gap-1">
                              <AppInput
                                props={{
                                  label: 'New password',
                                  required: true,
                                  error: formikChangePassword.errors.newPass,
                                  name: 'newPass',
                                  placeholder: 'Enter Your New Password ...',
                                  type: 'text',
                                  value: formikChangePassword.values.newPass,
                                  formik: formikChangePassword,
                                }}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-[52px] w-full">
                            <div className="col-span-1 flex flex-col gap-1">
                              <AppInput
                                props={{
                                  label: 'Repeat password',
                                  required: true,
                                  error: formikChangePassword.errors.repeatPass,
                                  name: 'repeatPass',
                                  placeholder: 'Enter Your Repeat Password ...',
                                  type: 'text',
                                  value: formikChangePassword.values.repeatPass,
                                  formik: formikChangePassword,
                                }}
                              />
                            </div>
                          </div>
                        </Form>
                      </div>
                    </ModalBody>
                    <ModalFooter className="!p-0">
                      <Button
                        className="text-base font-medium text-secondary-800 !min-w-fit !px-3 !py-1.5 !rounded-4"
                        color="default"
                        variant="light"
                        onPress={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white !min-w-fit !px-3 !py-1.5 !rounded-4"
                        form="change-password-form"
                        type="submit"
                      >
                        Confirm
                      </Button>
                    </ModalFooter>
                  </div>
                )}
              </ModalContent>
            </Modal>
            <Modal
              backdrop="blur"
              classNames={{
                closeButton:
                  'right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent',
              }}
              isOpen={isDeActiveConfirmOpen}
              size="2xl"
              onOpenChange={onDeActiveConfirmOpenChange}
            >
              <ModalContent className="rounded-[12px] bg-white/30 dark:bg-[#01101a4d] shadow-md backdrop-blur-[40px] p-12">
                {(onClose) => (
                  <div className="flex flex-col gap-10">
                    <ModalHeader className="!p-0">
                      <div className="flex justify-between items-center w-full">
                        <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">
                          <UserRemove className="text-white" size="18" />
                          <span className="text-xl text-white font-normal leading-normal">
                            Would it be acceptable for you to Deactivate Accounh ?
                          </span>
                        </div>
                      </div>
                    </ModalHeader>
                    <ModalBody className="p-0">
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                          <MedalStar className="text-secondary-400" size="22" />
                          <span className="text-secondary-400 text-xl font-normal">Rulls</span>
                        </div>
                        <p className="text-secondary-900 text-base font-normal">
                          Considering that the HRLINK system is a job recommendation software, if
                          you do not wish to receive job offers, please change this option to
                          inactive.
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter className="!p-0 items-center">
                      <Button
                        className="text-secondary-800 dark:text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                        color="default"
                        variant="light"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit !h-fit"
                        onPress={() => {
                          console.log('Location deleted');
                          onClose();
                        }}
                      >
                        Deactive
                      </Button>
                    </ModalFooter>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </div>
        ),
      }}
    />
  );
}
