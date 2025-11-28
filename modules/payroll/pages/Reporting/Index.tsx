import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader.tsx";
import { ReportsLayout } from "@/pages/Reporting/Layout.tsx";
import IndexPageTabs from "@/pages/Reporting/IndexPageTabs.tsx";
import NoData from "@/components/NoData.tsx";

export default function Index() {
  const { t } = useTranslation();

  return (
    <ReportsLayout
      props={{
        children: (
          <>
            <PageHeader
              props={{
                children: <IndexPageTabs />,
              }}
            />
            <div className="flex items-center justify-center w-full h-full bg-main-light dark:bg-[rgba(4,66,92,0.60)] dark:border-surface-200 rounded-5 border border-primary">
              <div>
                <NoData
                  props={{
                    message: t("pleaseSelectOneOfTheTabs"),
                  }}
                />
              </div>
            </div>
          </>
        ),
      }}
    />
  );
}
