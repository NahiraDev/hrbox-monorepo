import {
  Buildings2,
  Clock,
  DocumentForward,
  DollarCircle,
  Location,
  Status,
} from "iconsax-reactjs";
import { useFetchJobOpportunitiesQuery } from "@hrbox/modules/hrlink/apis";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { Button } from "@heroui/react";

const JobOpportunities = () => {
  const { data: jobs, isError, isSuccess } = useFetchJobOpportunitiesQuery();
  const { push } = useNavigation();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grid grid-cols-3 gap-3">
        {jobs &&
          jobs.data.ViewList.map((oppertunitie: any) => (
            <button
              key={oppertunitie.id}
              onClick={() =>
                push({ to: "/job/detail/" + oppertunitie.company })
              }
            >
              <div className="rounded-5 shadow-shadow-light-tight/1 px-3 py-4">
                <div className="flex justify-between pb-1 border-b-1 border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <Buildings2 className="text-secondary-400" size="22" />
                    <span className="text-secondary-1000 font-semibold">
                      {oppertunitie.Name}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      className="!h-[22px] !w-[54px] !min-w-fit flex items-center gap-2 !px-1 !py-0.5 !rounded-2 bg-white"
                      variant="light"
                    >
                      <span className="text-secondary-1000 text-[10px] font-normal">
                        Easy Apply
                      </span>
                      <DocumentForward
                        className="text-secondary-1000"
                        size="12"
                      />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-secondary-800 font-bold text-sm leading-normal">
                      {oppertunitie.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <Location className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 text-sm font-normal">
                        {oppertunitie.adress.length > 50
                          ? `${oppertunitie.adress.slice(0, 50)}...`
                          : oppertunitie.adress}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 text-sm font-normal">
                        {oppertunitie.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarCircle className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 text-sm font-normal">
                        {oppertunitie.salary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Status className="text-info" size="20" variant="Bold" />
                      <span className="text-info-700 text-sm font-normal">
                        {oppertunitie.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-end">
                      <img
                        alt=""
                        className="w-[84px] h-[84px] rounded-5"
                        src={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
      </div>
      <div className="flex justify-center">
        {/*<AppPagination total={100} />*/}
      </div>
    </div>
  );
};

export default JobOpportunities;
