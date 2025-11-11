import { Edit, Trash } from 'iconsax-reactjs';
import { AppButton, AppPagination } from '@hrbox/uikit/components';
import { useEffect } from 'react';

import { AcademyIcon } from '@module/hrlink/icons';
import { GeneralInformation, UserLocation } from '@module/hrlink/features/common';

import { useLazyFetchCoursesQuery } from '@module/hrlink/features/resume/apis';

const Courses = () => {
  const [fetchCourses, { data }] = useLazyFetchCoursesQuery();

  useEffect(() => {
    fetchCourses({});
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-3">
            {data &&
              data.map((course: any, index: number) => (
                <div key={index} className="rounded-5 shdow-theme-sm p-4 bg-white">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1.5 border-b-1 border-neutral-100 pb-1.5">
                      <div className="flex justify-between">
                        <div className="flex gap-1.5">
                          <AcademyIcon color="#04070E" />
                          <span className="text-base font-semibold text-secondary-1000">{course.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <AppButton
                            props={{
                              isIconOnly: true,
                              color: 'white',
                              size: 'md',
                              radius: 'sm',
                              content: <Edit className="text-secondary-1000" size="14" />,
                            }}
                          />
                          <AppButton
                            props={{
                              isIconOnly: true,
                              color: 'white',
                              size: 'md',
                              radius: 'sm',
                              content: <Trash className="text-secondary-1000" size="14" />,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 text-sm font-light">title:</span>
                            <span className="text-secondary-1000 text-sm font-normal">{course.title}</span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 text-sm font-light">Date:</span>
                            <span className="text-secondary-1000 text-sm font-normal">{course.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-secondary-1000 text-sm font-light">Description:</span>
                        <span className="text-secondary-1000 text-sm font-normal">{course.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center">
            <AppPagination total={10} />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Courses;
