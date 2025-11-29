import { Edit, Trash } from 'iconsax-reactjs';
import { AppButton, AppPagination } from '@hrbox/uikit/components';
import { useFetchCoursesQuery } from "@hrbox-monorepo/modules/hrlink/apis";
import { AcademyIcon } from "@hrbox/uikit/icons";
import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";
import { ChartCircle } from 'iconsax-reactjs'; // or any error icon you have

const Courses = () => {
  {
  const {
    data: courses = [],        // default to empty array
    isLoading,
    isError,
    error,
    isFetching
  } = useFetchCoursesQuery(undefined, {
    // Optional: only run query when component is mounted and visible
    refetchOnMountOrArgChange: true,
  });

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-secondary-600">Loading courses...</div>
      </div>
    );
  }

  // Error state
  if (isError) {
    console.error("Courses API error:", error);
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <AlertCircle size={48} className="text-red-500" />
        <p className="text-red-600 font-medium">Error loading courses</p>
        <p className="text-sm text-secondary-600">
          {(error as any)?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // No data
  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-600">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-3">
            {courses.map((course: any, index: number) => (
              <div key={course.id || index} className="rounded-lg shadow-theme-sm p-4 bg-white">
                {/* your card content - unchanged */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1.5 border-b border-neutral-100 pb-1.5">
                    <div className="flex justify-between">
                      <div className="flex gap-1.5 items-center">
                        <AcademyIcon color="#04070E" />
                        <span className="text-base font-semibold text-secondary-1000">
                          {course.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          isIconOnly
                          color="white"
                          size="md"
                          radius="sm"
                          content={<Edit className="text-secondary-1000" size="14" />}
                        />
                        <AppButton
                          isIconOnly
                          color="white"
                          size="md"
                          radius="sm"
                          content={<Trash className="text-secondary-1000" size="14" />}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-4">
                      <span className="font-light text-secondary-1000">Title:</span>
                      <span className="font-normal">{course.title || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-light text-secondary-1000">Date:</span>
                      <span className="font-normal">{course.date || '-'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-light text-secondary-1000">Description:</span>
                      <span className="font-normal">{course.description || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - you probably want to use real meta from the API */}
          <div className="flex justify-center mt-6">
            <AppPagination
              meta={{
                page: 1,
                pageSize: 10,
                total: courses.length,
                totalPages: 1
              }}
              onPageChange={() => {}}
            />
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
}

export default Courses;