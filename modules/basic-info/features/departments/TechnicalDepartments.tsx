import { Button } from '@heroui/button';
import { technicalDepartment } from 'mock';
import { Avatar, Card } from '@heroui/react';
// import { CloseCircle } from 'iconsax-react';
// import SubHeader from '@module/basic-info/features/SubHeader.tsx';

const TechnicalDepartments = () => {
  return (
    <>
      {/*<SubHeader/>*/}
      {/*<OrganizationColor />*/}
      <div className="w-full gap-3 rounded-2xl flex flex-wrap items-center content-start p-3">
        {technicalDepartment.map((user, index) => (
          <Card
            key={index}
            className="w-39 h-55 bg-white rounded-2xl shadow-[0_1px_2px_1px_#080E1C4D] flex items-center justify-center gap-2 relative"
          >
            <Avatar className="w-30 h-30" radius="sm" src="" />
            {/* <img src={user.diactive} alt="avatar" className="absolute" /> */}
            <span>{user.name}</span>
            <Button className="w-10 h-5 bg-primary-400 border-1 border-primary-400 text-sky-500 dark:text-gold">{user.job}</Button>
          </Card>
        ))}
        <span className="text-9xl absolute top-175 left-455 font-bold text-[#04070E]/10">200</span>
      </div>
    </>
  );
};

// const OrganizationColor = () => {
//   return (
//     <div className="w-180 h-90  p-10 rounded-2xl flex flex-col gap-5">
//       <div className="flex items-center justify-between ">
//         <Button color="primary">organization department</Button>
//         <CloseCircle />
//       </div>
//       <div className="flex items-center justify-between ">
//         <div className="flex flex-col ">
//           <span>Department Title</span>
//           <input className="bg-[#04070E]/20 w-60 h-10 rounded-2xl" placeholder="Describe Title" />
//         </div>
//         <div>
//           <span>Department Color</span>
//           <div className="flex gap-1 ">
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//             <div className="bg-red-500 w-10 h-10 rounded-lg" />
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="flex flex-col ">
//           <span>Description</span>
//           <input className="bg-[#04070E]/20 w-137 h-20 rounded-2xl" placeholder="Describe Title" />
//         </div>
//       </div>
//       <div className="flex items-center justify-end gap-3 ">
//         <Button>Cancel</Button>
//         <Button>Save Change</Button>
//       </div>
//     </div>
//   );
// };

export default TechnicalDepartments;
