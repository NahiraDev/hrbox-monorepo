import { AppButton } from "@hrbox/uikit/components";
import { Add,Setting4, SearchNormal1 } from "iconsax-reactjs";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import {
  formValidationOrganizationLocation,
  initialValuesOrganizationLocation
} from "@hrbox/modules/basic-info/forms/OrganizationLocationForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { FilterCalenderModal } from "@hrbox/modules/basic-info/modals/FilterCalenderModal";
import { useModal } from "@hrbox/core/hooks";

const EmployeesSubHeader = (props: any) => {

  const modal = useModal()

  const handleOpenFilterCalenderModal = () => {
    modal.open(
      ModalType.EDIT,
      "OrganizationLocationModal",
      <FilterCalenderModal/>,
      {
        isForm: true,
        title: "Filter ",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "OrganizationLocationModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "");
          },
        },
      },
      ModalSize.XL,
    );
  };



  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <div className="flex items-center gap-2 rounded-md bg-primary shdow-theme-sm px-3 py-1.5 w-fit">
          {props.icon && <props.icon color="#fff" />}
          <span className="text-white text-xl font-normal">{props.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <AppButton
          className="p-2 border border-primary-400"
          radius='lg'
          content={<SearchNormal1 color="#292D32" size={24}
          />}
        />
        <AppButton
          className="p-2 border border-primary-400"
          radius='lg'
          onPress={handleOpenFilterCalenderModal}
          content={<Setting4 color="#292D32" size={24}
          />}
        />
        <AppButton
          className="px-3 py-2 border border-primary-400"
          radius="lg"
          content={
            <div className="flex gap-2" >
              <Add size={22}/>
              <span className="text-secondary-1000 text-[16px]">Add New One</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EmployeesSubHeader;

