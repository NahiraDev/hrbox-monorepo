import { AppButton } from "@hrbox/uikit/components";
import { Elipse2 } from "@hrbox/uikit/icons";
import { ArrowRight } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";
import { Notification } from "../../app/mock";

const DashboardNotification = () => {
  const { t } = useTranslation();

  
  return (
    <div className="bg-[#DCF0F9] dark:bg-[#04425C60] border border-primary rounded-xl p-4">
      <div className="pb-2.5 border-b border-[#05587A]">
        <p className="text-secondary-1000 font-sans text-2xl font-semibold">
          {t("Notifications")}
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        {Notification?.map((Notify) => {
          return (
            <div
              key={Notify.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="w-fit flex items-center gap-2">
                <Elipse2 color={Notify.color} />
                <p className="text-secondary-1000 text-xl">{Notify.title}</p>
              </div>
              <AppButton
                color="dark"
                size="sm"
                radius="xl"
                endContent={<ArrowRight size={13} />}
                className="border-1 border-primary"
                content={Notify.title2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNotification;
