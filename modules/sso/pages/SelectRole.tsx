import { User } from "iconsax-reactjs";

const SelectRole = () => {

  return (
    <div className="flex flex-col gap-12">
      <p className="text-secondary-1000 text-2xl font-normal text-justify">
        Please select your desired user panel from the list below to access relevant information and dedicated
        functionalities.
      </p>
      <div className="flex gap-3">
        <div className="bg-white p-6 rounded-5 flex flex-col gap-3">
          <div className="bg-tertiar-400 w-[140px] h-[140px] rounded-[18px] flex justify-center items-center">
            <User />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-secondary-1000 text-sm font-semibold">Jahan Hatami</span>
            <span className="text-tertiar-700 text-sm font-semibold">Dev Chapter Leader</span>
            <div className="px-[10px] py-0.5 border-1 border-tertiar-0 rounded-md w-fit bg-[#fedee666]">
              <span className="text-tertiar-700 text-sm font-semibold">Hr-Link</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-5 flex flex-col gap-3">
          <div className="w-[140px] h-[140px] rounded-[18px] flex justify-center items-center">
            <img alt="inpersonate-avatar" className="rounded-3xl" src={''} />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-secondary-1000 text-sm font-semibold">Jahan Hatami</span>
            <span className="text-primary-700 text-sm font-semibold">Dev Chapter Leader</span>
            <div className="px-[10px] py-0.5 border-1 border-[#DCF0F9] rounded-md w-fit bg-[#dcf0f966]">
              <span className="text-primary-400 text-sm font-semibold">Hrbox Holding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectRole