const OrganizationDepartmentsSubHeader = (props: any) => {
  return (
    <div>
      <div className="flex items-center gap-2 rounded-lg bg-primary-400 shadow-theme-sm px-3 py-1.5 w-fit">
        {props.icon && <props.icon color="#fff" />}
        <span className="text-white !text-xl ">{props.name}</span>
      </div>
    </div>
  );
};

export default OrganizationDepartmentsSubHeader;
