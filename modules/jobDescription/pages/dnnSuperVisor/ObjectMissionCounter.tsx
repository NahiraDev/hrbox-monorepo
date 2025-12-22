import {
  ArchiveBook,
  Bookmark2,
  Briefcase,
  Chart,
  ChartCircle,
  ProfileAdd,
  Radar2,
  UserOctagon,
} from "iconsax-reactjs";
import { objectivesCard } from "../../app/mock";
import "../../app/index.css";
const ObjectMissionCounter = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        {/* header content */}
        <div className="flex pt-3 pr-[124px] pb-4 pl-6 bg-[#DCF0F9] dark:bg-[#04425C] rounded-t-xl">
          <div className="flex flex-row gap-[114px]">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5 dark:text-[#DEE1E8]!">
                  <span>
                    <Briefcase size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Job Title:
                    <span className="font-bold"> HR Specialist</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <UserOctagon size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Supervisor:
                    <span className="font-bold"> CEO</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <ProfileAdd size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Positions Needed:
                    <span className="font-bold"> 1</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <ChartCircle size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Recruitment Process Management:
                    <span className="font-bold"> Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header content */}
        {/* cards */}
        <div className="flex flex-row gap-4 p-4">
          {/* objectives */}
          <div className="flex flex-col w-full gap-3">
            {/*title */}
            <div className="flex flex-row gap-1 ">
              <span>
                <Radar2 size={24} />
              </span>
              <p className="text-xl font-semibold">Objectives</p>
            </div>
            {/*title */}
            {/* objective cards */}
            <div className="flex flex-row flex-wrap gap-3 gap-y-3 overflow-y-scroll max-h-[506px] custom-scroll-objectives">
              {objectivesCard.map((card) => (
                <div className="px-4 py-3 rounded-xl flex flex-col bg-white gap-3 w-[216px] shadow-[0_1px_3px_0_rgba(8,14,28,0.30)] dark:shadow-none">
                  <div className="flex flex-row gap-1 border-b border-neutral-100">
                    <span>
                      <ArchiveBook size={20} />
                    </span>
                    <p className="text-[16px] font-semibold">{card.title}</p>
                  </div>
                  <div className="w-full">
                    <p className="text-[12px]">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* objective cards */}
          </div>
          {/* objectives */}
          <div className="flex flex-col gap-3 w-full">
            {/*title */}
            <div className="flex flex-row gap-1 ">
              <span>
                <Bookmark2 size={24} />
              </span>
              <p className="text-xl font-semibold">Misions</p>
            </div>
            {/*title */}
            {/* objective cards */}
            <div className="flex flex-row flex-wrap gap-3 gap-y-3 overflow-y-scroll max-h-[506px]  custom-scroll-objectives">
              {objectivesCard.map((card) => (
                <div className="px-4 py-3 rounded-xl flex flex-col bg-white gap-3 w-[216px] shadow-[0_1px_3px_0_rgba(8,14,28,0.30)]">
                  <div className="flex flex-row gap-1 w-full border-b border-neutral-100 ">
                    <span>
                      <ArchiveBook size={20} />
                    </span>
                    <p className="text-[16px] font-semibold">{card.title}</p>
                  </div>
                  <div className="w-full">
                    <p className="text-[12px]">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* objective cards */}
          </div>
        </div>
        {/* cards */}
      </div>
    </>
  );
};

export default ObjectMissionCounter;
