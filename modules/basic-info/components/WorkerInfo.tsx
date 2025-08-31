import { User } from 'iconsax-react';
const WorkerInfo = () => {
  return (
    <div className=" bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-[#DDEEFA] flex items-center justify-between p-4 rounded-lg">
      <div className="flex items-center gap-1">
        <User />
        Nation Code
      </div>
      <div className='font-bold'>4311673655</div>
    </div>
  );
};

export default WorkerInfo;
