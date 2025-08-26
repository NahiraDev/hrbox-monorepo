import { Button } from "@heroui/button";
import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  FavoriteChart,
  Personalcard,
  ReceiveSquare,
  SearchNormal1,
  UserOctagon,
} from "iconsax-react";
import { Form, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-jalaali";

import { AppInput } from "@/components/AppInput.tsx";
import { ResumeLayout } from "@/pages/Resume/Layout.tsx";
import AppTable from "@/components/AppTable.tsx";
import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
import { AppMap } from "@/components/AppMap.tsx";
import { CloseIcon } from "@/icons/closeIcon.tsx";
import { AppDispatch, RootState } from "@/redux/createStore.ts";
import {
  handleCreateEducationApi,
  handleDeleteEducationApi,
  handleFetchEducationListApi,
  handleFetchUniversityEducationApi,
  handleGetCitiesApi,
  handleGetFieldOfEducationApi,
} from "@/services/Resume/Education/apis.ts";
import { AppDatePicker } from "@/components/AppDatePicker.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import { Degree, FieldOfStudyType } from "@/utils/general.ts";
import { AppModal } from "@/components/AppModal.tsx";

export default function ResumeInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const educationData: any = useSelector(
    (state: RootState) => state.resume.education,
  );
  const lang = useSelector((state: RootState) => state.language.lang);
  const currentPage = educationData?.pagination?.Page;
  const pageSize = educationData?.pagination?.PageSize;
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [openCreateJobExperienceModal, setOpenCreateJobExperienceModal] =
    useState<boolean>(false);
  const [openEditJobExperienceModal, setOpenEditJobExperienceModal] =
    useState<boolean>(false);
  const handleNavigateToHardSkills = () => {
    navigate("/resume/hard-skills");
  };
  const handleNavigateToJobExperience = () => {
    navigate("/resume/job-experience");
  };

  const formattedData = educationData.data.map((item: any, index: any) => {
    const city = educationData.cities.find(
      (city: any) => city.Id === item.PlaceId,
    );

    const safeCurrentPage = currentPage > 0 ? currentPage : 1;
    const No = (safeCurrentPage - 1) * pageSize + index + 1;

    return {
      ...item,
      No,
      Timeline:
        lang === "fa"
          ? `${moment(item.DateBegin).format("jYYYY/jMM/jDD")} - ${moment(item.DateEnd).format("jYYYY/jMM/jDD")}`
          : `${moment(item.DateBegin).format("YYYY/MM/DD")} - ${moment(item.DateEnd).format("YYYY/MM/DD")}`,
      Location: city?.Name ?? "نامشخص",
    };
  });

  const formikCreateAcademicHistory = useFormik({
    initialValues: {
      ThesisName: "",
      Avarage: "",
      Grade: "",
      GradeName: "",
      City: "",
      FieldOfEducationIName: "",
      FieldOfEducationId: "",
      UniversityId: "",
      YearBegin: "",
      YearEnd: "",
    },
    validationSchema: Yup.object({
      Grade: Yup.string().required(),
      ThesisName: Yup.string().required(),
      Avarage: Yup.string().required(),
      City: Yup.string().required(),
      GradeName: Yup.string().required(),
      FieldOfEducationIName: Yup.string().required(),
      FieldOfEducationId: Yup.string().required(),
      UniversityId: Yup.string().required(),
      YearBegin: Yup.string().required(),
      YearEnd: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const newEducation = {
        Grade: values.Grade,
        GradeName: values.GradeName,
        Avarage: values.Avarage,
        ThesisName: values.ThesisName,
        City: values.City,
        FieldOfEducationIName: values.FieldOfEducationIName,
        FieldOfEducationId: values.FieldOfEducationId,
        UniversityId: values.UniversityId,
        YearBegin: values.YearBegin,
        YearEnd: values.YearEnd,
      };

      dispatch(handleCreateEducationApi(newEducation));
    },
  });

  const formikEditAcademicHistory = useFormik({
    initialValues: {
      ThesisName: "",
      Avarage: "",
      Grade: "",
      GradeName: "",
      City: "",
      FieldOfEducationIName: "",
      FieldOfEducationId: "",
      UniversityId: "",
      YearBegin: "",
      YearEnd: "",
    },
    validationSchema: Yup.object({
      Grade: Yup.string().required(),
      ThesisName: Yup.string().required(),
      Avarage: Yup.string().required(),
      City: Yup.string().required(),
      GradeName: Yup.string().required(),
      FieldOfEducationIName: Yup.string().required(),
      FieldOfEducationId: Yup.string().required(),
      UniversityId: Yup.string().required(),
      YearBegin: Yup.string().required(),
      YearEnd: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const newEducation = {
        Grade: values.Grade,
        GradeName: values.GradeName,
        Avarage: values.Avarage,
        ThesisName: values.ThesisName,
        City: values.City,
        FieldOfEducationIName: values.FieldOfEducationIName,
        FieldOfEducationId: values.FieldOfEducationId,
        UniversityId: values.UniversityId,
        YearBegin: values.YearBegin,
        YearEnd: values.YearEnd,
      };

      dispatch(handleCreateEducationApi(newEducation));
    },
  });

  const deleteEducation = (educationId: string) => {
    dispatch(handleDeleteEducationApi(educationId));
  };

  useEffect(() => {
    dispatch(handleFetchEducationListApi());
    dispatch(handleFetchUniversityEducationApi());
    dispatch(handleGetFieldOfEducationApi());
    dispatch(handleGetCitiesApi());
  }, []);

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
                <UserOctagon className="text-white" size="22" />
                <span className="text-white text-xl font-normal">
                  Education
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToJobExperience}
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
                  onPress={handleNavigateToHardSkills}
                >
                  <ArrowRight2
                    className="text-secondary-1000 dark:text-white"
                    size="24"
                  />
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
                  onPress={() => setOpenCreateJobExperienceModal(true)}
                >
                  <Add
                    className="text-secondary-1000 dark:text-white"
                    size="16"
                  />
                  <span className="text-secondary-1000 dark:text-white font-semibold text-base">
                    Add New One
                  </span>
                </Button>
                <Button
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                  color="default"
                  variant="light"
                >
                  <ReceiveSquare
                    className="text-secondary-1000 dark:text-white"
                    size="16"
                  />
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
                      { key: "No", label: "No." },
                      { key: "UniversityName", label: "UniversityName " },
                      { key: "GradeName", label: "GradeName" },
                      { key: "TimeLine", label: "TimeLine" },
                      { key: "PlaceName", label: "Location" },
                    ],
                    data: formattedData,
                    onOpenEditDialog: () => setOpenEditJobExperienceModal(true),
                    onDelete: deleteEducation,
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
                <div className="flex gap-2">
                  <Button
                    className="text-xl font-normal"
                    color="default"
                    variant="light"
                    onPress={() => setOpenEditJobExperienceModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white"
                    onPress={() => setOpenEditJobExperienceModal(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 dark:shadow-shadow-dark-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                      <Personalcard className="text-white" size="22" />
                      <span className="text-white font-normal text-xl">
                        Edit General Informations
                      </span>
                    </div>
                  </div>
                </div>
              }
              isOpen={openEditJobExperienceModal}
              size="3xl"
              onClose={() => setOpenEditJobExperienceModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                onSubmit={formikEditAcademicHistory.handleSubmit}
              >
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: "GPA",
                        required: true,
                        error: formikEditAcademicHistory.errors.Avarage,
                        name: "Avarage",
                        placeholder: "Please Enter Avarage ...",
                        type: "text",
                        value: formikEditAcademicHistory.values.Avarage,
                        formik: formikEditAcademicHistory,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: "Thesis title",
                        required: true,
                        error: formikEditAcademicHistory.errors.ThesisName,
                        name: "ThesisName",
                        placeholder: "Please Enter Thesis Title ...",
                        type: "text",
                        value: formikEditAcademicHistory.values.ThesisName,
                        formik: formikEditAcademicHistory,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "Grade",
                        label: "Degree",
                        placeholder: "Please Select Degree ...",
                        required: true,
                        value: formikEditAcademicHistory.values.Grade,
                        displayKey: `name`,
                        formikEditAcademicHistory,
                        error:
                          formikEditAcademicHistory.touched.Grade &&
                          formikEditAcademicHistory.errors.Grade,
                        data: Degree,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "FieldOfEducationIName",
                        label: "University Type",
                        placeholder: "Please Select Field Of Study ...",
                        required: true,
                        value:
                          formikEditAcademicHistory.values
                            .FieldOfEducationIName,
                        displayKey: `name`,
                        formikEditAcademicHistory,
                        error:
                          formikEditAcademicHistory.touched
                            .FieldOfEducationIName &&
                          formikEditAcademicHistory.errors
                            .FieldOfEducationIName,
                        data: FieldOfStudyType,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "FieldOfEducationIName",
                        label: "Field Of Study",
                        placeholder: "Please Select Field Of Study ...",
                        required: true,
                        value:
                          formikEditAcademicHistory.values
                            .FieldOfEducationIName,
                        displayKey: `Name`,
                        formikEditAcademicHistory,
                        error:
                          formikEditAcademicHistory.touched
                            .FieldOfEducationIName &&
                          formikEditAcademicHistory.errors
                            .FieldOfEducationIName,
                        data: educationData.fieldOfStudy,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "UniversityId",
                        label: "Place of Study",
                        placeholder: "Please Select University ...",
                        required: true,
                        value: formikEditAcademicHistory.values.UniversityId,
                        displayKey: `Name`,
                        formikEditAcademicHistory,
                        error:
                          formikEditAcademicHistory.touched.UniversityId &&
                          formikEditAcademicHistory.errors.UniversityId,
                        data: educationData.universityList,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "City",
                        label: "City",
                        placeholder: "Please Select City ...",
                        required: true,
                        value: formikEditAcademicHistory.values.City,
                        displayKey: `Name`,
                        formikEditAcademicHistory,
                        error:
                          formikEditAcademicHistory.touched.City &&
                          formikEditAcademicHistory.errors.City,
                        data: educationData.cities,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2" />
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: "Start Date",
                        required: true,
                        error: formikEditAcademicHistory.errors.YearBegin,
                        name: "YearBegin",
                        placeholder: "Please Enter Start Date ...",
                        formik: formikEditAcademicHistory,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: "End Date",
                        required: true,
                        error: formikEditAcademicHistory.errors.YearEnd,
                        name: "YearBegin",
                        placeholder: "Please Enter End Date ...",
                        formik: formikEditAcademicHistory,
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
                    onPress={() => setOpenCreateJobExperienceModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white"
                    onPress={() => setOpenCreateJobExperienceModal(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              }
              header={
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                      <FavoriteChart className="text-white" size="22" />
                      <span className="text-white font-normal text-xl">
                        Add New Work Experience
                      </span>
                    </div>
                  </div>
                </div>
              }
              isOpen={openCreateJobExperienceModal}
              size="4xl"
              onClose={() => setOpenCreateJobExperienceModal(false)}
            >
              <Form
                className="w-full flex flex-col gap-6"
                onSubmit={formikCreateAcademicHistory.handleSubmit}
              >
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: "GPA",
                        required: true,
                        error: formikCreateAcademicHistory.errors.Avarage,
                        name: "Avarage",
                        placeholder: "Please Enter Avarage ...",
                        type: "text",
                        value: formikCreateAcademicHistory.values.Avarage,
                        formik: formikCreateAcademicHistory,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppInput
                      props={{
                        label: "Thesis title",
                        required: true,
                        error: formikCreateAcademicHistory.errors.ThesisName,
                        name: "ThesisName",
                        placeholder: "Please Enter Thesis Title ...",
                        type: "text",
                        value: formikCreateAcademicHistory.values.ThesisName,
                        formik: formikCreateAcademicHistory,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "Grade",
                        label: "Degree",
                        placeholder: "Please Select Degree ...",
                        required: true,
                        value: formikCreateAcademicHistory.values.Grade,
                        displayKey: `name`,
                        formikCreateAcademicHistory,
                        error:
                          formikCreateAcademicHistory.touched.Grade &&
                          formikCreateAcademicHistory.errors.Grade,
                        data: Degree,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "FieldOfEducationIName",
                        label: "University Type",
                        placeholder: "Please Select Field Of Study ...",
                        required: true,
                        value:
                          formikCreateAcademicHistory.values
                            .FieldOfEducationIName,
                        displayKey: `name`,
                        formikCreateAcademicHistory,
                        error:
                          formikCreateAcademicHistory.touched
                            .FieldOfEducationIName &&
                          formikCreateAcademicHistory.errors
                            .FieldOfEducationIName,
                        data: FieldOfStudyType,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "FieldOfEducationIName",
                        label: "Field Of Study",
                        placeholder: "Please Select Field Of Study ...",
                        required: true,
                        value:
                          formikCreateAcademicHistory.values
                            .FieldOfEducationIName,
                        displayKey: `Name`,
                        formikCreateAcademicHistory,
                        error:
                          formikCreateAcademicHistory.touched
                            .FieldOfEducationIName &&
                          formikCreateAcademicHistory.errors
                            .FieldOfEducationIName,
                        data: educationData.fieldOfStudy,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "UniversityId",
                        label: "Place of Study",
                        placeholder: "Please Select University ...",
                        required: true,
                        value: formikCreateAcademicHistory.values.UniversityId,
                        displayKey: `Name`,
                        formikCreateAcademicHistory,
                        error:
                          formikCreateAcademicHistory.touched.UniversityId &&
                          formikCreateAcademicHistory.errors.UniversityId,
                        data: educationData.universityList,
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppAutoComplete
                      props={{
                        name: "City",
                        label: "City",
                        placeholder: "Please Select City ...",
                        required: true,
                        value: formikCreateAcademicHistory.values.City,
                        displayKey: `Name`,
                        formikCreateAcademicHistory,
                        error:
                          formikCreateAcademicHistory.touched.City &&
                          formikCreateAcademicHistory.errors.City,
                        data: educationData.cities,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2" />
                </div>
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: "Start Date",
                        required: true,
                        error: formikCreateAcademicHistory.errors.YearBegin,
                        name: "YearBegin",
                        placeholder: "Please Enter Start Date ...",
                        formik: formikCreateAcademicHistory,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <AppDatePicker
                      props={{
                        label: "End Date",
                        required: true,
                        error: formikCreateAcademicHistory.errors.YearEnd,
                        name: "YearBegin",
                        placeholder: "Please Enter End Date ...",
                        formik: formikCreateAcademicHistory,
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
