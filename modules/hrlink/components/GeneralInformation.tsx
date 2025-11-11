import { AppButton } from '@hrbox/uikit/components/AppButton';
import { Edit } from 'iconsax-reactjs';
import { Avatar, Card } from '@heroui/react';
import { useAppSelector } from '@hrbox/core/redux';
import { InstagramIcon, LinkedinIcon, TelegramIcon } from "@hrbox-monorepo/UIKit/icons";

export const GeneralInformation = () => {
  const profileData: any = useAppSelector((state) => state.profile);

  return (
    <Card className="relative shadow-shadow-light-tight/1 rounded-xl p-4 h-3/5 bg-white">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
        <AppButton
          content={<Edit className="text-secondary-1000" size="14" />}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div />
          <div>
            <Avatar className="w-[70px] h-[70px]" src="" />
          </div>
          <div className="flex flex-col gap-1">
            <AppButton
              content={<TelegramIcon />}
              isIconOnly={true}
            />
            <AppButton
              content={ <LinkedinIcon />}
              isIconOnly={true}
            />
            <AppButton
              content={<InstagramIcon />}
              isIconOnly={true}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-secondary-900 dark:text-white font-semibold">
              {profileData?.profile?.name +
                ' ' +
                profileData?.profile?.lastName}
            </span>
            <span className="text-xs font-light text-secondary-900 dark:text-white">
              PO.Inc.Alabama Machinery & Supply.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-secondary-900 dark:text-white text-sm font-semibold leading-normal">
              About Me
            </span>
            <p className="text-xs font-light text-secondary-1000 dark:text-white text-justify leading-normal">
              {profileData?.profile?.biography}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
