import { UserRemove } from "iconsax-reactjs";
import {useTranslation} from "react-i18next";
const EmployeeStatus = () => {
  const { t } = useTranslation();
  return (
    <div className=" dark:bg-[#04425C60]  bg-[#DCF0F9] border rounded-xl border-primary p-4 flex flex-col">
      <div className="w-full pb-2 border-b border-[#05587A] ">
        <p className="text-secondary-1000 font-sans text-2xl font-semibold text-capitalize  ">
          {t("Jobemployeefitstatus")}
        </p>
      </div>
      <div className="flex-1 flex items-center justify-around pt-4">
        <div className="flex w-fit flex-col items-center ">
          <UserRemove color="#8A1B1B" className="w-10 h-10 " />
          <span className="text-[32px] font-extrabold text-[#F23030]!  opacity-60">
            14%
          </span>
          <p className="text-[#F23030]! text-[24px] font-extrabold font-sans ">
            lower
          </p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <UserRemove color="#136234" className="w-10 h-10 " />
          <span className="text-[32px] font-extrabold text-success! opacity-[0.6]">
            53%
          </span>
          <p className="text-success! text-[24px] font-extrabold font-sans ">
            proportional
          </p>
        </div>
        <div className="flex w-fit flex-col items-center">
          <UserRemove color="#05587A" className="w-10 h-10 " />
          <span className="text-[32px] font-extrabold text-primary-700! opacity-[0.6]">
            53%
          </span>
          <p className="text-primary-700! text-[24px] font-extrabold font-sans ">
            beyond
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatus;
