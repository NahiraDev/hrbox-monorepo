import { workerInfo } from 'mock';

import ReportBox from '../../components/ReportBox.tsx';
import BlueHeaderEmployees from '../../components/BlueHeaderEmployees.tsx';

const PersonalInformation = () => {
  return (
    <>
      <BlueHeaderEmployees />
      <div classzName="flex ">
        <div>
          <ReportBox />
        </div>
        <div
          className="grid h-100 grid-cols-2 gap-5 w-346 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200
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
      </div>
    </>
  );
};

export default PersonalInformation;
