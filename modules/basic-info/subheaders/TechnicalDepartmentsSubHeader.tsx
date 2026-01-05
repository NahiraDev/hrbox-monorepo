import { AppButton } from "@hrbox/uikit/components";
import { ArrowLeft2, Category, Edit, Hierarchy3 } from "iconsax-reactjs";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { Paths } from "@hrbox/modules/paths";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { OrganizationDepartmentModal } from "@hrbox/modules/basic-info/modals/OrganizationDepartmentModal";
import {
  formValidationTechnicalDepartment,
  initialValuesTechnicalDepartment
} from "@hrbox/modules/basic-info/forms/TechnicalDepartmentForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";

const TechnicalDepartmentsSubHeader = (props: any) => {
  const { push } = useNavigation();
  const modal = useModal();
  const handleOpenTechnicalDepartments = () => {
    modal.open(
      ModalType.CREATE,
      "Organization Departments",
      <OrganizationDepartmentModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Category size={18}/> Organization Departments</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesTechnicalDepartment,
          validationSchema: formValidationTechnicalDepartment,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            await handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          }
        }
      },
      ModalSize["5XL"]
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <AppButton
          color=""
          onPress={() => push({ to: Paths.BasicInfo.OrganizationDepartments })}
          content={<ArrowLeft2 color="#292D32" size={24}
          />}
        />
        <div className="flex items-center gap-2 rounded-md bg-primary shdow-theme-sm px-3 py-1.5 w-fit">
          {props.icon && <props.icon color="#fff" />}
          <span className="text-white text-xl font-normal">{props.title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <AppButton
          className="p-2 border border-primary-400"
          radius="lg"
          onPress={handleOpenTechnicalDepartments}
          content={<Edit color="#292D32" size={24}
          />}
        />
        <AppButton
          className="px-3 py-2 border border-primary-400"
          radius="lg"
          onPress={() => push({ to: Paths.BasicInfo.OrganizationDepartments })}
          content={
            <div className="flex gap-2">
              <Hierarchy3 size={22} />
              <span className="text-secondary-1000 text-[16px]">Chart Maker</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TechnicalDepartmentsSubHeader;
