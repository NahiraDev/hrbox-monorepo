import { Button } from '@heroui/button';
import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  FavoriteChart,
  Personalcard,
  ReceiveSquare,
  SearchNormal1,
} from 'iconsax-react';
import { Form, Input } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-jalaali';

import { AppInput } from '@/components/AppInput.tsx';
import { ResumeLayout } from '@/pages/Resume/Layout.tsx';
import AppTable from '@/components/AppTable.tsx';
import { AppGeneralDetails } from '@/components/AppGeneralDetails.tsx';
import { AppMap } from '@/components/AppMap.tsx';
import { CloseIcon } from '@/icons/closeIcon.tsx';
import { AppAutoComplete } from '@/components/AppAutoComplete.tsx';
import { AppDispatch, RootState } from '@/redux/createStore.ts';
import {
  handleCreateJobExperienceApi,
  handleDeleteJobExperienceApi,
  handleEditJobExperienceApi,
  handleFetchJobExperienceDetailApi,
  handleFetchJobExperienceListApi,
  handleFetchTypeOfActivityApi,
  handleGetCitiesApi,
  handleGetIndustriesApi,
  handleGetJobGroupApi,
  handleSearchJobExperienceApi,
} from '@/services/Resume/JobExperience/apis.ts';
import { AppDatePicker } from '@/components/AppDatePicker.tsx';
import { AppTextArea } from '@/components/AppTextArea.tsx';
import { AppModal } from '@/components/AppModal.tsx';

export default function JobExperience() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [experienceId, setExperienceId] = useState<string>('');
  const [editJobExperienceData, setEditJobExperienceData] = useState<any>(null);
  const lang = useSelector((state: RootState) => state.language.lang);
  const experienceData: any = useSelector((state: RootState) => state.resume.jobExperience);
  const currentPage = experienceData?.pagination?.Page;
  const pageSize = experienceData?.pagination?.PageSize;
  const dispatch = useDispatch<AppDispatch>();
  const handleNavigateToAcamedicHistory = () => {
    navigate('/resume/academic-history');
  };
  const handleNavigateToResumeInfo = () => {
    navigate('/resume/info');
  };

  const [openAddNewExperience, setOpenAddNewExperience] = useState<boolean>(false);
  const [openEditNewExperience, setOpenEditNewExperience] = useState<boolean>(false);

  const formikCreateExperience = useFormik({
    initialValues: {
      JobName: '',
      CompanyName: '',
      Achievements: '',
      StopCooperatingReason: '',
      Salary: '',
      StartDate: '',
      EndDate: '',
      PlaceId: '',
      IndustryId: '',
      JobGroupId: '',
      TypeOfActivity: '',
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newExperienceData = {
        JobName: values.JobName,
        CompanyName: values.CompanyName,
        IndustryId: Number(values.IndustryId),
        JobGroupId: Number(values.JobGroupId),
        PlaceId: Number(values.PlaceId),
        StopCooperatingReason: values.StopCooperatingReason,
        Salary: values.Salary,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        TypeOfActivity: Number(values.TypeOfActivity),
        Achievements: values.Achievements,
      };

      dispatch(handleCreateJobExperienceApi(newExperienceData));
      setOpenAddNewExperience(false);
      formikCreateExperience.setValues(resetFormData);
    },
  });

  const formattedData = experienceData.data.map((item: any, index: any) => {
    const city = experienceData.cities.find((city: any) => city.Id === item.PlaceId);

    const safeCurrentPage = currentPage > 0 ? currentPage : 1;
    const No = (safeCurrentPage - 1) * pageSize + index + 1;

    return {
      ...item,
      No,
      Timeline:
        lang === 'fa'
          ? `${moment(item.DateBegin).format('jYYYY/jMM/jDD')} - ${moment(item.DateEnd).format('jYYYY/jMM/jDD')}`
          : `${moment(item.DateBegin).format('YYYY/MM/DD')} - ${moment(item.DateEnd).format('YYYY/MM/DD')}`,
      Location: city?.Name ?? 'نامشخص',
    };
  });

  const formikEditExperience = useFormik({
    enableReinitialize: true,
    initialValues: {
      JobName: experienceData?.detail?.JobName || '',
      CompanyName: experienceData?.detail?.CompanyName || '',
      Achievements: experienceData?.detail?.Achievements || '',
      StopCooperatingReason: experienceData?.detail?.StopCooperatingReason || '',
      Salary: experienceData?.detail?.Salary || '',
      StartDate:
        lang === 'fa'
          ? moment(experienceData?.detail?.StartDate).format('jYYYY/jMM/jDD')
          : moment(experienceData?.detail?.StartDate).format('YYYY/MM/DD') || '',
      EndDate:
        lang === 'fa'
          ? moment(experienceData?.detail?.EndDate).format('jYYYY/jMM/jDD')
          : moment(experienceData?.detail?.EndDate).format('YYYY/MM/DD') || '',
      PlaceId: experienceData?.detail?.PlaceId ? String(experienceData.detail.PlaceId) : '',
      IndustryId: experienceData?.detail?.IndustryId
        ? String(experienceData.detail.IndustryId)
        : '',
      JobGroupId: experienceData?.detail?.JobGroupId || '',
      TypeOfActivity: experienceData?.detail?.TypeOfActivity || '',
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newExperienceData = {
        JobName: values.JobName,
        CompanyName: values.CompanyName,
        IndustryId: Number(values.IndustryId),
        JobGroupId: Number(values.JobGroupId),
        PlaceId: Number(values.PlaceId),
        Salary: values.Salary,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        TypeOfActivity: Number(values.TypeOfActivity),
        Achievements: values.Achievements,
      };

      dispatch(handleEditJobExperienceApi(newExperienceData));
      setOpenAddNewExperience(false);
      formikCreateExperience.setValues(resetFormData);
    },
  });

  const resetFormData = {
    JobName: '',
    CompanyName: '',
    IndustryId: '',
    JobGroupId: '',
    StopCooperatingReason: '',
    PlaceId: '',
    Salary: '',
    StartDate: '',
    EndDate: '',
    TypeOfActivity: '',
    Achievements: '',
  };

  const handleSearchExperience = (searchTerm: any) => {
    const searchExperienceData = {
      JobName: searchTerm.target.value,
    };

    dispatch(handleSearchJobExperienceApi(searchExperienceData));
  };

  const handleDeleteExperience = (id: string) => {
    dispatch(handleDeleteJobExperienceApi(id));
  };

  const handleFetchJobExperienceData = () => {
    setOpenEditNewExperience(true);
  };

  useEffect(() => {
    dispatch(handleFetchJobExperienceListApi());
    dispatch(handleFetchTypeOfActivityApi());
    dispatch(handleGetIndustriesApi());
    dispatch(handleGetJobGroupApi());
    dispatch(handleGetCitiesApi());
  }, [dispatch]);

  useEffect(() => {
    if (editJobExperienceData?.Id) {
      dispatch(handleFetchJobExperienceDetailApi(editJobExperienceData?.Id));
    }
  }, [editJobExperienceData]);

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
                <Personalcard className="text-white" size="22" />
                <span className="text-white text-xl font-normal">Work Experience</span>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToResumeInfo}
                >
                  <ArrowLeft2 className="text-secondary-1000 dark:text-white" size="24" />
                </Button>
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToAcamedicHistory}
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
                            onChange={(e) => handleSearchExperience(e)}
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
                  onPress={() => setOpenAddNewExperience(true)}
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
            <div className="grid grid-cols-4 gap-6 h-[calc(100%-64px)]">
              <div className="col-span-3">
                <AppTable
                  props={{
                    columns: [
                      { key: 'No', label: 'No.' },
                      { key: 'JobName', label: 'Title' },
                      { key: 'CompanyName', label: 'Company Name' },
                      { key: 'Timeline', label: 'Timeline' },
                      { key: 'Location', label: 'Location' },
                    ],
                    data: formattedData,
                    onOpenEditDialog: handleFetchJobExperienceData,
                    onEditData: setEditJobExperienceData,
                    onSetId: setExperienceId,
                    onDelete: () => handleDeleteExperience(experienceId),
                  }}
                />
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
                <div className="flex">
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenAddNewExperience(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white"
                    form="add-experience-form"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <FavoriteChart className="text-white" size="22" />
                  <span className="text-white font-normal text-xl">Add New Work Experience</span>
                </div>
              }
              isOpen={openAddNewExperience}
              size="4xl"
              onClose={() => setOpenAddNewExperience(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                id="add-experience-form"
                onSubmit={formikCreateExperience.handleSubmit}
              >
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Title',
                        required: true,
                        error: formikCreateExperience.errors.JobName,
                        name: 'JobName',
                        placeholder: 'Please Enter Title ...',
                        type: 'text',
                        value: formikCreateExperience.values.JobName,
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Company Name',
                        required: true,
                        error: formikCreateExperience.errors.CompanyName,
                        name: 'CompanyName',
                        placeholder: 'Please Enter Company Name ...',
                        type: 'text',
                        value: formikCreateExperience.values.CompanyName,
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'IndustryId',
                        label: 'Industry',
                        placeholder: 'Please Select Industry...',
                        required: true,
                        value: formikCreateExperience.values.IndustryId,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikCreateExperience,
                        error:
                          formikCreateExperience.touched.IndustryId &&
                          formikCreateExperience.errors.IndustryId,
                        data: experienceData.industries,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Salary received',
                        required: true,
                        isNumeric: true,
                        error: formikCreateExperience.errors.Salary,
                        name: 'Salary',
                        placeholder: 'Please Select Salary ...',
                        type: 'text',
                        value: formikCreateExperience.values.Salary,
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'Start Date',
                        required: true,
                        error: formikCreateExperience.errors.StartDate,
                        name: 'StartDate',
                        placeholder: 'Please Enter Start Date ...',
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'End Date',
                        required: true,
                        error: formikCreateExperience.errors.EndDate,
                        name: 'EndDate',
                        placeholder: 'Please Enter End Date ...',
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2 relative z-[9999]">
                    <AppAutoComplete
                      props={{
                        name: 'PlaceId',
                        label: 'City',
                        placeholder: 'Please Select City...',
                        required: true,
                        value: formikCreateExperience.values.PlaceId,
                        displayKey: `Name`,
                        valueKey: 'Id',
                        formik: formikCreateExperience,
                        error:
                          formikCreateExperience.touched.PlaceId &&
                          formikCreateExperience.errors.PlaceId,
                        data: experienceData.cities,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'JobGroupId',
                        label: 'Occupational group',
                        placeholder: 'Please Select Province...',
                        required: true,
                        value: formikCreateExperience.values.JobGroupId,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikCreateExperience,
                        error:
                          formikCreateExperience.touched.JobGroupId &&
                          formikCreateExperience.errors.JobGroupId,
                        data: experienceData.jobGroups,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Descriptions and Achievements',
                        required: true,
                        error: formikCreateExperience.errors.Achievements,
                        name: 'Achievements',
                        placeholder: 'Please Enter Descriptions and Achievements ...',
                        type: 'text',
                        value: formikCreateExperience.values.Achievements,
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'TypeOfActivity',
                        label: 'Type of cooperation',
                        placeholder: 'Please Select Type Of Cooperation ...',
                        required: true,
                        value: formikCreateExperience.values.TypeOfActivity,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikCreateExperience,
                        error:
                          formikCreateExperience.touched.TypeOfActivity &&
                          formikCreateExperience.errors.TypeOfActivity,
                        data: experienceData.typeOfActivity,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <AppTextArea
                      props={{
                        label: 'Resoins of Quit',
                        required: true,
                        error: formikCreateExperience.errors.StopCooperatingReason,
                        name: 'StopCooperatingReason',
                        placeholder: 'Please Enter Resins of Quit ...',
                        type: 'text',
                        value: formikCreateExperience.values.StopCooperatingReason,
                        formik: formikCreateExperience,
                      }}
                    />
                  </div>
                </div>
              </Form>
            </AppModal>
            <AppModal
              footer={
                <div className="flex">
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenAddNewExperience(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white"
                    form="add-experience-form"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <FavoriteChart className="text-white" size="22" />
                  <span className="text-white font-normal text-xl">Edit Work Experience</span>
                </div>
              }
              isOpen={openEditNewExperience}
              size="4xl"
              onClose={() => setOpenEditNewExperience(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                id="add-experience-form"
                onSubmit={formikEditExperience.handleSubmit}
              >
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Title',
                        required: true,
                        error: formikEditExperience.errors.JobName,
                        name: 'JobName',
                        placeholder: 'Please Enter Title ...',
                        type: 'text',
                        value: formikEditExperience.values.JobName,
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Company Name',
                        required: true,
                        error: formikEditExperience.errors.CompanyName,
                        name: 'CompanyName',
                        placeholder: 'Please Enter Company Name ...',
                        type: 'text',
                        value: formikEditExperience.values.CompanyName,
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'IndustryId',
                        label: 'Industry',
                        placeholder: 'Please Select Industry...',
                        required: true,
                        valueKey: 'Id',
                        displayKey: 'Name',
                        data: experienceData.industries || [],
                        formik: formikEditExperience,
                        error:
                          formikEditExperience.touched.IndustryId &&
                          formikEditExperience.errors.IndustryId,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Salary received',
                        required: true,
                        error: formikEditExperience.errors.Salary,
                        name: 'Salary',
                        placeholder: 'Please Select Salary ...',
                        type: 'text',
                        isNumeric: true,
                        value: formikEditExperience.values.Salary,
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'Start Date',
                        required: true,
                        error: formikEditExperience.errors.StartDate,
                        name: 'StartDate',
                        placeholder: 'Please Enter Start Date ...',
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: 'End Date',
                        required: true,
                        error: formikEditExperience.errors.EndDate,
                        name: 'EndDate',
                        placeholder: 'Please Enter End Date ...',
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2 relative z-[9999]">
                    <AppAutoComplete
                      props={{
                        name: 'PlaceId',
                        label: 'City',
                        placeholder: 'Please Select City...',
                        required: true,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikEditExperience,
                        error:
                          formikEditExperience.touched.PlaceId &&
                          formikEditExperience.errors.PlaceId,
                        data: experienceData.cities || [],
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'JobGroupId',
                        label: 'Occupational group',
                        placeholder: 'Please Select Province...',
                        required: true,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikEditExperience,
                        error:
                          formikEditExperience.touched.JobGroupId &&
                          formikEditExperience.errors.JobGroupId,
                        data: experienceData.jobGroups || [],
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: 'Descriptions and Achievements',
                        required: true,
                        error: formikEditExperience.errors.Achievements,
                        name: 'Achievements',
                        placeholder: 'Please Enter Descriptions and Achievements ...',
                        type: 'text',
                        value: formikEditExperience.values.Achievements,
                        formik: formikEditExperience,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: 'TypeOfActivity',
                        label: 'Type of cooperation',
                        placeholder: 'Please Select Type Of Cooperation ...',
                        required: true,
                        displayKey: 'Name',
                        valueKey: 'Id',
                        formik: formikEditExperience,
                        error:
                          formikEditExperience.touched.TypeOfActivity &&
                          formikEditExperience.errors.TypeOfActivity,
                        data: experienceData.typeOfActivity || [],
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <AppTextArea
                      props={{
                        label: 'Resoins of Quit',
                        required: true,
                        error: formikEditExperience.errors.StopCooperatingReason,
                        name: 'StopCooperatingReason',
                        placeholder: 'Please Enter Resoins of Quit ...',
                        type: 'text',
                        value: formikEditExperience.values.StopCooperatingReason,
                        formik: formikEditExperience,
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
