import { workerInfo } from 'mock';
import { BasicInfoLayout } from '../common';

const PersonalInformation = () => {
  return (
    <BasicInfoLayout
      content={
        <div
          className="grid h-full grid-cols-2 gap-5 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200
                [&::-webkit-scrollbar]:w-3
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {workerInfo.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-[#DDEEFA] flex items-center justify-between p-4 rounded-2xl"
            >
              <div className="flex items-center gap-1">
                {user.icon}
                <span>{user.title}</span>
              </div>
              <div>
                <span>{user.text}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default PersonalInformation;
