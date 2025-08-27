import { workerInfo } from 'mock';


import ReportBox from '../../components/ReportBox.tsx';
import { BaseLayout } from '../../../../core';
import BlueHeaderEmployees from '../../components/BlueHeaderEmployees.tsx';

const PersonalInformation = () => {
  return (
    <BaseLayout
      props={{
        children: (
          <div className="w-full rounded-2xl border border-primary-400 bg-gradient-to-r from-sky-100 via-white to-sky-100 h-full flex flex-col justify-between">
            <BlueHeaderEmployees />
            <div className="flex">
              <div>
                <ReportBox />
              </div>
              <div className="grid h-120 grid-cols-2 gap-5 w-full p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200">
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
          </div>
        ),
      }}
    />
  );
};

export default PersonalInformation;
