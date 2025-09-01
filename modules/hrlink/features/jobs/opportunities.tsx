import { Form, Input, Slider } from "@heroui/react";
import {
  Buildings2,
  Clock,
  DocumentForward,
  DollarCircle,
  Location,
  SearchNormal1,
  Setting4,
  Status,
} from "iconsax-react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { JobsLayout } from "@/pages/Jobs/Layout.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import { JobOppertunitiesIcon } from "@/icons/jobOppertunities.tsx";
import jobCompanyLogo from "@/assets/img/job-company-logo.png";
import { AppPagination } from "@/components/AppPagination.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { CloseIcon } from "@/icons/closeIcon.tsx";
import { AppDispatch, RootState } from "@/redux/createStore.ts";
import {
  handleGetJobOpportunitiesApi,
  handleSearchJobOpportunitiesApi,
} from "@/services/Jobs/apis.ts";
import { AppModal } from "@/components/AppModal.tsx";
import { AppInput } from "@/components/AppInput.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import {
  iranProvinces,
  militaryStatusOptions,
  sortByOptions,
} from "@/utils/general.ts";

export default function JobOppertunities() {
  const [salaryValue, setSalaryValue] = useState<any>([100, 300]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const jobOpportunitiesData = useSelector(
    (state: RootState) => state.jobs.opportunities,
  );

  const formik = useFormik({
    initialValues: {
      search_sth: "",
    },
    validationSchema: Yup.object({
      search_sth: Yup.string().required(),
    }),
    onSubmit: () => {},
  });

  const handleOpenJobDetails = (name: string) => {
    navigate("/job/detail/" + name);
  };
  const handleNavigateToJobOffers = () => {
    navigate("/job/offers");
  };

  const handleSearchJobOpportunities = (name: string) => {
    dispatch(handleSearchJobOpportunitiesApi(name));
  };

  useEffect(() => {
    dispatch(handleGetJobOpportunitiesApi());
  }, []);

  return (
    <JobsLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    className="flex items-center gap-2 !bg-transparent !rounded-4 !px-3 !py-1.5 w-fit"
                    onPress={handleNavigateToJobOffers}
                  >
                    <JobOffersIcon
                      props={{
                        color: darkMode ? "#fff" : "#1e3363",
                      }}
                    />
                    <span className="dark:text-white text-secondary-400 text-xl font-normal">
                      Job Recommendations
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 bg-secondary-400 dark:bg-surface-200 !rounded-4 !px-3 !py-1.5 w-fit">
                    <JobOppertunitiesIcon
                      props={{
                        color: "#fff",
                      }}
                    />
                    <span className="text-white text-xl font-normal">
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
                          animate={{ opacity: 1, width: "300px" }}
                          className="overflow-hidden"
                          exit={{ opacity: 0, width: 0 }}
                          initial={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <Input
                            classNames={{
                              inputWrapper:
                                "!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-4",
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
                              handleSearchJobOpportunities(e.target.value)
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
                  {jobOpportunitiesData.map((oppertunitie: any, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenJobDetails(oppertunitie.company)}
                    >
                      <div
                        key={index}
                        className="rounded-5 shadow-shadow-light-tight/1 px-3 py-4"
                        style={{
                          backgroundColor: darkMode ? "#01101A" : "#FFF5F0",
                          backgroundImage: `url(${jobCompanyLogo})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundBlendMode: darkMode ? "darken" : "lighten",
                        }}
                      >
                        <div className="flex justify-between pb-1 border-b-1 border-neutral-100 dark:border-neutral-700">
                          <div className="flex items-center gap-2">
                            <Buildings2
                              className="text-secondary-400 dark:text-white"
                              size="22"
                            />
                            <span className="text-secondary-1000 dark:text-white font-semibold">
                              {oppertunitie.Name}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              className="!h-[22px] !w-[54px] !min-w-fit flex items-center gap-2 !px-1 !py-0.5 !rounded-2 bg-white dark:bg-info-1000"
                              variant="light"
                            >
                              <span className="text-secondary-1000 dark:text-white text-[10px] font-normal">
                                Easy Apply
                              </span>
                              <DocumentForward
                                className="text-secondary-1000 dark:text-white"
                                size="12"
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between pt-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-secondary-800 dark:text-white font-bold text-sm leading-normal">
                              {oppertunitie.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <Location
                                className="text-secondary-1000 dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {oppertunitie.adress.length > 50
                                  ? `${oppertunitie.adress.slice(0, 50)}...`
                                  : oppertunitie.adress}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock
                                className="text-secondary-1000 dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {oppertunitie.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarCircle
                                className="text-secondary-1000 dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {oppertunitie.salary}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Status
                                className="text-info"
                                size="20"
                                variant="Bold"
                              />
                              <span className="text-info-700 dark:text-white text-sm font-normal">
                                {oppertunitie.status}
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
                      size: "sm",
                      total: "100",
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
                      label: "Describe text",
                      required: true,
                      startContent: <SearchNormal1 />,
                      error: formik.errors.search_sth,
                      name: "Search Sth",
                      placeholder: "",
                      type: "text",
                      value: formik.values.search_sth,
                      formik: formik,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <AppAutoComplete
                    props={{
                      name: "firstname",
                      label: "Location",
                      placeholder:
                        lang === "fa"
                          ? "انتخاب استان ..."
                          : "Please Select Province...",
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
                      name: "firstname",
                      label: "Job Category",
                      placeholder:
                        lang === "fa"
                          ? "انتخاب رسته شغلی ..."
                          : "Please Select Job Category ...",
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
                      name: "firstname",
                      label: "Sort by",
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
                        filler: "!bg-secondary-400",
                        thumb:
                          "!bg-secondary-400 after:bg-primary-0 !w-4 !h-4 after:!w-3 after:!h-3",
                        track: "!h-1",
                      }}
                      formatOptions={{
                        style: "currency",
                        currency: "IRR",
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
                        salaryValue.map((b) => `${b}`).join(" – ")}
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
