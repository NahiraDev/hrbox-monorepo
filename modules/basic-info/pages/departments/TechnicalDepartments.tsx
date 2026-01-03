import { technicalDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from '@hrbox/uikit/components';
import { OrganizationDepartmentModal } from '@hrbox/modules/basic-info/modals/OrganizationDepartmentModal';
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";
import { useModal } from "@hrbox/core/hooks";
import {
  initialValuesTechnicalDepartment,
  formValidationTechnicalDepartment
} from "@hrbox/modules/basic-info/forms/TechnicalDepartmentForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { TickIcon } from "@hrbox/uikit/icons";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { Paths } from "@hrbox/modules/paths";

const TechnicalDepartments = () => {

  const { push } = useNavigation();



  return (
    <div className="flex flex-col items-center justify-between">
      <div className="w-full grid grid-cols-12 gap-4">
        {technicalDepartment.map((user, index) => (
          <Card
            key={index}
            isPressable
            className="p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 relative  hover:!bg-[#D6F2FF]"
            onPress={() => push({ to: Paths.BasicInfo.PersonalInformation })}
          >
            <Avatar
              className="w-30 h-30"
              color="primary"
              radius="lg"
            />

            <TickIcon
              className="absolute top-2 right-3"
              width={22}
              height={22}
            />


            <span className="text-xs font-semibold text-secondary-1000">
              {user.name}
            </span>

            <AppButton
              className="bg-primary-50 border border-primary-100 text-primary-400 text-xs"
              size="sm"
              radius="xl"
              variant="solid"
              content={<span>{user.job}</span>}
            />
          </Card>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
        <span className="text-[100px] font-black text-[#1E3363]/20">
          200
        </span>
      </div>
    </div>
  );
};

export default TechnicalDepartments;
