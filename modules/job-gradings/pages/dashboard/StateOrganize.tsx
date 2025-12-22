import {useTranslation} from "react-i18next";
import { organization } from "../../app/mock";



const StateOrganize = () => {
    const { t } = useTranslation();
    return (
    <div className="flex flex-col overflow-auto   dark:bg-[#04425C60] border-primary border rounded-xl p-4 bg-[#DCF0F9]">
      <div className=" pb-2 border-b border-[#05587A]">
        <p className="text-secondary-1000 font-sans text-[24px] font-semibold">
          {t("TheStateOfTheOrganization")}
        </p>
        
      </div>



      <div className=" overflow-auto flex flex-col justify-around flex-1 gap-3 pt-2">
        {organization.map((element) => (
          <div
            key={element.id}
            className="bg-white py-3 px-3 flex flex-col rounded-xl w-full"
          >
            <div className="flex w-full justify-between items-center">
              <p className="text-secondary-1000   text-xl font-semibold">
                {element.title}
              </p>
              <span className="text-[32px] text-[#1E3363] dark:text-[#DEE1E8] opacity-50  font-bold ">
                {element.number}
              </span>
            </div>
            <hr className="w-full border-[#B2B2B2]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateOrganize;
