import { AppButton } from "@hrbox/uikit/components";
import { SearchNormal1, Add, Location } from "iconsax-reactjs";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { OrganizationLocationModal } from "@hrbox/modules/basic-info/modals/OrganizationLocationModal";
import {
  formValidationOrganizationLocation,
  initialValuesOrganizationLocation
} from "@hrbox/modules/basic-info/forms/OrganizationLocationForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import React from "react";


const OrganizationLocationSubHeader = (props: any) => {

  const modal = useModal()

  const handleOpenOrganizationLocation = () => {
    modal.open(
      ModalType.CREATE,
      "OrganizationLocationModal",
      <OrganizationLocationModal/>,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Location size={18}/> Organizational Locations</div>,
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
            modal.close(ModalType.CREATE, "OrganizationLocationModal");
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
          className="px-3 py-2 border border-primary-400"
          radius="lg"
          onPress={handleOpenOrganizationLocation}
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

export default OrganizationLocationSubHeader;

