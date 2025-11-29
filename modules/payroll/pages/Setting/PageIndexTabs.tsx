import { useTranslation } from "react-i18next";
import {
  ArrowLeft2,
  Calculator,
  Candle2,
  Category,
  Money4,
  Setting2,
  Setting5,
  TagUser,
  TicketDiscount,
} from "iconsax-react";
import { Button } from "@heroui/react";

import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";

export default function PageIndexTabs({ props }: { props: any }) {
  const { dynamicElements } = props;
  const { t } = useTranslation();
  const isGeneralSettings = location.pathname.endsWith(
    routeUrls.generalSettings,
  );
  const isCostCenter = location.pathname.endsWith(routeUrls.costCenter);
  const isParameters = location.pathname.endsWith(routeUrls.parameters);
  const iscalculation = location.pathname.endsWith(routeUrls.calculation);
  const isTypes = location.pathname.endsWith(routeUrls.types);
  const isCategory = location.pathname.endsWith(routeUrls.category);
  const isTaxes = location.pathname.endsWith(routeUrls.taxes);
  const isInsurance = location.pathname.endsWith(routeUrls.insurance);
  const goBack = () => {
    history.back();
  };

  return (
    <div className="flex justify-between w-full mb-2">
      <div className="flex gap-2 items-center">
        <Button className="bg-unset w-fit min-w-0 p-0" onPress={goBack}>
          <ArrowLeft2 />
        </Button>
        <PageHeaderTab
          props={{
            icon: <Setting2 />,
            title: t("general"),
            isActive: isGeneralSettings,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.generalSettings,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Money4 />,
            title: t("costCenter"),
            isActive: isCostCenter,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.costCenter,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Setting5 />,
            title: t("parameters"),
            isActive: isParameters,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.parameters,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Calculator />,
            title: t("calculation"),
            isActive: iscalculation,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.calculation,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Candle2 />,
            title: t("types"),
            isActive: isTypes,
            path:
              routeUrls.home + "/" + routeUrls.setting + "/" + routeUrls.types,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <Category />,
            title: t("category"),
            isActive: isCategory,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.category,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <TicketDiscount />,
            title: t("taxes"),
            isActive: isTaxes,
            path:
              routeUrls.home + "/" + routeUrls.setting + "/" + routeUrls.taxes,
          }}
        />
        <PageHeaderTab
          props={{
            icon: <TagUser />,
            title: t("insurance"),
            isActive: isInsurance,
            path:
              routeUrls.home +
              "/" +
              routeUrls.setting +
              "/" +
              routeUrls.insurance,
          }}
        />
      </div>
      <div className="flex gap-2 items-center">{dynamicElements}</div>
    </div>
  );
}
