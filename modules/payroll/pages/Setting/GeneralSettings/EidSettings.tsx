import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function EidSettings({ props }: { props: any }) {
  const { t } = useTranslation();
  const { children } = props;

  return (
    <div className="w-full h-full bg-main-light dark:bg-[rgba(4,66,92,0.60)] dark:border-surface-200 rounded-5 border border-primary">
      <div className="p-4">
        <div className="flex flex-col">
          <div className="text-secondary-900 dark:text-white font-[600] pb-1 pl-4">
            {t("eidSettings")}
          </div>
          <Divider className="bg-netural-100 dark:bg-netural-700" />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
