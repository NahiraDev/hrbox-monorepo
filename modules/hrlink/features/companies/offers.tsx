import {
  Buildings2,
  Clock,
  DollarCircle,
  Heart,
  HomeHashtag,
  Location,
  Medal,
  Share,
  Status
} from "iconsax-react";
import { Button } from "@heroui/button";

import { CompanyLayout } from "@/pages/Companies/Layout.tsx";
import jobCompanyLogo from "@/assets/img/job-company-logo.png";
import { AppPagination } from "@/components/AppPagination.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import AppStarRating from "@/components/AppStarRate.tsx";
import { TelegramIcon } from "@/icons/telegramIcon.tsx";
import { LinkedinIcon } from "@/icons/linkedinIcon.tsx";
import { InstagramIcon } from "@/icons/instagramIcon.tsx";
import { WhatssAppIcon } from "@/icons/whatssAppIcon.tsx";
import { AddIcon } from "@/icons/addIcon.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/createStore.ts";

const offers = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  company: "Nahira",
  title: "User Research Designer",
  location: "Karaj",
  type: "Full-time",
  salary: "20 ML",
  status: "Under review",
  rating: 1,
}));

export default function CompanyGeneralInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  //
  // const handleNavigateToJobOffers = () => {
  //   navigate("/company/job-offers");
  // };
  // const handleNavigateToEvents = () => {
  //   navigate("/company/events");
  // };

  return (
    <CompanyLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between ">
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2 !rounded-4 !bg-transparent !px-3 !py-1.5 w-fit">
                    <HomeHashtag className="text-secondary-400" size="22" />
                    <span className="text-secondary-400 text-xl font-normal">
                      General Info’s
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <JobOffersIcon
                      props={{
                        color: "#fff",
                      }}
                    />
                    <span className="text-white text-xl font-normal">
                      Job Offers
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent">
                    <Medal className="text-secondary-400" size="22" />
                    <span className="text-secondary-400 text-xl font-normal">
                      Events
                    </span>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button className="!rounded-4 !px-3 !py-1.5 w-fit !bg-white">
                    <span className="text-secondary-1000 text-xl font-normal">
                      Complete the job form
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 bg-white shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <Heart className="text-secondary-1000" size="22" />
                    <span className="text-secondary-1000 text-xl font-normal">
                      Favorites
                    </span>
                  </Button>
                  <div className="flex gap-3 bg-[#1E33630F] backdrop-blur-[20px] rounded-4">
                    <div className="flex items-center gap-2 relative">
                      {!isOpen && (
                        <Button
                          className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2 border-1 hover:border-secondary-400 transition "
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
                            exit={{ opacity: 0, scale: 1, x: 0 }}
                            initial={{ opacity: 0, scale: 1, x: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
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
                    <div className="flex gap-1.5">
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                      >
                        <TelegramIcon/>
                      </Button>
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                      >
                        <LinkedinIcon/>
                      </Button>
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                      >
                        <InstagramIcon/>
                      </Button>
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                      >
                        <WhatssAppIcon/>
                      </Button>
                      <Button
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                        color="default"
                        variant="light"
                      >
                        <AddIcon/>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-3 gap-3">
                  {offers.map((offer:any) => (
                    <div
                      key={offer.id}
                      className="rounded-5 bg-white shadow-shadow-light-tight/1 px-3 py-4"
                      // style={{
                      //   backgroundColor: darkMode ? "#01101A" : "#FFF5F0",
                      //   backgroundImage: `url(${jobCompanyLogo})`,
                      //   backgroundRepeat: "no-repeat",
                      //   backgroundPosition: "center",
                      //   backgroundSize: "cover",
                      //   backgroundBlendMode: darkMode ? "darken" : "lighten",
                      // }}
                    >
                      <div className="flex justify-between pb-1 border-b-1 border-netural-100 dark:border-netural-700">
                        <div className="flex items-center gap-2">
                          <Buildings2
                            className="text-secondary-400 dark:text-white"
                            size="22"
                          />
                          <span className="text-secondary-1000 dark:text-white font-semibold">
                            {offer.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-secondary-800 dark:text-white font-bold text-sm leading-normal">
                            {offer.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <Location
                              className="text-secondary-1000 dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                              {offer.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock
                              className="text-secondary-1000 dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                              {offer.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarCircle
                              className="text-secondary-1000 dark:text-white"
                              size="16"
                            />
                            <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                              {offer.salary}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Status
                              className="text-info"
                              size="20"
                              variant="Bold"
                            />
                            <span className="text-info-700 dark:text-white text-sm font-normal">
                              {offer.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <AppStarRating
                            rating={offer.rating}
                            starColor="#FDD836"
                          />
                          <div className="flex justify-end">
                            <img
                              alt=""
                              className="w-[84px] h-[84px] rounded-5"
                              src={jobCompanyLogo}
                            />
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
