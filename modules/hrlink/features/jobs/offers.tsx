import {
  Buildings2,
  Clock,
  Dislike,
  DollarCircle,
  Like1,
  Location,
  SearchNormal1,
  Setting4,
  Status,
} from 'iconsax-react';
import { Button } from '@heroui/button';
import { Form, Input, Slider } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BaseLayout } from '../../../../core';
import { AppPagination } from '../../../../core/components';
import { JobOffersIcon } from '../../icons';
import {
  iranProvinces,
  militaryStatusOptions,
  sortByOptions,
  useAppDispatch,
  useAppSelector,
} from '../../../../core';
import {
  AppModal,
  AppAutoComplete,
  CloseIcon,
  AppInput,
} from '../../../../core';

import jobCompanyLogo from '@/assets/img/job-company-logo.png';

export default function JobOffers() {
  const [salaryValue, setSalaryValue] = useState<any>([100, 300]);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const jobOffersData = useAppSelector((state) => state.jobs.offers);
  const dispatch = useAppDispatch();
  const [selectedStates, setSelectedStates] = useState<
    Record<number, 'like' | 'dislike' | null>
  >({});
  const lang = useAppSelector((state) => state.language.lang);
  const buttonStyle = (
    current: 'like' | 'dislike' | null,
    type: 'like' | 'dislike',
  ) => {
    const isActive = current === type;

    return `
    !h-[22px] !w-[54px] !min-w-fit flex items-center gap-2 !px-1 !py-0.5 !rounded-2
    ${isActive ? 'bg-secondary-400' : 'bg-white dark:bg-info-1000'}
  `;
  };

  const textStyle = (
    current: 'like' | 'dislike' | null,
    type: 'like' | 'dislike',
  ) => {
    const isActive = current === type;

    return `text-[10px] font-normal ${
      isActive ? 'text-white' : 'text-secondary-1000 dark:text-white'
    }`;
  };

  const iconStyle = (
    current: 'like' | 'dislike' | null,
    type: 'like' | 'dislike',
  ) => {
    const isActive = current === type;

    return `${isActive ? 'text-white' : 'text-secondary-1000 dark:text-white'}`;
  };

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateToJobOppertunities = () => {
    navigate('/job/oppertunities');
  };

  const handleOpenJobDetails = (name: string) => {
    navigate('/job/detail/' + name);
  };
  const formik = useFormik({
    initialValues: {
      search_sth: '',
    },
    validationSchema: Yup.object({
      search_sth: Yup.string().required(),
    }),
    onSubmit: () => {},
  });

  const handleSearchJobOffers = (name: string) => {
    dispatch(handleSearchJobOffersApi(name));
  };

  useEffect(() => {
    dispatch(handleGetJobOffersApi());
  }, []);

  return (
    <BaseLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2 !rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <JobOffersIcon
                      props={{
                        color: '#fff',
                      }}
                    />
                    <span className="text-white text-xl font-normal">
                      Job Recommendations
                    </span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent"
                    onPress={handleNavigateToJobOppertunities}
                  >
                    <JobOppertunitiesIcon
                      props={{
                        color: darkMode ? '#fff' : '#1e3363',
                      }}
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      Job Opportunities
                    </span>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    {!isSearchOpen && (
                      <Button
                        isIconOnly
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                        onPress={() => setIsSearchOpen(true)}
                      >
                        <SearchNormal1
                          className="text-secondary-1000 dark:text-white"
                          size="24"
                        />
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
                              inputWrapper:
                                '!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-4',
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
                            onChange={(e: any) =>
                              handleSearchJobOffers(e.target.value)
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Button
                    className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                    color="default"
                    variant="light"
                    onPress={() => setOpenFilterModal(true)}
                  >
                    <Setting4 className="text-secondary-1000 dark:text-white" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-3 gap-3">
                  {jobOffersData &&
                    jobOffersData.map((job: any) => (
                      <button
                        key={job.id}
                        onClick={() => handleOpenJobDetails(job.company)}
                      >
                        <div
                          className="rounded-5 shadow-shadow-light-tight/1 px-3 py-4"
                          style={{
                            backgroundColor:
                              selectedStates[job.id] === 'dislike'
                                ? '#FBC3C3'
                                : selectedStates[job.id] === 'like'
                                  ? '#BFE7D0'
                                  : darkMode
                                    ? '#01101A'
                                    : '#FFF5F0',
                            backgroundImage: `url(${jobCompanyLogo})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundBlendMode: darkMode
                              ? 'darken'
                              : 'lighten',
                          }}
                        >
                          <div className="flex justify-between pb-1 border-b-1 border-netural-100 dark:border-netural-700">
                            <div className="flex items-center gap-2">
                              <Buildings2
                                className="text-secondary-400 dark:text-white"
                                size="22"
                              />
                              <span className="text-secondary-1000 dark:text-white font-semibold">
                                {job.company}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                className={buttonStyle(
                                  selectedStates[job.id],
                                  'dislike',
                                )}
                                variant="light"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStates((prev) => ({
                                    ...prev,
                                    [job.id]:
                                      prev[job.id] === 'dislike'
                                        ? null
                                        : 'dislike',
                                  }));
                                }}
                              >
                                <span
                                  className={textStyle(
                                    selectedStates[job.id],
                                    'dislike',
                                  )}
                                >
                                  Dislike
                                </span>
                                <Dislike
                                  className={iconStyle(
                                    selectedStates[job.id],
                                    'dislike',
                                  )}
                                  size="12"
                                  variant="Bold"
                                />
                              </Button>

                              <Button
                                className={buttonStyle(
                                  selectedStates[job.id],
                                  'like',
                                )}
                                variant="light"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStates((prev) => ({
                                    ...prev,
                                    [job.id]:
                                      prev[job.id] === 'like' ? null : 'like',
                                  }));
                                }}
                              >
                                <span
                                  className={textStyle(
                                    selectedStates[job.id],
                                    'like',
                                  )}
                                >
                                  Like
                                </span>
                                <Like1
                                  className={iconStyle(
                                    selectedStates[job.id],
                                    'like',
                                  )}
                                  size="12"
                                  variant="Bold"
                                />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between pt-2">
                            <div className="flex flex-col gap-1">
                              <span className="text-secondary-800 font-bold text-sm">
                                {job.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <Location
                                  className="text-secondary-1000"
                                  size="16"
                                />
                                <span className="text-secondary-1000 text-sm">
                                  {job.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock
                                  className="text-secondary-1000"
                                  size="16"
                                />
                                <span className="text-secondary-1000 text-sm">
                                  {job.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarCircle
                                  className="text-secondary-1000"
                                  size="16"
                                />
                                <span className="text-secondary-1000 text-sm">
                                  {job.salary}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Status
                                  className="text-info"
                                  size="20"
                                  variant="Bold"
                                />
                                <span className="text-info-700 text-sm">
                                  {job.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <div className="flex justify-end">
                                <img
                                  alt=""
                                  className="w-[84px] h-[84px] rounded-5"
                                  src={jobCompanyLogo}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
                <div className="flex justify-center">
                  <AppPagination
                    props={{
                      size: 'sm',
                      total: '100',
                    }}
                  />
                </div>
              </div>
            </div>

            <AppModal
              footer={
                <div className="flex justify-between w-full">
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenFilterModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-secondary-400 text-xl font-normal text-white"
                    onPress={() => setOpenFilterModal(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="flex flex-col gap-1 !p-0">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                      <Setting4 className="text-white" size="22" />
                      <span className="text-white font-normal text-xl">
                        Filter
                      </span>
                    </div>
                  </div>
                </div>
              }
              isOpen={openFilterModal}
              onClose={() => setOpenFilterModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-full">
                  <AppInput
                    props={{
                      label: 'Describe text',
                      required: true,
                      startContent: <SearchNormal1 />,
                      error: formik.errors.search_sth,
                      name: 'Search Sth',
                      placeholder: '',
                      type: 'text',
                      value: formik.values.search_sth,
                      formik: formik,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <AppAutoComplete
                    props={{
                      name: 'firstname',
                      label: 'Location',
                      placeholder:
                        lang === 'fa'
                          ? 'انتخاب استان ...'
                          : 'Please Select Province...',
                      required: true,
                      value: formik.values.search_sth,
                      displayKey: `label.${lang}`,
                      formik,
                      error:
                        formik.touched.search_sth && formik.errors.search_sth,
                      data: iranProvinces,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <AppAutoComplete
                    props={{
                      name: 'firstname',
                      label: 'Job Category',
                      placeholder:
                        lang === 'fa'
                          ? 'انتخاب رسته شغلی ...'
                          : 'Please Select Job Category ...',
                      required: true,
                      value: formik.values.search_sth,
                      displayKey: `label.${lang}`,
                      formik,
                      error:
                        formik.touched.search_sth && formik.errors.search_sth,
                      data: militaryStatusOptions,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <AppAutoComplete
                    props={{
                      name: 'firstname',
                      label: 'Sort by',
                      required: true,
                      value: formik.values.search_sth,
                      displayKey: `label.${lang}`,
                      formik,
                      error:
                        formik.touched.search_sth && formik.errors.search_sth,
                      data: sortByOptions,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <span className="text-secondary-1000 text-sm font-inter leading-5 font-medium">
                    Set the salary
                  </span>
                  <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                    <Slider
                      className="max-w-md"
                      classNames={{
                        filler: '!bg-secondary-400',
                        thumb:
                          '!bg-secondary-400 after:bg-primary-0 !w-4 !h-4 after:!w-3 after:!h-3',
                        track: '!h-1',
                      }}
                      formatOptions={{
                        style: 'currency',
                        currency: 'IRR',
                      }}
                      label=" "
                      maxValue={30000000}
                      minValue={18000000}
                      step={10}
                      value={salaryValue}
                      onChange={(val) => {
                        if (Array.isArray(val)) {
                          setSalaryValue(val);
                        }
                      }}
                    />
                    <p className="text-default-500 font-medium text-small">
                      {Array.isArray(salaryValue) &&
                        salaryValue.map((b) => `${b}`).join(' – ')}
                    </p>
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
