import { workerInfo } from "@module/basic-info/app/mock";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";

const cardContainerClass = `grid h-full grid-cols-2 gap-5  overflow-y-scroll  max-h-[calc(65vh)] my-6 mx-2.5 pr-4.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;

const cardClass = `bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-primary-50 flex items-center justify-between px-4 py-3 rounded-lg mr-3`;

const PersonalInformation = () => {
  return (
    <BasicInfoLayout
      content={
        <div className={cardContainerClass}>
          {workerInfo.map((user, index) => (
            <div key={`user-${index}`} className={cardClass}>
              <div className="flex items-center gap-1.5">
                {user.icon}
                <span className="text-[16px] text-secondary-1000 font-light">{user.title}</span>
              </div>
              <div>
                <span className="text-[16px] text-secondary-1000 font-semibold">{user.text}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default PersonalInformation;
