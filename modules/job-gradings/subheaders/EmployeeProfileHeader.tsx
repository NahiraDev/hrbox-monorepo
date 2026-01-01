import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import { AppButton, AppSearchInput, AppSupportButton, FormField } from "@hrbox/uikit/components";
import { Add, Additem, ArrowLeft2, Setting, Setting4 } from "iconsax-reactjs";
import { FormProvider } from "@hrbox/core/providers";
import SearchForm from "../forms/SearchForm";

const EmployeeProfileHeader = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <AppPageTitle title={t(props.title)} icon={props.icon} />
        </div>
        <div className="flex flex-row gap-2.5">
         
          <AppButton content={<Setting4 size={24}/>} variant="bordered"/>
          {/* <SearchForm/> */}
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileHeader;
