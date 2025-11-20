import { Edit } from "iconsax-reactjs";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  AppButton,
  AppDeleteModal,
  AppPagination,
} from "@hrbox/uikit/components";
import { useEffect } from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { CupStarIcon } from "@hrbox/uikit/icons/CupStarIcon";
import {useFetchAwardsQuery} from "@hrbox/modules/hrlink/apis";
import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";

const Awards = () => {
  const {data:fetchAwards} = useFetchAwardsQuery();


  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-3">
            {fetchAwards &&
                fetchAwards.map((achievement: any, index: number) => (
                <Card
                  key={index}
                  className="rounded-5 shdow-theme-sm p-4 bg-white flex flex-col gap-2.5"
                >
                  <CardHeader className="flex flex-col gap-1.5 border-b-1 border-neutral-100 pb-1.5">
                    <div className="flex justify-between">
                      <div className="flex gap-1.5">
                        <CupStarIcon color="#04070e" />
                        <span className="text-base font-semibold text-secondary-1000">
                          {achievement.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          props={{
                            isIconOnly: true,
                            color: "white",
                            size: "md",
                            radius: "sm",
                            content: (
                              <Edit className="text-secondary-1000" size="14" />
                            ),
                          }}
                        />
                        <AppButton
                          isIconOnly={true}
                          color="white"
                          size="md"
                          radius="sm"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-2">
                    <div className="">
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                              title:
                            </span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.Name}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                              Date:
                            </span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.GainYear +
                                "/" +
                                achievement.GainMonth}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                              Description:
                            </span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.Comment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
          <div className="flex justify-center">
            <AppPagination meta={{}} />
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

export default Awards;
