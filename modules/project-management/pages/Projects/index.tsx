import {
  Add,
  ArrowRight,
  Candle2,
  SearchNormal1,
  Setting4,
} from "iconsax-react";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "core";

import { AppTaskProgressChart } from "../../components/AppTaskProgressChart";

export const tasks = [
  {
    id: 1,
    title: "Payroll",
    status: "Inprogress",
    startDate: "2025/01/01",
    deadline: "23 days & 12:00 Left",
    progress: 60,
  },
  {
    id: 2,
    title: "Finance",
    status: "Backlog",
    startDate: "2025/01/10",
    deadline: "Not Started",
    progress: 0,
  },
  {
    id: 3,
    title: "Hiring",
    status: "Done",
    startDate: "2025/02/01",
    deadline: "Completed",
    progress: 100,
  },
  {
    id: 4,
    title: "Onboarding",
    status: "Inprogress",
    startDate: "2025/01/15",
    deadline: "10 days left",
    progress: 45,
  },
  {
    id: 5,
    title: "Planning",
    status: "Backlog",
    startDate: "TBD",
    deadline: "Not Started",
    progress: 0,
  },
  {
    id: 6,
    title: "Evaluation",
    status: "Done",
    startDate: "2025/01/01",
    deadline: "Completed",
    progress: 100,
  },
  {
    id: 7,
    title: "Budgeting",
    status: "Inprogress",
    startDate: "2025/03/01",
    deadline: "7 days left",
    progress: 75,
  },
  {
    id: 8,
    title: "Audit",
    status: "Backlog",
    startDate: "TBD",
    deadline: "Not Started",
    progress: 0,
  },
  {
    id: 9,
    title: "Recruitment",
    status: "Done",
    startDate: "2025/02/15",
    deadline: "Completed",
    progress: 100,
  },
  {
    id: 10,
    title: "Report",
    status: "Inprogress",
    startDate: "2025/04/01",
    deadline: "15 days left",
    progress: 35,
  },
  {
    id: 11,
    title: "Training",
    status: "Backlog",
    startDate: "TBD",
    deadline: "Not Started",
    progress: 0,
  },
  {
    id: 12,
    title: "Performance",
    status: "Done",
    startDate: "2025/01/01",
    deadline: "Completed",
    progress: 100,
  },
];

export default function Projects() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSearchProjects = (name: string) => {
    alert(name);
  };

  return (
    <div className="mx-auto w-full h-[calc(100%-132px)]">
      <div className="flex flex-col gap-3 h-[calc(100vh-270px)]">
        <div className="flex justify-between">
          <Button className="flex items-center gap-2 bg-primary-400 dark:bg-surface-200 !rounded-md !px-3 !py-1.5 w-fit">
            <Candle2 className="text-white" size="18" />
            <span className="text-white text-xl font-normal">All Projects</span>
          </Button>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                {!isSearchOpen && (
                  <Button
                    isIconOnly
                    className="!rounded-md border-1 border-primary-400 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                    color="default"
                    variant="light"
                    onPress={() => setIsSearchOpen(true)}
                  >
                    <SearchNormal1
                      className="text-secondary-1000 dark:text-white"
                      size="24"
                    />
                  </Button>
                )}

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      key="search-input"
                      animate={{ opacity: 1, width: "300px" }}
                      className="overflow-hidden"
                      exit={{ opacity: 0, width: 0 }}
                      initial={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <Input
                        classNames={{
                          inputWrapper:
                            "!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-md border-1 border-primary-400",
                        }}
                        endContent={
                          <button onClick={() => setIsSearchOpen(false)}>
                            <CloseIcon />
                          </button>
                        }
                        placeholder="Search Sth"
                        startContent={
                          <SearchNormal1
                            className="text-secondary-1000 dark:text-white"
                            size="22"
                          />
                        }
                        type="text"
                        onChange={(e: any) =>
                          handleSearchProjects(e.target.value)
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                className="!rounded-md border-1 border-primary-400 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                color="default"
                variant="light"
              >
                <Setting4 className="text-secondary-1000 dark:text-white" />
              </Button>
              <Button
                className="!rounded-md border-1 border-primary-400 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                color="default"
                variant="light"
              >
                <Add
                  className="text-secondary-1000 dark:text-white"
                  size="16"
                />
                <span className="text-secondary-1000 dark:text-white font-semibold text-base">
                  Add New One
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-5 border border-primary-400 bg-[#dcf0f966] h-full p-3">
          <div className="grid grid-cols-5 gap-3">
            {tasks.map((task) => {
              let statusTextColor = "text-secondary-1000";
              let deadlineText = task.deadline;

              if (task.status === "Backlog") {
                statusTextColor = "text-gray-600";
              } else if (task.status === "Done") {
                statusTextColor = "text-success-800";
              }

              return (
                <div
                  key={task.id}
                  className="rounded-5 shadow-shadow-light-tight/1 p-4 bg-white"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <div className="flex gap-1.5">
                          {/*<TaskIcon />*/}
                          <span className="text-base font-semibold text-secondary-1000">
                            {task.title}
                          </span>
                        </div>
                        <Button className="px-1.5 py-1 !rounded-2 !h-fit bg-white border-1 border-primary-400 flex gap-0.5">
                          <span className="text-secondary-1000 text-xs font-normal">
                            Project Board
                          </span>
                          <ArrowRight
                            className="text-secondary-1000"
                            size="12"
                          />
                        </Button>
                      </div>
                      <div className="bg-[#f6f6f666] h-[1px] w-full shadow-shadow-light-tight/1" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2 justify-center">
                          <div className="flex gap-4">
                            {/*<StatusIcon props={{ color: statusColor }} />*/}
                            <div className="flex gap-2">
                              <span
                                className={`${statusTextColor} dark:text-white text-sm font-normal`}
                              >
                                {task.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            {/*<ClockIcon props={{ color: "#04070E" }} />*/}
                            <div className="flex gap-2">
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                Start
                              </span>
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {task.startDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            {/*<ClockIcon props={{ color: "#F23030" }} />*/}
                            <span
                              className={`text-danger-700 dark:text-white text-sm font-normal`}
                            >
                              {deadlineText}
                            </span>
                          </div>
                        </div>
                        <div>
                          <AppTaskProgressChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
