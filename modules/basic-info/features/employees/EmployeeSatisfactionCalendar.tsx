// import { days } from 'mock';

import { BaseLayout } from '../../../../core';
import EmployeeSatisfactionCalendar1 from '../../components/satisfactionCalnder.tsx';

const EmployeeSatisfactionCalendar = () => {
  return (
    <BaseLayout
      props={{
        children: (
          <div className="w-full rounded-2xl border border-primary-400 bg-[#DCF0F966] p-3 h-full flex flex-col justify-between">
            <div className="">
              <EmployeeSatisfactionCalendar1 />
            </div>
          </div>
        ),
      }}
    />
  );
};

export default EmployeeSatisfactionCalendar;






{/*<>{days.map((day, index) => (*/}
{/*  <div*/}
{/*    key={index}*/}
{/*    className="bg-[#DCF0F966]/40 flex flex-col pt-3 pb-3  "*/}
{/*  >*/}
{/*    <div className="flex gap-2 ml-5 mb-[-5px]">*/}
{/*      <div className="bg-gradient-to-t from-[#0E4A27] to-[#22AD5C] rounded-full w-15 h-15 flex items-center justify-center text-white text-2xl font-bold">*/}
{/*        {day.day17}*/}
{/*      </div>*/}
{/*      <div className="bg-gradient-to-t from-[#905113] to-[#FD8F02] rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">*/}
{/*        {day.day10}*/}
{/*      </div>*/}
{/*      <div className=" rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold">*/}
{/*        {day.date}*/}
{/*      </div>*/}
{/*    </div>*/}
{/*    <div className="flex gap-4 ml-18 items-center  mt-[-5px]">*/}
{/*      <div className="bg-gradient-to-t from-[#1D944E] to-[#61C48A] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">*/}
{/*        {day.day2}*/}
{/*      </div>{' '}*/}
{/*      <div className="bg-gradient-to-t from-[#8A1B1B] to-[#F23030] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">*/}
{/*        {day.day8}*/}
{/*      </div>*/}
{/*    </div>*/}
{/*  </div>*/}
{/*))}</>*/}
