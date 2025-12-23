import { AppButton, AppPageTitle } from "@hrbox/UIKit/components";
import { Edit, Logout, TaskSquare, UserOctagon } from "iconsax-reactjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setEditMode } from "@hrbox/core/redux";

const DnnSuperVisorSubHeader = (props: any) => {
  const dispatch=useDispatch<AppDispatch>();
  const isEditMode = useSelector(
    (state: RootState) => state.dnnSupervisorEdit.isEditMode
  );
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <AppPageTitle title={props.title} icon={props.icon} />
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
          {isEditMode ? (
            <>
              <AppButton
                content="Cancel"
                size="sm"
                color="white"
                variant="bordered"
                className="border-primary"
                onPress={() => dispatch(setEditMode(false))}
              />
              <AppButton content="Save Changes" size="sm" color="primary" />
            </>
          ) : (
            <AppButton
              content="Edit"
              startContent={<Edit size={22} />}
              size="sm"
              radius="lg"
              variant="bordered"
              className="border-primary"
              onPress={() => dispatch(setEditMode(true))}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DnnSuperVisorSubHeader;
