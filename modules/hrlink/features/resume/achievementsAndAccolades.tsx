import { Button } from '@heroui/button';
import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  Edit,
  Link21,
  ReceiveSquare,
  SearchNormal1,
  Trash,
} from 'iconsax-react';
import { Form, Input } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ResumeLayout } from '@/pages/Resume/Layout.tsx';
import { AppPagination } from '@/components/AppPagination.tsx';
import { AppGeneralDetails } from '@/components/AppGeneralDetails.tsx';
import { AppMap } from '@/components/AppMap.tsx';
import { CupStar } from '@/icons/cupStar.tsx';
import { CloseIcon } from '@/icons/closeIcon.tsx';
import { AppInput } from '@/components/AppInput.tsx';
import { AppTextArea } from '@/components/AppTextArea.tsx';
import { AppDatePicker } from '@/components/AppDatePicker.tsx';
import {
  handleCreateAwardApi,
  handleDeleteAwardApi,
  handleEditAwardApi,
  handleFetchAwardListApi,
  handleSearchAwardApi,
} from '@/services/Resume/Awards/apis.ts';
import { AppDispatch, RootState } from '@/redux/createStore.ts';
import { AppModal } from '@/components/AppModal.tsx';
import axios from 'axios';
// import axios from "axios";

export default function ResumeAchievementsAccolades() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [achievmentId, setAchievmentId] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [editAchievementData, setEditAchievementData] = useState<any>({});
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const awards = useSelector((state: RootState) => state.resume.awards.data);
  const handleNavigateToHardSkills = () => {
    navigate('/resume/hard-skills');
  };
  const handleNavigateToCourses = () => {
    navigate('/resume/courses');
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(false);
    setAchievmentId(id);
  };

  const handleSearchAward = (searchTerm: any) => {
    const searchAwardData = {
      Name: searchTerm.target.value,
    };

    dispatch(handleSearchAwardApi(searchAwardData));
  };

  const formikCreateAward = useFormik({
    initialValues: {
      Name: '',
      Date: '',
      AttachmentUrl: '',
      Comment: '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required(),
      Date: Yup.date().required(),
      AttachmentUrl: Yup.string().required(),
      Comment: Yup.string(),
    }),
    onSubmit: (values) => {
      const newAwardData = {
        Name: values.Name,
        GainYear: values.Date.split('/')[0],
        AttachmentUrl: values.AttachmentUrl,
        Comment: values.Comment,
        GainMonth: values.Date.split('/')[1],
      };

      dispatch(handleCreateAwardApi(newAwardData));
    },
  });

  const formikEditAward = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id: editAchievementData.Id || '',
      Name: editAchievementData.Name || '',
      Date: editAchievementData.GainYear || '',
      AttachmentUrl: editAchievementData.AttachmentUrl || '',
      Comment: editAchievementData.Comment || '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required(),
      Date: Yup.string().required(),
      AttachmentUrl: Yup.string().required(),
      Comment: Yup.string(),
    }),
    onSubmit: (values) => {
      const editAwardData = {
        Id: values.Id,
        Name: values.Name,
        GainYear: values.Date.split('/')[0],
        AttachmentUrl: values.AttachmentUrl,
        Comment: values.Comment,
        GainMonth: values.Date.split('/')[1],
      };

      dispatch(handleEditAwardApi(editAwardData));
    },
  });

  // useEffect(() => {
  //   axios
  //     .post(
  //       `https://hrlink.hrbox.me:50443/DesktopModules/SSO/api/Login/Login`,
  //       {
  //         UserName: '4311690622',
  //         Password: 'Nim@4311',
  //       },
  //       {
  //         method: 'POST',
  //         withCredentials: true,
  //       },
  //     )
  //     .then(() => {
  //       dispatch(handleFetchAwardListApi());
  //     });
  // axios.get(
  //   "https://hrlink.hrbox.me:50443/DesktopModules/Freelancer/api/Award/GetList",
  //   { withCredentials: true },
  // );
  // dispatch(handleFetchAwardListApi());
  // }, []);

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
                  <CupStar
                    props={{
                      color: '#fff',
                    }}
                  />
                  <span className="text-white text-xl font-normal">Achievements and accolades</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToHardSkills}
                >
                  <ArrowLeft2 className="text-secondary-1000 dark:text-white" size="24" />
                </Button>
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToCourses}
                >
                  <ArrowRight2 className="text-secondary-1000 dark:text-white" size="24" />
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    {!isSearchOpen && (
                      <Button
                        isIconOnly
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                        onPress={() => setIsSearchOpen(true)}
                      >
                        <SearchNormal1 className="text-secondary-1000 dark:text-white" size="24" />
                      </Button>
                    )}

                    <AnimatePresence>
                      {isSearchOpen && (
                        <motion.div
                          key="search-input"
                          animate={{ opacity: 1, width: '300px' }}
                          className="overflow-hidden"
                          exit={{ opacity: 0, width: 0 }}
                          initial={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <Input
                            classNames={{
                              inputWrapper: '!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-4',
                            }}
                            endContent={
                              <button onClick={() => setIsSearchOpen(false)}>
                                <CloseIcon />
                              </button>
                            }
                            placeholder="Search Sth"
                            startContent={
                              <SearchNormal1
                                className="text-secondary-1000 dark:text-white"
                                size="22"
                              />
                            }
                            type="text"
                            onChange={(e) => handleSearchAward(e)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <Button
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                  color="default"
                  variant="light"
                  onPress={() => setOpenCreateModal(true)}
                >
                  <Add className="text-secondary-1000 dark:text-white" size="16" />
                  <span className="text-secondary-1000 dark:text-white font-semibold text-base">
                    Add New One
                  </span>
                </Button>
                <Button
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                  color="default"
                  variant="light"
                >
                  <ReceiveSquare className="text-secondary-1000 dark:text-white" size="16" />
                  <span className="text-secondary-1000 dark:text-white font-semibold text-base">
                    Download Resume
                  </span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 h-[calc(100%-64px)]">
              <div className="col-span-3">
                <div className="flex flex-col h-full justify-between">
                  <div className="grid grid-cols-2 gap-3">
                    {awards.map((achievement: any, index) => (
                      <div
                        key={index}
                        className="rounded-5 shadow-shadow-light-tight/1 dark:shadow-shadow-dark-tight/1 p-4 bg-white dark:bg-info-1000"
                      >
                        <div className="flex flex-col gap-2.5">
                          <div className="flex flex-col gap-1.5 border-b-1 border-netural-100 pb-1.5">
                            <div className="flex justify-between">
                              <div className="flex gap-1.5">
                                <CupStar
                                  props={{
                                    color: '#04070e',
                                  }}
                                />
                                <span className="text-base font-semibold text-secondary-1000 dark:text-white">
                                  {achievement.name}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"
                                  variant="light"
                                  onPress={() => {
                                    setEditAchievementData(achievement);
                                    setOpenEditModal(true);
                                  }}
                                >
                                  <Edit className="text-secondary-1000 dark:text-white" size="14" />
                                </Button>
                                <Button
                                  className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"
                                  variant="light"
                                  onPress={() => {
                                    handleOpenDeleteModal(achievement?.Id);
                                    setOpenDeleteModal(true);
                                  }}
                                >
                                  <Trash
                                    className="text-secondary-1000 dark:text-white"
                                    size="14"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <div className="flex flex-col gap-2">
                                <div className="flex gap-4">
                                  <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                                    title:
                                  </span>
                                  <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                                    {achievement.Name}
                                  </span>
                                </div>
                                <div className="flex gap-4">
                                  <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                                    Date:
                                  </span>
                                  <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                                    {achievement.GainYear + '/' + achievement.GainMonth}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                                Description:
                              </span>
                              <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                                {achievement.Comment}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <AppPagination
                      props={{
                        total: 10,
                        size: 'md',
                      }}
                    />
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
            <AppModal
              footer={
                <div>
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenEditModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 text-xl font-normal text-white"
                    form="edit-award-form"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                      <CupStar
                        props={{
                          color: '#fff',
                        }}
                      />
                      <span className="text-white font-normal text-xl">
                        Edit Achievements and accolades
                      </span>
                    </div>
                  </div>
                </div>
              }
              isOpen={openEditModal}
              size="3xl"
              onClose={() => setOpenEditModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                id="edit-award-form"
                onSubmit={formikEditAward.handleSubmit}
              >
                <div className="flex gap-[52px] w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Title',
                        required: true,
                        error: formikEditAward.errors.Name,
                        name: 'Name',
                        placeholder: 'Please Enter Title ...',
                        type: 'text',
                        value: formikEditAward.values.Name,
                        formik: formikEditAward,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'Date',
                        required: true,
                        error: formikEditAward.errors.Date,
                        name: 'Date',
                        placeholder: 'Please Enter Date ...',
                        formik: formikEditAward,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-[52px] w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Upload portfolio',
                        required: true,
                        error: formikEditAward.errors.AttachmentUrl,
                        name: 'AttachmentUrl',
                        placeholder: 'Please Enter Attachment Portfolio ...',
                        type: 'text',
                        value: formikEditAward.values.AttachmentUrl,
                        formik: formikEditAward,
                        endContent: <Link21 size="24" />,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2" />
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <AppTextArea
                      props={{
                        label: 'Description',
                        required: true,
                        error: formikEditAward.errors.Comment,
                        name: 'Comment',
                        placeholder: 'Please Enter Description ...',
                        value: formikEditAward.values.Comment,
                        formik: formikEditAward,
                      }}
                    />
                  </div>
                </div>
              </Form>
            </AppModal>

            <AppModal
              footer={
                <div>
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenCreateModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 text-xl font-normal text-white"
                    form="create-award-form"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              }
              header={
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                      <CupStar
                        props={{
                          color: '#fff',
                        }}
                      />
                      <span className="text-white font-normal text-xl">
                        Add Achievements and accolades
                      </span>
                    </div>
                  </div>
                </div>
              }
              isOpen={openCreateModal}
              size="3xl"
              onClose={() => setOpenCreateModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                id="create-award-form"
                onSubmit={formikCreateAward.handleSubmit}
              >
                <div className="flex gap-[52px] w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Title',
                        required: true,
                        error: formikCreateAward.errors.Name,
                        name: 'Name',
                        placeholder: 'Please Enter Name ...',
                        type: 'text',
                        value: formikCreateAward.values.Name,
                        formik: formikCreateAward,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'Date',
                        required: true,
                        error: formikCreateAward.errors.Date,
                        name: 'Date',
                        placeholder: 'Please Enter Date ...',
                        formik: formikCreateAward,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-[52px] w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Upload portfolio',
                        required: true,
                        error: formikCreateAward.errors.AttachmentUrl,
                        name: 'AttachmentUrl',
                        placeholder: 'Please Enter Attachment Portfolio ...',
                        type: 'text',
                        value: formikCreateAward.values.AttachmentUrl,
                        formik: formikCreateAward,
                        endContent: <Link21 size="24" />,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2" />
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <AppTextArea
                      props={{
                        label: 'Description',
                        required: true,
                        error: formikCreateAward.errors.Comment,
                        name: 'Comment',
                        placeholder: 'Please Enter Description ...',
                        value: formikCreateAward.values.Comment,
                        formik: formikCreateAward,
                      }}
                    />
                  </div>
                </div>
              </Form>
            </AppModal>

            <AppModal
              footer={
                <div className="flex !p-0 items-center justify-end">
                  <Button
                    className="text-secondary-800 dark:text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                    color="default"
                    variant="light"
                    onPress={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit !h-fit"
                    onPress={() => dispatch(handleDeleteAwardApi(achievmentId))}
                  >
                    Delete
                  </Button>
                </div>
              }
              isOpen={openDeleteModal}
              size="3xl"
              onClose={() => setOpenDeleteModal(false)}
            >
              <div className="!p-0">
                <div className="flex justify-between items-center w-full">
                  <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">
                    <Trash className="text-white" size="18" />
                    <span className="text-xl text-white font-normal leading-normal">
                      Would it be acceptable for you to remove this?
                    </span>
                  </div>
                </div>
              </div>
            </AppModal>
          </div>
        ),
      }}
    />
  );
}
