import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";

import GeneralDetailItem from "@/components/GeneralDetails/GeneralDetailItem.tsx";

export default function GeneralDetails({ props }: { props: any }) {
  const { t } = useTranslation();

  return (
    <Card className="border-primary border-1 outline-none bg-[#dcf0f966] dark:bg-[rgba(4,66,92,0.60)] dark:border-[#0D4D6A] h-full w-full">
      <CardHeader className="flex gap-3 pb-1">
        <p className="text-secondary-1000 text-xl font-semibold dark:text-white">
          {t("general_details")}
        </p>
      </CardHeader>
      <Divider className="w-[95%] m-auto bg-primary-700 dark:bg-white" />
      <CardBody className="justify-center">
        <div className="flex justify-between">
          <GeneralDetailItem props={props} />
          <GeneralDetailItem props={props} />
        </div>
      </CardBody>
    </Card>
  );
}
