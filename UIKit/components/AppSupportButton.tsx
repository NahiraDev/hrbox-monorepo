import { AppButton } from '@hrbox/uikit/components';

import { useAppSelector } from '@hrbox/core/redux';
import {SupportIcon} from "~/UIKit/icons/SupportIcon";

export const AppSupportButton = () => {
  // @ts-ignore
  const lang = useAppSelector((state) => state.language.lang);

  return (
    <AppButton
      props={{
        className: `rounded-full bg-[linear-gradient(0deg,_#900F2E_0%,_#FD1B51_126.58%)] shadow-[0px_1.417px_4.253px_rgba(0,0,0,0.3)] absolute ${lang === 'fa' ? 'left-10' : 'right-10'} bottom-10 w-[72px] h-[72px] backdrop-opacity-5 flex justify-center items-center z-[1000]`,
        size: '',
        radius: 'none',
        onPress: () => {},
        content: (
          <div>
            <SupportIcon />
          </div>
        ),
      }}
    />
  );
};
