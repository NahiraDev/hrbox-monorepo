import { technicalDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from '@hrbox/uikit/components';
import { OrganizationDepartmentModal } from '@hrbox/modules/basic-info/modals/OrganizationDepartmentModal';
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";
import { TickCircle } from 'iconsax-reactjs';
import { useModal } from "@hrbox/core/hooks";
import { initialValuesTechnicalDepartment,  formValidationTechnicalDepartment } from "@hrbox/modules/basic-info/forms/TechnicalDepartmentForm";
import {handleSubmitAward} from "@hrbox/modules/hrlink/forms/AwardForm"

const TechnicalDepartments = () => {
  const modal = useModal()
  const handleOpenTechnicalDepartments = () => {
    modal.open(
      ModalType.EDIT,
      "Organization Departments",
      <OrganizationDepartmentModal />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesTechnicalDepartment,
          validationSchema: formValidationTechnicalDepartment,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.XL,
    );
  };

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="w-full grid grid-cols-9 gap-4">
        {technicalDepartment.map((user, index) => (
          <Card
            key={index}
            className="p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-2 relative">
            <Avatar className="w-30 h-30 " color="primary" radius="lg"/>
            <TickCircle className="absolute top-2 right-3" size="22" color="gray" />
            <span className="!text-sm !font-semibold text-secondary-1000">{user.name}</span>
            <AppButton
                size='sm'
                radius='sm'
                variant="solid"
                onPress={()=>handleOpenTechnicalDepartments}
                content={<span>{user.job}</span>}
            />
          </Card>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
        <span className="!text-[100px] !font-extrabold text-secondary-400/40">200</span>
      </div>
    </div>
  );
};

export default TechnicalDepartments;
