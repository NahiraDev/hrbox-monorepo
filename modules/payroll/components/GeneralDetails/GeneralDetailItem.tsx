import { useTranslation } from "react-i18next";

export default function GeneralDetailItem({ props }: { props: any }) {
  const { t } = useTranslation();
  const { generalAmount, detailAmounts } = props;

  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <div className="bg-white !font-bold shadow-shadow-light-tight/1 rounded-full flex justify-center items-center w-[40px] h-[40px] text-secondary-1000 text-base font-semibold dark:text-white dark:bg-info-1000">
          {generalAmount}
        </div>
      </div>
      <div>
        {
          <>
            {detailAmounts?.map((amount: any, index: number) => (
              <div key={index} className="text-xs dark:text-white">
                {t("amount")} {amount}
              </div>
            ))}
          </>
        }
      </div>
    </div>
  );
}
