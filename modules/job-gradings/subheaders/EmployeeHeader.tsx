import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import { AppButton, AppSearchInput } from "@hrbox/uikit/components";
import { Add, Additem, ArrowLeft2 } from "iconsax-reactjs";

const EmployeeHeader = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <AppPageTitle title={t("Employee-job_fit")} icon={props.icon} />
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput />
          <AppButton
            color="white"
            size="md"
            radius="lg"
            startContent={<Add size={22} />}
            className="border-1 border-primary"
            content={t("add_new_one")}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
