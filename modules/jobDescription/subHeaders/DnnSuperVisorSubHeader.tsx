import {
  DocumentSketch,
  Edit,
  Logout,
  TaskSquare,
  UserOctagon,
} from "iconsax-reactjs";
import { AppButton, AppPageTitle } from "../../../UIKit/components";
import { useState } from "react";

const DnnSuperVisorSubHeader = (props:any) => {
  const [edit, setEdit] = useState<boolean | null>(false);
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <AppPageTitle
            title={props.title}
            icon={props.icon}
          />
          <AppButton
            content="Onboarding"
            startContent={<UserOctagon size={22} />}
            radius="sm"
            size="sm"
            className="bg-transparent"
          />
          <AppButton
            content="Offboarding"
            startContent={<Logout size={22} />}
            radius="sm"
            size="sm"
            className="bg-transparent"
          />
          <AppButton
            content="Documents"
            startContent={<TaskSquare size={22} />}
            radius="sm"
            size="sm"
            className="bg-transparent"
          />
        </div>
        <div className="flex flex-row items-center gap-2 ">
          {edit ?  (
            <>
              <AppButton content="Cancel" size="sm" color="white" variant="bordered" className="border-primary" onPress={()=>setEdit(false)} />
              <AppButton content="Save Changes" size="sm" color="primary" />
            </>
          ):(
            <AppButton
              content="Edit"
              startContent={<Edit size={22} />}
              size="sm"
              radius="lg"
              variant="bordered"
              className="border-primary"
              onPress={() => setEdit(true)}
            />
          ) }
        </div>
      </div>
    </>
  );
};

export default DnnSuperVisorSubHeader;
