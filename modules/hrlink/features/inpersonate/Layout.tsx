import { HRLinkLayout } from "@/layouts/HRLinkLayout.tsx";
import AppSideBar from "@/components/AppSideBar.tsx";

export const InpersonateLayout = ({ props }: { props: any }) => {
  const { children } = props;

  return (
    <HRLinkLayout
      props={{
        children: (
          <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
            <AppSideBar menu={[]} />
            {children}
          </div>
        ),
      }}
    />
  );
};
