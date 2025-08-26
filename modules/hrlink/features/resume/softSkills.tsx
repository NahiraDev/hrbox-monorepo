import { Button } from '@heroui/button';
import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  Edit,
  LampCharge,
  ReceiveSquare,
  SearchNormal1,
  Star,
  Trash,
} from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { Chip, Input } from '@heroui/react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { ResumeLayout } from '@/pages/Resume/Layout.tsx';
import { useDarkMode } from '@/context/DarkMode.tsx';
import DoubleLineProgress from '@/components/AppCircularChart.tsx';
import { AppGeneralDetails } from '@/components/AppGeneralDetails.tsx';
import { AppMap } from '@/components/AppMap.tsx';
import { AppPagination } from '@/components/AppPagination.tsx';
import { SoftSkillsIcon } from '@/icons/softSkillsIcon.tsx';
import SoftSkillCardBg from '@/assets/img/soft-skills-bg.png';
import { ChevronDownIcon } from '@/icons/chevronDown.tsx';
import { CloseIcon } from '@/icons/closeIcon.tsx';
import { AppDispatch, RootState } from '@/redux/createStore.ts';
import {
  handleCreateSkillsApi,
  handleDeleteSkillsApi,
  handleEditSkillsApi,
  handleFetchSoftSkillsListApi,
  handleGetSkillsByParentIdAndTypeApi,
  handleGetSkillsByTypeApi,
  handleSearchSoftSkillsApi,
} from '@/services/Resume/Skills/apis.ts';
import { AppModal } from '@/components/AppModal.tsx';

