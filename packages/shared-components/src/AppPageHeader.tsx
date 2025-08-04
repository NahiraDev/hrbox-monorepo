export const AppPageHeader = ({ props }: { props: any }) => {
  const { children } = props;

  return <div className="h-[40px] w-full mb-3">{children}</div>;
}
