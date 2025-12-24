import {ArchiveBook,  ArrowRight, Calendar, Document} from "iconsax-reactjs";
import {AppButton} from "@hrbox/uikit/components";
import {useTranslation} from "react-i18next";
import { JD } from "../../app/mock";

const JDList = () => {
  
  const { t } = useTranslation();
  return (
      <div className="h-full min-h-0 flex flex-col overflow-hidden dark:bg-[#04425C60]  bg-[#DCF0F9] border border-[#B8D4E3]  rounded-xl">

        <div className="shrink-0 w-full flex flex-col px-3 py-3">
          <div className="w-full flex flex-row justify-between items-center pb-2.5">
            <p className="text-secondary-1000 font-sans text-md font-semibold">
              JD List
            </p>
            <AppButton
                color= 'dark'
                size= 'xs'
                radius= 'lg'
                endContent= {<ArrowRight size={13} />}
                className= 'border-1 border-primary'

                content={t('SeeMore')}

            />
          </div>
          <hr className="w-full border-[#05587A]" />
        </div>


        <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-3 flex flex-col gap-y-2">
          {JD.map((item) => (
              <div
                  key={item.id}
                  className="w-full py-3 bg-white dark:bg-info-1000 shadow-sm  flex flex-col gap-2 rounded-lg"
              >

                <div className="w-full justify-center flex flex-col px-3">
                  <div className="w-full flex flex-row items-center gap-2 pb-1.5">
                    <ArchiveBook className="w-4 h-4 text-[#0A9AD7]" />
                    <p className="text-secondary-1000 font-sans text-md font-semibold">
                      {item.title}
                    </p>
                  </div>
                  <hr className="w-full border-neutral-200" />
                </div>


                <div className="w-full flex flex-row items-center px-3 justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-600 text-sm">{item.title2}</p>
                  </div>
                  <span className="text-secondary-1000 text-sm font-medium">
                {item.number}
              </span>
                </div>


                <div className="w-full flex flex-row items-center px-3 justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Document className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-600 text-sm">{item.title3}</p>
                  </div>

                  <div
                      className="px-2.5 py-0.5 rounded-lg flex justify-center items-center rounded"
                      style={{
                        backgroundColor: item.color || "#e5e7eb",
                      }}
                  >
                <span className="text-xs  text-secondary-1000 font-medium">
                  {item.Grade}
                </span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default JDList;
