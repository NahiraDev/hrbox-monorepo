import { HeartCircle } from "iconsax-reactjs";
import { AppTable } from "../../../../../UIKit/components";
import { BehaviorData } from "../../../app/mock";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/redux";
import FormBehavior from "../../../forms/FormBehavior";

const Behavior = () => {
    const isEditMode=useSelector((state:RootState)=>state.dnnSupervisorEdit.isEditMode)
  return (
    <>
      <div className="w-full flex flex-col pr-3">
        <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row pl-4 gap-1">
          <span>
            <HeartCircle size={26} />
          </span>
          <p className="text-xl font-semibold">Behavior</p>
        </div>
        {isEditMode && <FormBehavior/>}
        </div>
        <div className="p-4">
          <AppTable
            data={BehaviorData}
            hasPagination={false}
            variant="default"
            HeaderColor="!bg-[#900F2E]"
          />
        </div>
      </div>
    </>
  );
};

export default Behavior;
