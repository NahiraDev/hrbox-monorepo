import { useTranslation } from "react-i18next";
import {
  Additem,
  ArrowLeft2,
  BrifecaseTick,
  Calculator,
  DocumentFilter,
  Gift,
  MinusSquare,
  SecurityTime,
  TicketDiscount,
  UserTag,
} from "iconsax-react";
import { Button } from "@heroui/react";

import PageHeaderTab from "@/components/PageHeaderTab.tsx";
import { routeUrls } from "@/routes";
import { useDarkMode } from "@/context/DarkMode.tsx";

export default function PageIndexTabs({ props }: { props: any }) {
  const { dynamicElements } = props;
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const isComprehensive = location.pathname.endsWith(routeUrls.comprehensive);
  const isDeductions = location.pathname.endsWith(routeUrls.deductions);
  const isAdditions = location.pathname.endsWith(routeUrls.additions);
  const isLeaveCalculation = location.pathname.endsWith(
    routeUrls.leaveCalculation,
  );
  const isInsurance = location.pathname.endsWith(routeUrls.insurance);
  const isCalculateTheMission = location.pathname.endsWith(
    routeUrls.calculateTheMission,
  );
  const isTax = location.pathname.endsWith(routeUrls.tax);
  const isEid = location.pathname.endsWith(routeUrls.eid);
  const isYears = location.pathname.endsWith(routeUrls.years);

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
            icon: (
              <DocumentFilter
                color={isComprehensive ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("comprehensive"),
            isActive: isComprehensive,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.comprehensive,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <MinusSquare
                color={isDeductions ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("deductions"),
            isActive: isDeductions,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.deductions,
          }}
        />{" "}
        <PageHeaderTab
          props={{
            icon: (
              <Additem
                color={isAdditions ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("additions"),
            isActive: isAdditions,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.additions,
          }}
        />{" "}
        <PageHeaderTab
          props={{
            icon: (
              <Calculator
                color={
                  isLeaveCalculation ? "#fff" : darkMode ? "#fff" : "#04070E"
                }
              />
            ),
            title: t("leaveCalculation"),
            isActive: isLeaveCalculation,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.leaveCalculation,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <BrifecaseTick
                color={
                  isCalculateTheMission ? "#fff" : darkMode ? "#fff" : "#04070E"
                }
              />
            ),
            title: t("calculateTheMission"),
            isActive: isCalculateTheMission,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.calculateTheMission,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <UserTag
                color={isInsurance ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("insurance"),
            isActive: isInsurance,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.insurance,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <TicketDiscount
                color={isTax ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("tax"),
            isActive: isTax,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.tax,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <Gift color={isEid ? "#fff" : darkMode ? "#fff" : "#04070E"} />
            ),
            title: t("eid"),
            isActive: isEid,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.eid,
          }}
        />
        <PageHeaderTab
          props={{
            icon: (
              <SecurityTime
                color={isYears ? "#fff" : darkMode ? "#fff" : "#04070E"}
              />
            ),
            title: t("years"),
            isActive: isYears,
            path:
              routeUrls.home +
              "/" +
              routeUrls.reports +
              "/" +
              routeUrls.legalReports +
              "/" +
              routeUrls.years,
          }}
        />
      </div>
      <div className="flex gap-2 items-center">{dynamicElements}</div>
    </div>
  );
}
