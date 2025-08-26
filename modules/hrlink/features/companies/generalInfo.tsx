import { Link } from "@heroui/react";
import {
  Building,
  CardAdd,
  CardTick,
  Heart,
  HomeHashtag,
  LampCharge,
  Link2,
  Medal,
  MedalStar,
  MoneyChange,
  People,
  Profile,
  Share,
  TagUser,
} from "iconsax-react";
import { Button } from "@heroui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { CompanyLayout } from "@/pages/Companies/Layout.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import AppStarRating from "@/components/AppStarRate.tsx";
import OurMissions from "@/assets/img/our-misssions.png";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { TelegramIcon } from "@/icons/telegramIcon.tsx";
import { LinkedinIcon } from "@/icons/linkedinIcon.tsx";
import { InstagramIcon } from "@/icons/instagramIcon.tsx";
import { WhatssAppIcon } from "@/icons/whatssAppIcon.tsx";
import { AddIcon } from "@/icons/addIcon.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/createStore.ts";
import { handleGetDetailCompanyApi } from "@/services/Company/apis.ts";
import { BaseUrl } from "@/utils/endpoints.ts";

export default function CompanyGeneralInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const companyDetail:any = useSelector((state: RootState) => state.company.detail);
  const location = useLocation();
  const segments = location.pathname.split('/');
  const id = segments[segments.length - 1];
  const currentUrl = encodeURIComponent(window.location.href);

  const shareTo = (platform: string) => {
    const text = encodeURIComponent("بیا این صفحه رو ببین!");

    let url = "";

    switch (platform) {
      case "telegram":
        url = `https://t.me/share/url?url=${currentUrl}&text=${text}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${text}%20${currentUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${text}`;
        break;
      case "instagram":
        alert("اشتراک‌گذاری مستقیم در اینستاگرام از وب ممکن نیست. لینک کپی شد.");
        navigator.clipboard.writeText(window.location.href);
        return;
      case "copy":
        navigator.clipboard.writeText(window.location.href);
        alert("لینک کپی شد!");
        return;
      default:
        return;
    }

    window.open(url, "_blank");
  };
  const handleNavigateToJobOffers = () => {
    navigate("/company/job-offers");
  };
  const handleNavigateToEvents = () => {
    navigate("/company/events");
  };

  useEffect(() => {
    dispatch(handleGetDetailCompanyApi(id))
  }, []);

  return (
    <CompanyLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2 !rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <HomeHashtag className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">
                      General Info’s
                    </span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent"
                    onPress={handleNavigateToJobOffers}
                  >
                    <JobOffersIcon
                      props={{
                        color: darkMode ? "#fff" : "#1E3363",
                      }}
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      Offers
                    </span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent"
                    onPress={handleNavigateToEvents}
                  >
                    <Medal
                      className="text-secondary-400 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      Events
                    </span>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button className="!rounded-4 !px-3 !py-1.5 w-fit !bg-white dark:!bg-info-1000 shadow-shadow-light-tight/1">
                    <span className="text-secondary-1000 dark:text-white text-xl font-normal">
                      Complete the job form
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
                    <Heart className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">
                      Favorites
                    </span>
                  </Button>
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
                              onClick={() => shareTo("telegram")}
                            >
                              <TelegramIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              onClick={() => shareTo("linkedin")}
                            >
                              <LinkedinIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              onClick={() => shareTo("instagram")}
                            >
                              <InstagramIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              onClick={() => shareTo("whatsapp")}
                            >
                              <WhatssAppIcon />
                            </Button>
                            <Button
                              className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
                              onClick={() => shareTo("copy")}
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
                <div className="grid grid-cols-2 gap-3 h-full">
                  <div className="bg-white dark:bg-info-1000 rounded-[14px] shadow-shadow-light-tight/1 px-6 py-4">
                    <div className="flex flex-col gap-[36px]">
                      <div className="flex gap-6">
                        <img
                          alt=""
                          className="w-40 h-40 rounded-7 "
                          src={BaseUrl + companyDetail.GetLogoUrl}
                        />
                        <div className="flex flex-col gap-3">
                          <span className="font-semibold text-xl text-secondary-400 dark:text-white leading-normal">
                            {companyDetail.Name}
                          </span>
                          <div className="flex gap-8">
                            <span className="text-secondary-400 dark:text-white font-semibold text-base">
                              Degital Solution
                            </span>
                            <span className="text-tertiar-400 font-normal text-base">
                              12 Followers
                            </span>
                          </div>
                          <AppStarRating rating={5} starColor="#FDD836" />
                          <Link className="flex gap-2.5" href="/">
                            <Link2 className="text-info" />
                            <span className="font-semibold text-base text-info">
                              Degital Solution
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-2 items-center">
                          <People
                            className="text-secondary-400 dark:text-white"
                            size="22"
                          />
                          <span className="text-xl font-normal text-secondary-400 dark:text-white">
                            About Us
                          </span>
                        </div>
                        <p className="text-secondary-900 dark:text-white font-normal text-base leading-normal">
                          The Eurostar Group was established in 1995 in Spain,
                          under the ownership and management of Mr. Ali Nakoonam
                          Sarouei. The company primarily focuses on building
                          mass housing and developing residential communities
                          using innovative industrial methods. They specialize
                          in a system known as modular aluminum panels with
                          in-situ concrete injection. Eurostar is the first
                          manufacturer of modular aluminum panels in Spain, with
                          all panels produced in their own factories. The
                          company employs skilled professionals throughout the
                          design and execution phases. A significant achievement
                          for Eurostar is the implementation of cutting-edge
                          technology in Iran, creating debris-free structures.
                          The company aims to expand its industrial and reliable
                          construction solutions in earthquake-prone countries,
                          promoting sustainable development and job creation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-info-1000 rounded-[14px] shadow-shadow-light-tight/1 px-6 py-4">
                    <div className="flex flex-col gap-6">
                      <div className="border-b-1 border-netural-100 dark:border-netural-700">
                        <div className="flex gap-7">
                          <img
                            alt="OurMissions"
                            className="w-[272px] h-[272px]"
                            src={OurMissions}
                          />
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <MedalStar size="22" />
                              <span className="text-secondary-400 dark:text-white text-xl">
                                Our Misions
                              </span>
                            </div>
                            <p className="text-base text-secondary-900 dark:text-white">
                              By promoting the use of small units and
                              collaborating with banks, applicants can acquire
                              housing without any initial investment, relying
                              solely on bank financing. If we can effectively
                              communicate the costs of maintenance and energy
                              savings to citizens, they will be encouraged to
                              settle for smaller units.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="text-secondary-900 font-semibold text-xl leading-normal">
                          Detailed Information
                        </span>
                        <div className="flex flex-col gap-3">
                          <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                            <div className="flex items-center gap-1.5">
                              <Building
                                className="text-[#292D32] dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                                Establishment
                              </span>
                            </div>
                            <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                              1400
                            </span>
                          </div>
                          <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                            <div className="flex items-center gap-1.5">
                              <Profile
                                className="text-[#292D32] dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                                No. Employees
                              </span>
                            </div>
                            <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                              120
                            </span>
                          </div>
                          <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                            <div className="flex items-center gap-1.5">
                              <LampCharge
                                className="text-[#292D32] dark:text-white"
                                size="16"
                              />
                              <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                                Advantages
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex items-center gap-1">
                                <TagUser size="16" />
                                <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                                  Insurance
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CardAdd size="16" />
                                <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                                  Loan
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MoneyChange size="16" />
                                <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                                  Gym facilities
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CardTick size="16" />
                                <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                                  Training programs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
}
