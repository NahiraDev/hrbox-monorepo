import React, { Fragment, Suspense } from "react";
import { BaseLayout } from "./BaseLayout";
import { AuthLayout } from "./AuthLayout";

const layouts: Record<string, React.ComponentType<any>> = {
  BaseLayout,
  AuthLayout,
  EmptyLayout: Fragment,
};

export function LayoutLoader({
   layout,
   subHeader: SubHeader,
   content: Content,
   }: {
  layout?: string;
  subHeader?: React.ComponentType<any>;
  content?: React.ComponentType<any>;
}) {
  const Layout = layout && layouts[layout] ? layouts[layout] : BaseLayout;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout
        content={Content ? <Content /> : null}
        subHeader={SubHeader ? <SubHeader /> : null}
      />
    </Suspense>
  );
}
