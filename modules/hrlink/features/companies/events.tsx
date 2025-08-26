import {
  Buildings2,
  Calendar,
  Heart,
  HomeHashtag,
  Location,
  Medal,
  People,
  Share,
} from "iconsax-react";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CompanyLayout } from "@/pages/Companies/Layout.tsx";
import eventAvatar from "@/assets/img/event-img.png";
import { AppPagination } from "@/components/AppPagination.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import { TelegramIcon } from "@/icons/telegramIcon.tsx";
import { LinkedinIcon } from "@/icons/linkedinIcon.tsx";
import { InstagramIcon } from "@/icons/instagramIcon.tsx";
import { WhatssAppIcon } from "@/icons/whatssAppIcon.tsx";
import { AddIcon } from "@/icons/addIcon.tsx";
import jobCompanyLogo from "@/assets/img/job-company-logo.png";
import { useDarkMode } from "@/context/DarkMode.tsx";

const events = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: "Annual Innovation",
  date: "March 15, 2024, 9:00 AM",
  location: "Grand Hotel, 123 Main St",
  partners: "All employees, partners",
}));

export default function CompanyEvents() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNavigateToJobOffers = () => {
    navigate("/job/offers");
  };
  return (
    <CompanyLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between ">
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2 !rounded-4 !bg-transparent !px-3 !py-1.5 w-fit">
                    <HomeHashtag
                      className="text-secondary-400 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      General Info’s
                    </span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 !rounded-4 !bg-transparent !shadow-none !px-3 !py-1.5 w-fit"
                    onPress={handleNavigateToJobOffers}
                  >
                    <JobOffersIcon
                      props={{
                        color: "#1e3363",
                      }}
                    />
                    <span className="text-secondary-400 text-xl font-normal">
                      Job Offers
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit bg-secondary-400 dark:bg-surface-200">
                    <Medal className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">
                      Events
                    </span>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button className="!rounded-4 !px-3 !py-1.5 w-fit !bg-white dark:!bg-info-1000">
                    <span className="text-secondary-1000 dark:text-white text-xl font-normal">
                      Complete the job form
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 bg-white dark:!bg-info-1000 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <Heart
                      className="text-secondary-1000 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-1000 dark:text-white text-xl font-normal">
                      Favorites
                    </span>
                  </Button>
                  <div className="flex items-center gap-2 relative">
                    {!isOpen && (
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2 border-1 border-secondary-400"
                        color="default"
                        variant="light"
                        onPress={() => setIsOpen(true)}
                      >
                        <Share className="text-secondary-1000 dark:text-white" />
                      </Button>
                    )}

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key="share-menu"
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          className="z-10 flex gap-3 bg-[#1E33630F] dark:bg-[#1e33600f] backdrop-blur-[20px] rounded-4"
                          exit={{ opacity: 0, scale: 0.95, x: 50 }}
                          initial={{ opacity: 0, scale: 0.95, x: 50 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <Button
                            isIconOnly
                            className="!rounded-4 shadow-shadow-light-tight/1 min-w-fit p-2 bg-secondary-400"
                            color="default"
                            variant="light"
                            onPress={() => setIsOpen(false)}
                          >
                            <Share className="text-white" />
                          </Button>

                          <div className="flex gap-1.5">
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              color="default"
                              variant="light"
                            >
                              <TelegramIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              color="default"
                              variant="light"
                            >
                              <LinkedinIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              color="default"
                              variant="light"
                            >
                              <InstagramIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              color="default"
                              variant="light"
                            >
                              <WhatssAppIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              color="default"
                              variant="light"
                            >
                              <AddIcon />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-3 gap-3">
                  {events.map((event: any) => (
                    <div
                      key={event.id}
                      className="rounded-5 dark:bg-info-1000 shadow-shadow-light-tight/1 px-3 py-4"
                      style={{
                        backgroundColor: darkMode ? "#01101A" : "#FFF5F0",
                        backgroundImage: `url(${jobCompanyLogo})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundBlendMode: darkMode ? "darken" : "lighten",
                      }}
                    >
                      <div className="flex flex-col gap-[14px]">
                        <div className="flex justify-between pb-1 border-b-1 border-netural-100 dark:border-netural-400">
                          <div className="flex items-center gap-2">
                            <Buildings2
                              className="text-secondary-400 dark:text-white"
                              size="22"
                            />
                            <span className="text-secondary-1000 dark:text-white font-semibold">
                              {event.title}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <img
                            alt=""
                            className="rounded-[14px]"
                            src={eventAvatar}
                            style={{
                              width: "96px",
                              height: "96px",
                            }}
                          />
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-4">
                              <Calendar
                                className="text-[#292D32] dark:dark:text-white"
                                size="20"
                              />
                              <span className="text-sm text-[#353535] dark:dark:text-white font-semibold">
                                March 15, 2024, 9:00 AM
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <Location
                                className="text-[#292D32] dark:dark:text-white"
                                size="20"
                              />
                              <span className="text-sm text-[#353535] dark:dark:text-white font-semibold">
                                March 15, 2024, 9:00 AM
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <People
                                className="text-[#292D32] dark:dark:text-white"
                                size="20"
                              />
                              <span className="text-sm text-[#353535] dark:dark:text-white font-semibold">
                                March 15, 2024, 9:00 AM
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <AppPagination
                    props={{
                      size: "sm",
                      total: "100",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
}
