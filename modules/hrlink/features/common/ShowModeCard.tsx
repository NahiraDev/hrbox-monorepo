import { Card } from '@heroui/react';

export const ShowModeCard = () => {
  return (
    <Card className="px-4 py-3 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
      <div className="flex items-center gap-1.5">
        {""}
        <span className="text-secondary-900 text-base font-light leading-normal">{""}</span>
      </div>
      <span className="text-secondary-900 text-base font-semibold leading-normal">{""}</span>
    </Card>
  );
};
