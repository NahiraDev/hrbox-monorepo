import { Button } from "@heroui/react";
import {
  Airplane,
  ArrowLeft2,
  ArrowRight,
  Calendar,
  Call,
  Dislike,
  DollarCircle,
  Heart,
  LampCharge,
  Like1,
  Link2,
  Location,
  Profile,
  ReceiptItem,
  Share,
  TickCircle,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { JobsLayout } from "@/pages/Jobs/Layout.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import jobCompanyLogo from "@/assets/img/job-company-logo.png";
import { BuildingIcon } from "@/icons/building.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { TelegramIcon } from "@/icons/telegramIcon.tsx";
import { LinkedinIcon } from "@/icons/linkedinIcon.tsx";
import { InstagramIcon } from "@/icons/instagramIcon.tsx";
import { WhatssAppIcon } from "@/icons/whatssAppIcon.tsx";
import { AddIcon } from "@/icons/addIcon.tsx";
import { AppDispatch } from "@/redux/createStore.ts";
import { useDispatch } from "react-redux";
import { handleFollowAndUnfollowCompanyApi } from "@/services/Jobs/apis.ts";

export default function JobOffers() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"like" | "dislike" | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const buttonStyle = (type: "like" | "dislike") => {
    const isActive = selected === type;

    return `
      !h-[22px] !w-[54px] !min-w-fit flex items-center gap-2 !px-2 !py-1 !rounded-2 shadow-shadow-light-tight/1
      ${isActive ? "bg-secondary-400" : "bg-white dark:bg-info-1000"}
    `;
  };

  const textStyle = (type: "like" | "dislike") => {
    const isActive = selected === type;

    return `text-base font-normal ${
      isActive ? "text-white" : "text-secondary-1000 dark:text-white "
    }`;
  };

  const iconStyle = (type: "like" | "dislike") => {
    const isActive = selected === type;

    return `${isActive ? "text-white" : "text-secondary-1000 dark:text-white"}`;
  };

  const handleOpenCompany = (name: string) => {
    navigate("/company/general-info/" + name);
  };

  const handleFollowAndUnfollowCompany = (id:string) =>{
    dispatch(handleFollowAndUnfollowCompanyApi(id));
  }

  return (
    <JobsLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)] flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Button
                  className="!min-w-fit !w-6 !h-6 !rounded-2 flex justify-center !px-0"
                  variant="light"
                  onPress={() => history.back()}
                >
                  <ArrowLeft2
                    className="text-[#292D32] dark:text-white"
                    size="24"
                  />
                </Button>
                <div className="flex items-center gap-2 rounded-4 px-3 py-1.5 w-fit">
                  <JobOffersIcon
                    props={{
                      color: darkMode ? "#fff" : "#1E3363",
                    }}
                  />
                  <span className="text-secondary-400 dark:text-white text-xl font-normal">
                    Accounting expert (Offered)
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  className="py-1.5 px-3 h-10 shadow-shadow-light-tight/1 !rounded-[10px] bg-white dark:bg-info-1000"
                  color="default"
                  startContent={  <Heart
                    className="text-[#292D32] dark:text-white"
                    size="22"
                  />}
                  variant="light"
                  onPress={() => handleFollowAndUnfollowCompany("3250")}
                >
                  Follow
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
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="rounded-[14px] shadow-shadow-light-tight/1 bg-white dark:bg-info-1000 px-4 py-3 flex flex-col gap-4">
                <div className="border-b-1 border-neutral-100 dark:border-neutral-700 pb-2 flex flex-col gap-6">
                  <div className="grid grid-cols-2 justify-between">
                    <div className="flex gap-6">
                      <div>
                        <button
                          className="!w-[80px] !h-[80px] rounded-5"
                          onClick={() => handleOpenCompany("Nahira")}
                        >
                          <img
                            alt=""
                            className="w-full h-full rounded-5"
                            src={jobCompanyLogo}
                          />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-secondary-400 dark:text-white font-semibold text-xl">
                          Sales Clerk
                        </span>
                        <div className="flex justify-between">
                          <span className="text-base font-semibold text-secondary-400 dark:text-white leading-normal">
                            Degital Solution
                          </span>
                          <div className="flex items-center gap-1">
                            <Location
                              className="text-secondary-400 dark:text-white"
                              size="16"
                            />
                            <span className="text-sm font-normal text-secondary-400 dark:text-white leading-normal">
                              Tehran
                            </span>
                          </div>
                        </div>
                        <span className="text-tertiar-400 text-sm font-normal">
                          7 Days ago
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        className={buttonStyle("dislike")}
                        variant="light"
                        onPress={() =>
                          setSelected(selected === "dislike" ? null : "dislike")
                        }
                      >
                        <span className={textStyle("dislike")}>Dislike</span>
                        <Dislike
                          className={iconStyle("dislike")}
                          size="12"
                          variant="Bold"
                        />
                      </Button>

                      <Button
                        className={buttonStyle("like")}
                        variant="light"
                        onPress={() =>
                          setSelected(selected === "like" ? null : "like")
                        }
                      >
                        <span className={textStyle("like")}>Like</span>
                        <Like1
                          className={iconStyle("like")}
                          size="12"
                          variant="Bold"
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-2 py-1 w-fit">
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.7207 7.79688C9.99435 7.79688 10.2023 7.84109 10.3408 7.93164C10.4784 8.02159 10.5488 8.15795 10.5488 8.34473C10.5488 8.54846 10.475 8.69823 10.3359 8.79785C10.196 8.898 9.98848 8.94823 9.7207 8.94824H9.18457V7.79688H9.7207Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.024535"
                      />
                      <path
                        d="M6.16895 6.3125C6.45329 6.31258 6.68637 6.43465 6.84863 6.6582C7.01119 6.88233 7.10345 7.209 7.10352 7.61621C7.10352 8.02641 7.01134 8.36178 6.84863 8.59375C6.68623 8.82526 6.45316 8.955 6.16895 8.95508C5.88471 8.95508 5.65171 8.82519 5.48926 8.59375C5.32653 8.36178 5.23438 8.02642 5.23438 7.61621C5.23444 7.20901 5.32572 6.88233 5.48828 6.6582C5.65061 6.43445 5.88439 6.3125 6.16895 6.3125Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.024535"
                      />
                      <path
                        d="M9.64844 6.31738C9.8856 6.31741 10.062 6.35176 10.1787 6.42676C10.2944 6.50118 10.3535 6.61656 10.3535 6.78125C10.3535 6.94922 10.2992 7.08009 10.1846 7.16895C10.0693 7.25808 9.89012 7.30664 9.63672 7.30664H9.18457V6.31738H9.64844Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.024535"
                      />
                      <path
                        d="M0.573242 3.06538V15.019C0.573242 15.561 1.01263 16.0004 1.55464 16.0004H10.3113V12.0489C10.3113 11.4057 10.8327 10.8843 11.476 10.8843H15.4275V3.06538C15.4275 2.52337 14.9881 2.08398 14.4461 2.08398H12.3156C12.0183 2.52975 11.5109 2.82404 10.936 2.82404C10.6605 2.82404 10.4006 2.75637 10.1717 2.63692L8.5745 3.69781C8.46344 3.77158 8.33138 3.63948 8.40514 3.52844L9.36453 2.084H1.55464C1.01261 2.08398 0.573242 2.52337 0.573242 3.06538ZM12.932 7.95846L12.4277 7.73995C12.0691 7.58865 11.688 7.30283 11.688 6.76491C11.688 6.18214 12.2036 5.73385 12.9208 5.73385C13.3467 5.73385 13.7614 5.91317 14.0471 6.19896L13.7165 6.61363C13.4811 6.41751 13.2346 6.29983 12.9208 6.29983C12.5734 6.29983 12.3437 6.46233 12.3437 6.7313C12.3437 7.0171 12.6238 7.12353 12.9264 7.24683L13.4251 7.45416C13.8566 7.63911 14.1648 7.91367 14.1648 8.44603C14.1648 9.04001 13.6717 9.53314 12.848 9.53314C12.3549 9.53314 11.8729 9.33701 11.5255 8.99516L11.9065 8.55248C12.1699 8.79904 12.523 8.96717 12.8591 8.96717C13.2738 8.96717 13.498 8.78226 13.498 8.49651C13.498 8.19383 13.2626 8.09857 12.932 7.95846ZM8.52193 5.80105H9.69313C10.4496 5.80105 11.0044 6.03081 11.0044 6.70323C11.0044 7.05066 10.8027 7.38689 10.3768 7.49895V7.52136C10.9035 7.61099 11.1949 7.89679 11.1949 8.38991C11.1949 9.12398 10.5953 9.4658 9.78839 9.4658H8.52196L8.52193 5.80105ZM6.16836 5.73382C7.12658 5.73382 7.78781 6.43426 7.78781 7.61663C7.78781 8.8046 7.12658 9.53309 6.16836 9.53309C5.21575 9.53309 4.55451 8.80462 4.55451 7.61663C4.55451 6.43426 5.21576 5.73382 6.16836 5.73382ZM2.09456 8.58045C2.24025 8.84943 2.44197 8.96712 2.66611 8.96712C3.00793 8.96712 3.18165 8.78219 3.18165 8.26107V5.80105H3.83166V8.31707C3.83166 8.98393 3.50666 9.53309 2.73896 9.53309C2.22902 9.53309 1.876 9.32013 1.64624 8.91108L2.09456 8.58045Z"
                        fill="white"
                      />
                      <path
                        d="M11.4761 11.5576C11.2051 11.5576 10.9854 11.7773 10.9854 12.0483V15.6832V15.9999L15.4277 11.5576H15.1765H11.4761Z"
                        fill="white"
                      />
                      <path
                        d="M10.2157 2.08356C10.3482 2.18785 10.5039 2.26392 10.6739 2.30297C10.7581 2.32233 10.8458 2.33291 10.936 2.33291C11.2079 2.33291 11.4579 2.23958 11.6563 2.08356C11.9279 1.86999 12.1024 1.53872 12.1024 1.16646C12.1024 0.522235 11.5802 0 10.936 0C10.2918 0 9.76953 0.522235 9.76953 1.16646C9.76953 1.25665 9.7801 1.3443 9.79948 1.42861C9.86005 1.69231 10.0099 1.92174 10.2157 2.08356Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-white text-base font-normal">
                      Job Descriptions
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 pb-4 border-b-1 border-neutral-100">
                  <div className="grid grid-cols-2">
                    <div className="flex gap-6">
                      <DollarCircle
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span className="text-[#353535] dark:text-white text-base font-light">
                        Salary
                      </span>
                    </div>
                    <div>
                      <span className="text-base text-[#353535] dark:text-white font-normal">
                        Monthly salary from 15 to 20 Million Toman
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-6">
                      <Calendar
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span className="text-[#353535] dark:text-white text-base font-light">
                        Working days and hours
                      </span>
                    </div>
                    <div>
                      <span className="text-base text-[#353535] dark:text-white font-normal">
                        March 15, 2024, 9:00 AM
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-6">
                      <LampCharge
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span className="text-[#353535] dark:text-white text-base font-light">
                        Benefits and facilities
                      </span>
                    </div>
                    <div>
                      <span className="text-base text-[#353535] dark:text-white font-normal">
                        loan ,Bonus ,Insurance
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-6">
                      <Airplane
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span className="text-[#353535] dark:text-white text-base font-light">
                        Business trips
                      </span>
                    </div>
                    <div>
                      <span className="text-base text-[#353535] dark:text-white font-normal">
                        Yes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 pb-4 border-b-1 border-neutral-100 dark:border-neutral-700">
                  <div className="flex gap-4">
                    <LampCharge
                      className="text-[#292D32] dark:text-white"
                      size="20"
                    />
                    <span>Proficient in accounting principles</span>
                  </div>
                  <div className="flex gap-4">
                    <LampCharge
                      className="text-[#292D32] dark:text-white"
                      size="20"
                    />
                    <span>
                      Familiar with insurance and tax ,Familiar with insurance
                      and tax laws
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <LampCharge
                      className="text-[#292D32] dark:text-white"
                      size="20"
                    />
                    <span>
                      Proficient in accounting Familiar with insurance and tax
                      laws.
                    </span>
                  </div>
                </div>
                <div className="pb-4 border-b-1 border-neutral-100">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-4">
                      <TickCircle
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span>
                        1 year of work experience in a similar job group
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <TickCircle
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span>Microsoft Excel - Intermediate</span>
                    </div>
                    <div className="flex gap-4">
                      <TickCircle
                        className="text-[#292D32] dark:text-white"
                        size="20"
                      />
                      <span>Preferably a resident of Mashhad</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-secondary-1000 shadow-shadow-light-tight/1 rounded-[14px] p-4">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
                  <span className="text-secondary-900 dark:text-white text-xl font-semibold leading-normal">
                    About the company
                  </span>
                  <Button
                    className="w-[26px] h-[26px] !min-w-fit !rounded-2 shadow-shadow-light-tight/1 dark:shadow-none !px-2 !py-1"
                    variant="light"
                    onPress={() => handleOpenCompany("Nahira")}
                  >
                    <span className="text-secondary-1000 dark:text-white text-base font-normal leading-normal">
                      See More
                    </span>
                    <ArrowRight
                      className="text-secondary-1000 dark:text-white"
                      size="18"
                    />
                  </Button>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <BuildingIcon />
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
                      <Link2
                        className="text-[#292D32] dark:text-white"
                        size="16"
                      />
                      <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                        Website
                      </span>
                    </div>
                    <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                      hrbox.me
                    </span>
                  </div>
                  <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <ReceiptItem
                        className="text-[#292D32] dark:text-white"
                        size="16"
                      />
                      <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                        Industrial
                      </span>
                    </div>
                    <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                      IT
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
                    <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                      Bachelor
                    </span>
                  </div>
                  <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Location
                        className="text-[#292D32] dark:text-white"
                        size="16"
                      />
                      <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                        Address
                      </span>
                    </div>
                    <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                      Female
                    </span>
                  </div>
                  <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                    <div className="flex items-center gap-1.5">
                      <Call
                        className="text-[#292D32] dark:text-white"
                        size="16"
                      />
                      <span className="text-secondary-900 dark:text-white text-base font-light leading-normal">
                        Phone Number
                      </span>
                    </div>
                    <span className="text-secondary-900 dark:text-white text-base font-semibold leading-normal">
                      None
                    </span>
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
