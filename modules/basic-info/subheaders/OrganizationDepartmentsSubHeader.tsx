import { DocumentSketch } from "iconsax-reactjs";

const OrganizationDepartmentsSubHeader = (props: any) => {
    return (
      <div>
        <div className="flex items-center gap-2 rounded-md bg-primary shdow-theme-sm px-3 py-1.5 w-fit">
          {/*{props.icon && <props.icon color="#fff" />}*/}
          <DocumentSketch color="white" />
          <span className="text-white text-xl font-normal">Organization Departments</span>
        </div>
      </div>
    );
  };

  export default OrganizationDepartmentsSubHeader;