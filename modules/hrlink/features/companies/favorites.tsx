import { Button } from "@heroui/button";
import {
  ArrowRight,
  Buildings,
  DeviceMessage,
  Heart,
  Location,
  SearchNormal1,
  Setting4,
  Star1,
} from "iconsax-react";
import { Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { AppPagination } from "@/components/AppPagination.tsx";
import { CompanyLayout } from "@/pages/Companies/Layout.tsx";
import companyLogo from "@/assets/img/company-logo.png";
import jobCompanyLogo from "@/assets/img/job-company-logo.png";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { CloseIcon } from "@/icons/closeIcon.tsx";

const companies = [
  {
    id: 1,
    logo: companyLogo,
    name: "Nahira",
    title: "Nahira Digital Accelerator",
    location: "Karaj",
    score: 4.8,
  },
  {
    id: 2,
    logo: companyLogo,
    name: "Pardazesh Gostar",
    title: "Cloud Services Provider",
    location: "Tehran",
    score: 4.5,
  },
  {
    id: 3,
    logo: companyLogo,
    name: "Simorgh AI",
    title: "AI & ML Research Lab",
    location: "Shiraz",
    score: 4.9,
  },
  {
    id: 4,
    logo: companyLogo,
    name: "Techava",
    title: "Tech Innovation Hub",
    location: "Tabriz",
    score: 4.3,
  },
  {
    id: 5,
    logo: companyLogo,
    name: "Vira Robotics",
    title: "Robotics & Automation",
    location: "Isfahan",
    score: 4.6,
  },
  {
    id: 6,
    logo: companyLogo,
    name: "DigiPoint",
    title: "E-commerce Platform",
    location: "Mashhad",
    score: 4.7,
  },
  {
    id: 7,
    logo: companyLogo,
    name: "ZarinCloud",
    title: "Fintech Cloud Solutions",
    location: "Qom",
    score: 4.4,
  },
  {
    id: 8,
    logo: companyLogo,
    name: "BazrasTech",
    title: "IoT Devices Developer",
    location: "Ahvaz",
    score: 4.2,
  },
  {
    id: 9,
    logo: companyLogo,
    name: "Rahkaran",
    title: "Enterprise Software",
    location: "Sanandaj",
    score: 4.5,
  },
  {
    id: 10,
    logo: companyLogo,
    name: "ZarinCloud",
    title: "Fintech Cloud Solutions",
    location: "Qom",
    score: 4.4,
  },
  {
    id: 11,
    logo: companyLogo,
    name: "BazrasTech",
    title: "IoT Devices Developer",
    location: "Ahvaz",
    score: 4.2,
  },
  {
    id: 12,
    logo: companyLogo,
    name: "Rahkaran",
    title: "Enterprise Software",
    location: "Sanandaj",
    score: 4.5,
  },
];

export default function FavoritesCompanies() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };
  const handleOpenCompany = (name: string) => {
    navigate("/company/general-info/" + name);
  };

  const handleNavigateToAllCompanies = () => {
    navigate("/company/all-companies");
  };

  const handleNavigateToRequested = () => {
    navigate("/company/requested");
  };

  return (
    <CompanyLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="flex flex-col justify-between gap-3.5 h-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    className="flex items-center gap-2 !rounded-4  !bg-transparent !px-3 !py-1.5 w-fit"
                    onPress={handleNavigateToAllCompanies}
                  >
                    <Buildings
                      className="text-secondary-400 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      All Companies
                    </span>
                  </Button>
                  <Button
                    className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent"
                    onPress={handleNavigateToRequested}
                  >
                    <DeviceMessage
                      className="text-secondary-400 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
                      Requested
                    </span>
                  </Button>
                  <Button className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1">
                    <Heart className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">
                      Followed
                    </span>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    {!isSearchOpen && (
                      <Button
                        isIconOnly
                        className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2"
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
                                "!bg-white dark:!bg-secondary-1000 p-1.5 !rounded-4",
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
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Button
                    className="!rounded-4 shadow-shadow-light-tight/1 bg-white dark:bg-secondary-1000 min-w-fit p-2 flex gap-2"
                    color="default"
                    variant="light"
                  >
                    <Setting4 className="text-secondary-1000 dark:text-white" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col h-full justify-between">
                <div className="grid grid-cols-4 gap-3">
                  {companies.map((company) => {
                    const isLiked = likedItems.includes(company.id);

                    return (
                      <button
                        key={company.id}
                        className="dark:bg-info-1000 rounded-5 shadow-shadow-light-tight/1 px-5 py-4 flex flex-col gap-2 cursor-pointer"
                        style={{
                          backgroundColor: darkMode ? "#01101A" : "#FFF5F0",
                          backgroundImage: `url(${jobCompanyLogo})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundBlendMode: darkMode ? "darken" : "lighten",
                        }}
                        onClick={() => handleOpenCompany(company.name)}
                      >
                        <div className="flex justify-between border-b-1 border-netural-100 pb-1">
                          <div className="flex items-center gap-2">
                            <img
                              alt={`${company.name} Logo`}
                              className="rounded-2 w-[22px] h-[22px]"
                              src={company.logo}
                            />
                            <span className="text-base font-semibold text-secondary-1000 dark:text-white leading-normal">
                              {company.name}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              isIconOnly
                              className="!rounded-2 !min-w-fit !w-5 !h-5 p-1 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"
                              onPress={() => toggleLike(company.id)}
                            >
                              <Heart
                                className={`transition-colors ${
                                  isLiked
                                    ? "text-secondary-1000 dark:text-white"
                                    : "text-tertiar-400"
                                }`}
                                size={14}
                                variant={isLiked ? "Outline" : "Bold"}
                              />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col gap-4">
                            <span className="font-bold text-sm text-secondary-800 dark:text-white text-start">
                              {company.title}
                            </span>
                            <div className="flex gap-4">
                              <Location
                                className="text-secondary-1000 dark:text-white"
                                size="20"
                              />
                              <span className="text-secondary-800 dark:text-white font-normal text-sm">
                                {company.location}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <Star1 className="text-warning-400" size="20" />
                              <span className="text-secondary-800 dark:text-white font-normal text-sm">
                                {company.score} Score
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              className="bg-white dark:bg-info-1000 !rounded-2 shadow-shadow-light-tight/1 px-1 py-0.5 h-5"
                              onPress={() => handleOpenCompany(company.name)}
                            >
                              <span className="text-secondary-1000 dark:text-white text-xs font-normal">
                                See More
                              </span>
                              <ArrowRight size="12" />
                            </Button>
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
