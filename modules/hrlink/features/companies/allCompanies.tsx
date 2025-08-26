import { Input } from "@heroui/react";
import {
  ArrowRight,
  Buildings,
  DeviceMessage,
  DocumentForward,
  Heart,
  Location,
  SearchNormal1,
  Setting4,
  Star1,
} from "iconsax-react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CompanyLayout } from "@/pages/Companies/Layout.tsx";
import { AppPagination } from "@/components/AppPagination.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { CloseIcon } from "@/icons/closeIcon.tsx";
import { AppDispatch, RootState } from "@/redux/createStore.ts";
import { handleFetchCompanyListApi, handleSendRequestApi } from "@/services/Company/apis.ts";
import { BaseUrl } from "@/utils/endpoints.ts";

export default function AllCompanies() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const companyList = useSelector((state: RootState) => state.company.data);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleSendRequest = (id:string) =>{
    dispatch(handleSendRequestApi(id))
  }

  const handleOpenCompany = (id: string) => {
    navigate("/company/general-info/" + id);
  };

  const handleNavigateToRequested = () => {
    navigate("/company/requested");
  };

  const handleNavigateToFavorites = () => {
    navigate("/company/favorites");
  };

  useEffect(() => {
    dispatch(handleFetchCompanyListApi());
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
                    <Buildings className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">
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
                  <Button
                    className="flex items-center gap-2 !rounded-4 !px-3 !py-1.5 w-fit !bg-transparent"
                    onPress={handleNavigateToFavorites}
                  >
                    <Heart
                      className="text-secondary-400 dark:text-white"
                      size="22"
                    />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">
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
                  {companyList.map((company: any) => {
                    const isLiked = likedItems.includes(company.OrgId);

                    return (
                      <div
                        key={company.OrgId}
                        className="dark:bg-info-1000 rounded-5 shadow-shadow-light-tight/1 px-5 py-4 flex flex-col gap-2"
                        style={{
                          backgroundColor: darkMode ? "#01101A" : "#FFF5F0",
                          backgroundImage: `url(${company.GetLogoUrl})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundBlendMode: darkMode ? "darken" : "lighten",
                        }}
                      >
                        <div className="flex justify-between border-b-1 border-netural-100 dark:border-netuaral-700 pb-1">
                          <div className="flex items-center gap-2">
                            <img
                              alt={`${company.Name} Logo`}
                              className="rounded-2 w-[22px] h-[22px]"
                              src={BaseUrl + company.GetLogoUrl}
                            />
                            <button
                              onClick={() => handleOpenCompany(company.Name)}
                            >
                              <span className="text-base font-semibold text-secondary-1000 dark:text-white leading-normal">
                                {company.GetIndustryName}
                              </span>
                            </button>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              onPress={()=> handleSendRequest(company?.OrgId)}
                              className="px-1 py-0.5 flex items-center gap-1 !rounded-2 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1 !h-5">
                              <span className="text-secondary-1000 dark:text-white">
                                Easy Apply
                              </span>
                              <DocumentForward
                                className="text-secondary-1000 dark:text-white"
                                size="12"
                              />
                            </Button>
                            <Button
                              isIconOnly
                              className="!rounded-2 !min-w-fit !w-5 !h-5 p-1 bg-white dark:bg-info-1000 shadow-shadow-light-tight/1"
                              onPress={() => toggleLike(company.OrgId)}
                            >
                              <Heart
                                className={`transition-colors ${
                                  isLiked
                                    ? "text-tertiar-400"
                                    : "text-secondary-1000 dark:text-white"
                                }`}
                                size={14}
                                variant={isLiked ? "Bold" : "Outline"}
                              />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col gap-4">
                            <span className="font-bold text-sm text-secondary-800 dark:text-secondary-0">
                              {company.Name}
                            </span>
                            <div className="flex gap-4">
                              <Location
                                className="text-secondary-1000 dark:text-white"
                                size="20"
                              />
                              <span className="text-secondary-800 dark:text-secondary-0 font-normal text-sm">
                                {company.PlaceName}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <Star1 className="text-warning-400" size="20" />
                              <span className="text-secondary-800 dark:text-secondary-0 font-normal text-sm">
                                {company.Rate} Score
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              className="bg-white dark:bg-info-1000 !rounded-2 shadow-shadow-light-tight/1 px-1 py-0.5 h-5"
                              onPress={() => handleOpenCompany(company.OrgId)}
                            >
                              <span className="text-secondary-1000 dark:text-secondary-0 text-xs font-normal">
                                See More
                              </span>
                              <ArrowRight size="12" />
                            </Button>
                          </div>
                        </div>
                      </div>
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
