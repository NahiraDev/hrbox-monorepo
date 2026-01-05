import { workerInfo } from "@module/basic-info/app/mock";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";

const cardContainerClass = `grid h-full grid-cols-2 gap-5 m-4 overflow-y-auto max-h-[calc(100vh-100px)]
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;

const cardClass = `bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-primary-50 flex items-center justify-between px-4 py-3 rounded-lg`;

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
