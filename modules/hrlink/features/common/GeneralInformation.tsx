import { AppButton } from 'core/components';
import { Edit } from 'iconsax-react';
import { Avatar } from '@heroui/react';

import { InstagramIcon, LinkedinIcon, TelegramIcon } from '../../icons';
import WhatsAppIcon from '../../assets/img/whats-app-logo.png';
import AvatarUser from '../../assets/img/whats-app-logo.png';
import { useAppSelector } from '../../../../core';

export const GeneralInformation = () => {
  const profileData: any = useAppSelector((state) => state.profile);

  return (
    <div className="relative shadow-shadow-light-tight/1 rounded-[14px] p-4 h-3/5">
      <img
        alt=""
        className="w-full h-full absolute left-0 top-0 opacity-[0.2] blur rounded-[14px] object-cover"
        src={AvatarUser}
      />
      <div className="w-full h-full absolute top-0 left-0 bg-secondary-400 dark:bg-surface-200 opacity-[0.2] rounded-[14px]" />
      <div className="absolute top-0 right-0 w-full h-full rounded-4 bg-[position:-59px_0px] blur-sm opacity-50" />
      <div className="flex justify-between items-center border-b border-secondary-400  pb-2 mb-4">
        <AppButton
          props={{
            color: 'white',
            size: 'sm',
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
                color: 'white',
                size: 'xs',
                radius: 'xs',
                isIconOnly: true,
                content: <TelegramIcon />,
              }}
            />
            <AppButton
              props={{
                color: 'white',
                size: 'xs',
                radius: 'xs',
                isIconOnly: true,
                content: <LinkedinIcon />,
              }}
            />
            <AppButton
              props={{
                color: 'white',
                size: 'xs',
                radius: 'xs',
                isIconOnly: true,
                content: <InstagramIcon />,
              }}
            />
            <AppButton
              props={{
                color: 'white',
                size: 'xs',
                radius: 'xs',
                isIconOnly: true,
                content: <img className="w-2.5 h-2.5" src={WhatsAppIcon} />,
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
    </div>
  );
};
