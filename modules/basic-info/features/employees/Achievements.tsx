import { Card } from '@heroui/react';
import { achivements } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import {
  Settings,
  TextalignJustifyleft,
  Trash,
  Calendar,
  Teacher,
  Cup,
} from 'iconsax-react';
import { useModalContext } from '@core/context';
import { BasicInfoLayout } from '@module/basic-info/features/common';
import AddNewCourses from '@module/basic-info/features/employees/modals/AddNewCourses';
import AchievementShowModeModal from '@module/basic-info/features/employees/modals/AchievementShowModeModal';
import { useSelectableCard } from '@module/basic-info/features/customHooks/useSelectableCard';

const Achievements = () => {
  const { openModal } = useModalContext();
  const { selectedCardIndex, handleCardClick } = useSelectableCard(); // ✅ استفاده از هوک

  const handleDeleteClick = (index: number) => {
    openModal(
      'delete',
      '',
      <AppDeleteModal
        onConfirm={() => console.log('Deleted item:', index)}
        onCancel={() => console.log('Deletion cancelled')}
      />,
      undefined,
      'sm',
      'Do you want to remove it?',
      <Trash className="text-white" />
    );
  };

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-4 gap-4 w-full p-4 overflow-y-auto max-h-[600px] ">
          {achivements.map((user: any, index) => {
            const isSelected = selectedCardIndex === index;

            return (
              <Card
                key={index}
                isPressable
                onPress={() => {
                  handleCardClick(index);
                  openModal(
                    'edit',
                    '',
                    <AchievementShowModeModal />,
                    undefined,
                    '3xl',
                    'Courses',
                    <Cup className="text-white" />
                  );
                }}
                className={`cursor-pointer p-3 w-full h-full shadow-light-tight-1 transition-all duration-200 ease-in-out
    ${isSelected ? 'border-primary-400 bg-[#D6F2FF]' : 'bg-white border border-transparent hover:border-sky-400 hover:border-[1px]'}`}
              >

              <div className="flex flex-col gap-2 ">
                  <div className="flex items-center justify-between border-b-2 border-gray-200 ">
                    <div className="pl-1 pb-[7px] pt-[5px] flex gap-2 items-center ">
                      <span className="w-2 h-2 rounded-full bg-[#22AD5C]"></span>
                      <Cup  variant="Bold" size={20} />
                      <span className="!font-bold ">{user.champion}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 pb-1.5">
                      <AppButton
                        props={{
                          size: 'xs',
                          radius: 'sm',
                          variant: 'light',
                          isIconOnly: true,
                          onPress: (e: any) => {
                            e.stopPropagation(); // ✅ جلوگیری از باز شدن مودال هنگام حذف
                            handleDeleteClick(index);
                          },
                          content: (
                            <Trash
                              className="text-secondary-1000 group-hover:text-white"
                              size={16}
                            />
                          ),
                          className:
                            'p-1 hover:!bg-red-500 transition-all duration-200',
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-0.5 items-center justify-between w-full border border-surface-50 rounded-lg p-1.5 ">
                    <div className="flex gap-2 items-center ">
                      <Settings size="16" />
                      <span className="!text-xs  text-secondary-1000">Title</span>
                    </div>
                    <div className="">
                      <span className="!text-xs !text-semibold text-secondary-1000">{user.title}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5 items-center justify-between  w-full border border-surface-50 rounded-lg p-1.5">
                    <div className="flex gap-2 items-center">
                      <Calendar size="16" />
                      <span className="!text-xs text-secondary-1000">Date</span>
                    </div>
                    <div className="">
                      <span className="!text-xs !text-semibold text-secondary-1000">{user.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-start w-full border border-surface-50 rounded-lg p-1.5">
                    <div className="flex gap-2 items-center">
                      <TextalignJustifyleft size="16" />
                      <span className="!text-xs  text-secondary-1000">Description</span>
                    </div>
                    <div className="text-left">
                      <span className="!text-xs !text-semibold text-secondary-1000">{user.description}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          <AddNewCourses />
        </div>
      }
    />
  );
};

export default Achievements;
