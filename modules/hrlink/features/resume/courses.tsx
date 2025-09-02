import { Button } from "@heroui/button";
import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  ReceiveSquare,
  SearchNormal1,
} from "iconsax-react";
import {
  Input,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { ResumeLayout } from "@/pages/Resume/Layout.tsx";
import { AppPagination } from "@/components/AppPagination.tsx";
import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
import { Academy } from "@/icons/academy.tsx";
import { AppMap } from "@/components/AppMap.tsx";
import { CloseIcon } from "@/icons/closeIcon.tsx";
import { handleFetchCourseListApi } from "@/services/Resume/Courses/apis.ts";
import { AppDispatch } from "@/redux/createStore.ts";

export default function ResumeCourses() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleNavigateToAchievementsAccolades = () => {
    navigate("/resume/achievements-accolades");
  };

  useEffect(() => {
    dispatch(handleFetchCourseListApi());
  }, []);

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex justify-between">
              <div className="flex">
                <div
                  className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
                  <Academy
                    props={{
                      color: "#fff"
                    }}
                  />
                  <span className="text-white text-xl font-normal">
                    Courses
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                  onPress={handleNavigateToAchievementsAccolades}
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
                                "!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-4"
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
                  // onPress={onOpen}
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
            <div className="grid grid-cols-4 gap-3 h-[calc(100%-64px)]">
              <div className="col-span-3">
                <div className="flex flex-col h-full justify-between">
                  {/*<div className="grid grid-cols-2 gap-3">*/}
                  {/*  {courses.map((course: any, index: number) => (*/}
                  {/*    <div*/}
                  {/*      key={index}*/}
                  {/*      className="rounded-5 shadow-shadow-light-tight/1 dark:shadow-shadow-dark-tight/1 p-4 bg-white dark:bg-info-1000"*/}
                  {/*    >*/}
                  {/*      <div className="flex flex-col gap-2.5">*/}
                  {/*        <div className="flex flex-col gap-1.5 border-b-1 border-neutral-100 pb-1.5">*/}
                  {/*          <div className="flex justify-between">*/}
                  {/*            <div className="flex gap-1.5">*/}
                  {/*              <Academy*/}
                  {/*                props={{*/}
                  {/*                  color: "#04070E"*/}
                  {/*                }}*/}
                  {/*              />*/}
                  {/*              <span className="text-base font-semibold text-secondary-1000 dark:text-white">*/}
                  {/*                {course.name}*/}
                  {/*              </span>*/}
                  {/*            </div>*/}
                  {/*            <div className="flex gap-1">*/}
                  {/*              <Button*/}
                  {/*                className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"*/}
                  {/*                variant="light"*/}
                  {/*                onPress={onEditConfirmOpen}*/}
                  {/*              >*/}
                  {/*                <Edit*/}
                  {/*                  className="text-secondary-1000 dark:text-white"*/}
                  {/*                  size="14"*/}
                  {/*                />*/}
                  {/*              </Button>*/}
                  {/*              <Button*/}
                  {/*                className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"*/}
                  {/*                variant="light"*/}
                  {/*                onPress={onDeleteConfirmOpen}*/}
                  {/*              >*/}
                  {/*                <Trash*/}
                  {/*                  className="text-secondary-1000 dark:text-white"*/}
                  {/*                  size="14"*/}
                  {/*                />*/}
                  {/*              </Button>*/}
                  {/*            </div>*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*        <div className="flex flex-col gap-2">*/}
                  {/*          <div className="flex justify-between">*/}
                  {/*            <div className="flex flex-col gap-2">*/}
                  {/*              <div className="flex gap-4">*/}
                  {/*                <span className="text-secondary-1000 dark:text-white text-sm font-light">*/}
                  {/*                  title:*/}
                  {/*                </span>*/}
                  {/*                <span className="text-secondary-1000 dark:text-white text-sm font-normal">*/}
                  {/*                  {course.title}*/}
                  {/*                </span>*/}
                  {/*              </div>*/}
                  {/*              <div className="flex gap-4">*/}
                  {/*                <span className="text-secondary-1000 dark:text-white text-sm font-light">*/}
                  {/*                  Date:*/}
                  {/*                </span>*/}
                  {/*                <span className="text-secondary-1000 dark:text-white text-sm font-normal">*/}
                  {/*                  {course.date}*/}
                  {/*                </span>*/}
                  {/*              </div>*/}
                  {/*            </div>*/}
                  {/*          </div>*/}
                  {/*          <div className="flex gap-4">*/}
                  {/*            <span className="text-secondary-1000 dark:text-white text-sm font-light">*/}
                  {/*              Description:*/}
                  {/*            </span>*/}
                  {/*            <span className="text-secondary-1000 dark:text-white text-sm font-normal">*/}
                  {/*              {course.description}*/}
                  {/*            </span>*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                  <div className="flex justify-center">
                    <AppPagination
                      props={{
                        total: 10,
                        size: "md"
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-3">
                <AppGeneralDetails />
                <AppMap
                  props={{
                    isEdit: true
                  }}
                />
              </div>
            </div>
            {/*<Modal*/}
            {/*  backdrop="blur"*/}
            {/*  classNames={{*/}
            {/*    closeButton:*/}
            {/*      "right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent"*/}
            {/*  }}*/}
            {/*  isOpen={isEditConfirmOpen}*/}
            {/*  size="4xl"*/}
            {/*  onOpenChange={onEditConfirmOpenChange}*/}
            {/*>*/}
            {/*  <ModalContent className="rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12">*/}
            {/*    {(onClose) => (*/}
            {/*      <>*/}
            {/*        <ModalHeader className="flex flex-col gap-1">*/}
            {/*          <div className="flex justify-between items-center">*/}
            {/*            <div*/}
            {/*              className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">*/}
            {/*              <Academy*/}
            {/*                props={{*/}
            {/*                  color: "#fff"*/}
            {/*                }}*/}
            {/*              />*/}
            {/*              <span className="text-white font-normal text-xl">*/}
            {/*                Edit Courses*/}
            {/*              </span>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </ModalHeader>*/}
            {/*        <ModalBody>*/}
            {/*          <Form*/}
            {/*            className="w-full flex flex-col gap-6"*/}
            {/*            onSubmit={formikCreateCourse.handleSubmit}*/}
            {/*          >*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Type",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Date",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Title",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Name of the institution",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Upload portfolio",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Grade value type",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-14 w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-full">*/}
            {/*                <AppTextArea*/}
            {/*                  props={{*/}
            {/*                    label: "social_media_links",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </Form>*/}
            {/*        </ModalBody>*/}
            {/*        <ModalFooter>*/}
            {/*          <Button*/}
            {/*            className="text-xl font-normal"*/}
            {/*            color="default"*/}
            {/*            variant="light"*/}
            {/*            onPress={onClose}*/}
            {/*          >*/}
            {/*            Close*/}
            {/*          </Button>*/}
            {/*          <Button*/}
            {/*            className="bg-secondary-400 text-xl font-normal text-white"*/}
            {/*            onPress={onClose}*/}
            {/*          >*/}
            {/*            Save Changes*/}
            {/*          </Button>*/}
            {/*        </ModalFooter>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </ModalContent>*/}
            {/*</Modal>*/}
            {/*<Modal*/}
            {/*  backdrop="blur"*/}
            {/*  classNames={{*/}
            {/*    closeButton:*/}
            {/*      "right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent"*/}
            {/*  }}*/}
            {/*  isOpen={isOpen}*/}
            {/*  size="4xl"*/}
            {/*  onOpenChange={onOpenChange}*/}
            {/*>*/}
            {/*  <ModalContent className="rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12">*/}
            {/*    {(onClose) => (*/}
            {/*      <>*/}
            {/*        <ModalHeader className="flex flex-col gap-1">*/}
            {/*          <div className="flex justify-between items-center">*/}
            {/*            <div*/}
            {/*              className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">*/}
            {/*              <Academy*/}
            {/*                props={{*/}
            {/*                  color: "#fff"*/}
            {/*                }}*/}
            {/*              />*/}
            {/*              <span className="text-white font-normal text-xl">*/}
            {/*                Add Courses*/}
            {/*              </span>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </ModalHeader>*/}
            {/*        <ModalBody>*/}
            {/*          <Form*/}
            {/*            className="w-full flex flex-col gap-6"*/}
            {/*            onSubmit={formik.handleSubmit}*/}
            {/*          >*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Type",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Date",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Title",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Name of the institution",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-[52px] w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Upload portfolio",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*              <div className="flex flex-col gap-1 w-1/2">*/}
            {/*                <AppInput*/}
            {/*                  props={{*/}
            {/*                    label: "Grade value type",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex gap-14 w-full">*/}
            {/*              <div className="flex flex-col gap-1 w-full">*/}
            {/*                <AppTextArea*/}
            {/*                  props={{*/}
            {/*                    label: "Description",*/}
            {/*                    required: true,*/}
            {/*                    error: formik.errors.firstname,*/}
            {/*                    name: "firstname",*/}
            {/*                    placeholder: "Description Text",*/}
            {/*                    type: "text",*/}
            {/*                    value: formik.values.firstname,*/}
            {/*                    formik: formik*/}
            {/*                  }}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </Form>*/}
            {/*        </ModalBody>*/}
            {/*        <ModalFooter>*/}
            {/*          <Button*/}
            {/*            className="text-xl font-normal"*/}
            {/*            color="default"*/}
            {/*            variant="light"*/}
            {/*            onPress={onClose}*/}
            {/*          >*/}
            {/*            Close*/}
            {/*          </Button>*/}
            {/*          <Button*/}
            {/*            className="bg-secondary-400 text-xl font-normal text-white"*/}
            {/*            onPress={onClose}*/}
            {/*          >*/}
            {/*            Submit*/}
            {/*          </Button>*/}
            {/*        </ModalFooter>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </ModalContent>*/}
            {/*</Modal>*/}
            {/*<Modal*/}
            {/*  backdrop="blur"*/}
            {/*  classNames={{*/}
            {/*    closeButton:*/}
            {/*      "right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent"*/}
            {/*  }}*/}
            {/*  isOpen={isDeleteConfirmOpen}*/}
            {/*  size="2xl"*/}
            {/*  onOpenChange={onDeleteConfirmOpenChange}*/}
            {/*>*/}
            {/*  <ModalContent*/}
            {/*    className="rounded-[12px] bg-white/30 dark:bg-[#01101a4d] shadow-md backdrop-blur-[40px] p-12">*/}
            {/*    {(onClose) => (*/}
            {/*      <div className="flex flex-col gap-10">*/}
            {/*        <ModalHeader className="!p-0">*/}
            {/*          <div className="flex justify-between items-center w-full">*/}
            {/*            <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">*/}
            {/*              <Trash className="text-white" size="18" />*/}
            {/*              <span className="text-xl text-white font-normal leading-normal">*/}
            {/*                Would it be acceptable for you to remove this?*/}
            {/*              </span>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </ModalHeader>*/}
            {/*        <ModalFooter className="!p-0 items-center">*/}
            {/*          <Button*/}
            {/*            className="text-secondary-800 dark:text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"*/}
            {/*            color="default"*/}
            {/*            variant="light"*/}
            {/*            onPress={onClose}*/}
            {/*          >*/}
            {/*            Cancel*/}
            {/*          </Button>*/}
            {/*          <Button*/}
            {/*            className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit !h-fit"*/}
            {/*            onPress={() => {*/}
            {/*              console.log("Location deleted");*/}
            {/*              onClose();*/}
            {/*            }}*/}
            {/*          >*/}
            {/*            Delete*/}
            {/*          </Button>*/}
            {/*        </ModalFooter>*/}
            {/*      </div>*/}
            {/*    )}*/}
            {/*  </ModalContent>*/}
            {/*</Modal>*/}
          </div>
        )
      }}
    />
  );
}
