import { guidlines } from '@module/basic-info/app/mock';
import { Card, Avatar } from '@heroui/react';
import { UserSearch } from 'iconsax-reactjs';
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import {useTranslation} from "react-i18next";

const Guidelines = () => {
    const {t} = useTranslation()
  return (
    <BasicInfoLayout
      content={
        <div className="p-2">
          <div className="flex items-center gap-1 text-xl font-semibold text-secondary-900 p-3">
            <UserSearch size="26" />
            <span>{t('Guidlines')}</span>
          </div>
          <div className="grid grid-cols-7 gap-3 overflow-y-scroll p-2 ">
            {guidlines.map((guidline, index) => (
              <Card key={index} className="flex justify-center items-center gap-3  p-4 border border-[#DCF0F9]">
                <Avatar className="w-30 h-30" radius="lg" src="" />
                <span className="text-xs font-semibold text-secondary-900">{guidline.job}</span>
              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Guidelines;