export default function ResumeSoftSkills() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openAddSoftSkillModal, setOpenAddSoftSkillModal] = useState<boolean>(false);
  const [openEditSoftSkillModal, setOpenEditSoftSkillModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSkills, setIsOpenSkills] = useState<boolean>(false);
  const [isOpenIndustrial, setIsOpenIndustrial] = useState<boolean>(false);
  const [isOpenField, setIsOpenField] = useState<boolean>(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustrial, setSelectedIndustrial] = useState<string[]>([]);
  const selectedFields = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [skillId, setSkillId] = useState<any>(null);
  const skillsData: any = useSelector((state: RootState) => state.resume.skills);

  const toggleSkills = () => setIsOpenSkills((prev) => !prev);
  const toggleIndustrial = () => setIsOpenIndustrial((prev) => !prev);
  const toggleField = () => setIsOpenField((prev) => !prev);

  const handleSkillSelect = (skill: any) => {
    const getParentIdAndTypes = {
      type: '2',
      parentId: skill.Id,
    };

    dispatch(handleGetSkillsByParentIdAndTypeApi(getParentIdAndTypes));
    setSelectedSkills([...selectedSkills, skill]);
  };

  const handleIndustrialSelect = (industrial: any) => {
    setSelectedIndustrial([...selectedIndustrial, industrial]);
  };

  const availableFields = selectedIndustrial;

  const handleOpenDeleteModal = (id: any) => {
    setIsOpenDeleteModal(true);
    setSkillId(id);
  };

  const handleSearchSoftSkills = (searchTerm: any) => {
    const searchSoftSkillsData = {
      Name: searchTerm.target.value,
    };

    dispatch(handleSearchSoftSkillsApi(searchSoftSkillsData));
  };

  const handleCreateSoftSkills = () => {
    const idsString = availableFields.map((item: any) => item.Id).join(' , ');

    const newSkills = {
      SkillIds: idsString,
      Type: '1',
    };

    dispatch(handleCreateSkillsApi(newSkills));
  };

  const handleEditSoftSkills = () => {
    const idsString = availableFields.map((item: any) => item.Id).join(' , ');

    const newSkills = {
      SkillIds: idsString,
      Type: '1',
    };

    dispatch(handleEditSkillsApi(newSkills));
  };

  const handleNavigateToHardSkills = () => {
    navigate('/resume/hard-skills');
  };

  useEffect(() => {
    dispatch(handleGetSkillsByTypeApi('1'));
    dispatch(handleFetchSoftSkillsListApi());
  }, []);

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex justify-between">
              <div className="flex">
                <button
                  className="flex items-center gap-2 rounded-4 bg-transparent px-3 py-1.5 w-fit mb-6"
                  onClick={handleNavigateToHardSkills}
                >
                  <LampCharge className="text-secondary-400 dark:text-secondary-0" size="22" />
                  <span className="text-secondary-400 dark:text-secondary-0 text-xl font-normal">
                    Hard Skills
                  </span>
                </button>
                <button className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
                  <Star className="text-white" size="22" />
                  <span className="text-white text-xl font-normal">Soft Skills</span>
                </button>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
                >
                  <ArrowLeft2 className="text-secondary-1000 dark:text-white" size="24" />
                </Button>
                <Button
                  isIconOnly
                  className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                  color="default"
                  variant="light"
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
                            onChange={(e) => handleSearchSoftSkills(e)}
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
                  <div className="grid grid-cols-3 gap-3">
                    {skillsData &&
                      skillsData.data.map((skill: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-5 shadow-shadow-light-tight/1 p-4 bg-[linear-gradient(0deg,rgba(255,255,255,0.86),rgba(255,255,255,0.86)),url('<path-to-image>')] bg-[length:cover] bg-no-repeat bg-[position:50%]"
                          style={{
                            backgroundImage: `url(${SoftSkillCardBg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundBlendMode: darkMode ? 'darken' : 'lighten',
                          }}
                        >
                          <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between">
                                <div className="flex gap-1.5">
                                  <SoftSkillsIcon />
                                  <span className="text-base font-semibold text-secondary-1000">
                                    {skill.name}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000"
                                    variant="light"
                                  >
                                    <Edit
                                      className="text-secondary-1000 dark:text-white"
                                      size="14"
                                    />
                                  </Button>
                                  <Button
                                    className="!h-5 !w-5 !min-w-fit flex items-center gap-2 !p-1 !rounded-2 bg-white dark:bg-info-1000"
                                    variant="light"
                                    onPress={handleOpenDeleteModal}
                                  >
                                    <Trash
                                      className="text-secondary-1000 dark:text-white"
                                      size="14"
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-[#f6f6f666] h-[1px] w-full shadow-shadow-light-tight/1" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                  <div className="flex gap-4">
                                    <span className="text-secondary-1000 dark:text-white text-sm font-light">
                                      Level:
                                    </span>
                                    <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                      {skill.level}
                                    </span>
                                  </div>
                                  <div className="flex gap-4">
                                    <span className="text-secondary-1000 dark:text-white text-sm font-light">
                                      Grad:
                                    </span>
                                    <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                      {skill.grade}%
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <DoubleLineProgress value={skill.grade} />
                                </div>
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
                <div className="flex gap-[30px] items-center justify-end">
                  <Button
                    className="text-base font-medium text-secondary-800 !min-w-fit !px-3 !py-1.5 !rounded-4"
                    color="default"
                    variant="light"
                    onPress={() => setOpenAddSoftSkillModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white !min-w-fit !px-3 !py-1.5 !rounded-4"
                    onPress={handleCreateSoftSkills}
                  >
                    Submit
                  </Button>
                </div>
              }
              header={
                <div className="bg-secondary-400 dark:bg-surface-200 text-white shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                  <LampCharge />
                  <span className="text-white  font-normal text-xl">Add New Soft Skills</span>
                </div>
              }
              isOpen={openAddSoftSkillModal}
              size="4xl"
              onClose={() => setOpenAddSoftSkillModal(false)}
            >
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Skills*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  style={{
                    height: isOpenSkills ? 300 : 50,
                  }}
                  onClick={toggleSkills}
                >
                  <div className="flex gap-4 flex-wrap">
                    {skillsData.data.slice(0, isOpenSkills ? undefined : 5).map((skill: any) => {
                      const isSelected = selectedSkills.includes(skill?.Id);

                      return (
                        <Chip
                          key={skill?.Id}
                          className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                            isSelected
                              ? '!bg-secondary-100 text-secondary-400'
                              : '!bg-[#dee1eb66] text-secondary-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillSelect(skill);
                          }}
                        >
                          {skill?.Name}
                        </Chip>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenSkills ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Industrial*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  disabled={selectedSkills.length === 0}
                  style={{
                    height: isOpenIndustrial ? 300 : 50,
                  }}
                  onClick={toggleIndustrial}
                >
                  <div className="flex gap-4 flex-wrap">
                    {skillsData?.industrial
                      .slice(0, isOpenIndustrial ? undefined : 5)
                      .map((industrial: any) => {
                        const isSelected = selectedIndustrial.includes(industrial?.Id);

                        return (
                          <Chip
                            key={industrial?.Id}
                            className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                              isSelected
                                ? '!bg-secondary-100 text-secondary-400'
                                : '!bg-[#dee1e866] text-secondary-700'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIndustrialSelect(industrial);
                            }}
                          >
                            {industrial?.Name}
                          </Chip>
                        );
                      })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenIndustrial ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Field*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  disabled={selectedIndustrial.length === 0}
                  style={{
                    height: isOpenField ? 300 : 50,
                  }}
                  onClick={toggleField}
                >
                  <div className="flex gap-4 flex-wrap">
                    {availableFields.slice(0, isOpenField ? undefined : 5).map((field: any) => {
                      const isSelected = selectedFields.includes(field);

                      return (
                        <Chip
                          key={field?.Name}
                          className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                            isSelected
                              ? '!bg-secondary-100 text-secondary-400'
                              : '!bg-[#dee1eb66] text-secondary-700'
                          }`}
                        >
                          {field?.Name}
                        </Chip>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenField ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>
            </AppModal>

            <AppModal
              footer={
                <div className="flex gap-[30px] items-center justify-end">
                  <Button
                    className="text-base font-medium text-secondary-800 !min-w-fit !px-3 !py-1.5 !rounded-4"
                    color="default"
                    variant="light"
                    onPress={() => setOpenEditSoftSkillModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-secondary-400 dark:bg-surface-200 text-xl font-normal text-white !min-w-fit !px-3 !py-1.5 !rounded-4"
                    onPress={handleEditSoftSkills}
                  >
                    Submit
                  </Button>
                </div>
              }
              header={
                <div className="bg-secondary-400 dark:bg-surface-200 text-white shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                  <LampCharge />
                  <span className="text-white  font-normal text-xl">Add New Soft Skills</span>
                </div>
              }
              isOpen={openEditSoftSkillModal}
              size="4xl"
              onClose={() => setOpenEditSoftSkillModal(true)}
            >
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Skills*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  style={{
                    height: isOpenSkills ? 300 : 50,
                  }}
                  onClick={toggleSkills}
                >
                  <div className="flex gap-4 flex-wrap">
                    {skillsData.data.slice(0, isOpenSkills ? undefined : 5).map((skill: any) => {
                      const isSelected = selectedSkills.includes(skill?.Id);

                      return (
                        <Chip
                          key={skill?.Id}
                          className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                            isSelected
                              ? '!bg-secondary-100 text-secondary-400'
                              : '!bg-[#dee1eb66] text-secondary-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSkillSelect(skill);
                          }}
                        >
                          {skill?.Name}
                        </Chip>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenSkills ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Industrial*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  disabled={selectedSkills.length === 0}
                  style={{
                    height: isOpenIndustrial ? 300 : 50,
                  }}
                  onClick={toggleIndustrial}
                >
                  <div className="flex gap-4 flex-wrap">
                    {skillsData?.industrial
                      .slice(0, isOpenIndustrial ? undefined : 5)
                      .map((industrial: any) => {
                        const isSelected = selectedIndustrial.includes(industrial?.Id);

                        return (
                          <Chip
                            key={industrial?.Id}
                            className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                              isSelected
                                ? '!bg-secondary-100 text-secondary-400'
                                : '!bg-[#dee1e866] text-secondary-700'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIndustrialSelect(industrial);
                            }}
                          >
                            {industrial?.Name}
                          </Chip>
                        );
                      })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenIndustrial ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">Field*</span>
                <button
                  className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"
                  disabled={selectedIndustrial.length === 0}
                  style={{
                    height: isOpenField ? 300 : 50,
                  }}
                  onClick={toggleField}
                >
                  <div className="flex gap-4 flex-wrap">
                    {availableFields.slice(0, isOpenField ? undefined : 5).map((field: any) => {
                      const isSelected = selectedFields.includes(field);

                      return (
                        <Chip
                          key={field?.Name}
                          className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${
                            isSelected
                              ? '!bg-secondary-100 text-secondary-400'
                              : '!bg-[#dee1eb66] text-secondary-700'
                          }`}
                        >
                          {field?.Name}
                        </Chip>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-2">
                    <div
                      className={`w-5 h-5 transition-transform duration-300 ${isOpenField ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </button>
              </div>
            </AppModal>

            <AppModal
              footer={
                <div className="flex items-center gap-[30px] justify-end">
                  <Button
                    className="text-secondary-800 !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                    color="default"
                    variant="light"
                    onPress={() => setIsOpenDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit !h-fit"
                    onPress={() => dispatch(handleDeleteSkillsApi(skillId))}
                  >
                    Delete
                  </Button>
                </div>
              }
              header={
                <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center w-fit">
                  <Trash className="text-white" size="18" />
                  <span className="text-xl text-white font-normal leading-normal">
                    Would it be acceptable for you to remove this?
                  </span>
                </div>
              }
              isOpen={isOpenDeleteModal}
              size="2xl"
              onClose={() => setIsOpenDeleteModal(false)}
            />
          </div>
        ),
      }}
    />
  );
}
