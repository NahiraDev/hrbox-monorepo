import {
  AppHeader,
  AppDocs,
  AppSupportButton,
  AppSideBar,
} from '../components';

export const BaseLayout = ({ props }: { props: any }) => {
  const { children } = props;

  return (
    <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
      <AppHeader />
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-4 h-full min-h-fit">
          <AppSideBar menu={[]} />
          <div className="flex-1 min-h-fit h-full">{children}</div>
        </div>
        <div className="flex flex-col h-full min-h-fit gap-8 w-full">
          <AppDocs />
        </div>
        <div />
        <AppSupportButton />
      </div>
    </div>
  );
};
