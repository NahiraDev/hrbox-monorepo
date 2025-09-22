import { AppButton } from 'core/components';
import { Edit } from 'iconsax-react';
import { Avatar, Card } from '@heroui/react';

import { InstagramIcon, LinkedinIcon, TelegramIcon } from '@module/hrlink/icons';
import AvatarUser from '../../../../public/img/whats-app-logo.png';
import { useAppSelector } from '@core/redux';

export const GeneralInformation = () => {
  const profileData: any = useAppSelector((state) => state.profile);

  return (
    <Card className="relative shadow-shadow-light-tight/1 rounded-xl p-4 h-3/5 bg-white">
      {/*<img*/}
      {/*  alt=""*/}
      {/*  className="w-full h-full absolute left-0 top-0 opacity-[0.2] blur rounded-[14px] object-cover"*/}
      {/*  src={AvatarUser}*/}
      {/*/>*/}
      {/*<div className="w-full h-full absolute top-0 left-0 bg-secondary-400 dark:bg-surface-200 opacity-[0.2] rounded-[14px]" />*/}
      {/*<div className="absolute top-0 right-0 w-full h-full rounded-md bg-[position:-59px_0px] blur-sm opacity-50" />*/}
      <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
        <AppButton
          props={{
            color: 'white',
            size: 'xs',
            content: <Edit className="text-secondary-1000" size="14" />,
          }}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div />
          <div>
            <Avatar className="w-[70px] h-[70px]" src={AvatarUser} />
          </div>
          <div className="flex flex-col gap-1">
            <AppButton
              props={{
                color: 'default',
                size: 'xs',
                radius: 'sm',
                isIconOnly: true,
                content: <TelegramIcon />,
              }}
            />
            <AppButton
              props={{
                color: 'default',
                size: 'xs',
                radius: 'sm',
                isIconOnly: true,
                content: <LinkedinIcon />,
              }}
            />
            <AppButton
              props={{
                color: 'default',
                size: 'xs',
                radius: 'sm',
                isIconOnly: true,
                content: <InstagramIcon />,
              }}
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
