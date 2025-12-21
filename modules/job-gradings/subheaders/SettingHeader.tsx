import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";

const SettingHeader = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <AppPageTitle title={t(props.title)} icon={props.icon} />
    </>
  );
};

export default SettingHeader;
