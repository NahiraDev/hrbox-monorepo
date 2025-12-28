import { Book } from "iconsax-reactjs";
import { AppTable } from "../../../../../UIKit/components";
import { BehaviorData } from "../../../app/mock";
import FormKnowledge from "../../../forms/FormKnowledge";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/redux";

const Knowledge = () => {
    const isEditMode=useSelector((state:RootState)=>state.dnnSupervisorEdit.isEditMode)
  return (
    <>
      <>
        <div className="w-full flex flex-col pr-3">
            <div className="flex flex-row items-center justify-between" >
          <div className="flex flex-row items-center pl-4 gap-1">
              <span>
                <Book size={26} />
              </span>
              <p className="text-xl font-semibold">Behavior</p>
            </div>
            {isEditMode &&<FormKnowledge/>}
          </div>

          <div className="p-4">
            <AppTable
              data={BehaviorData}
              hasPagination={false}
              variant="default"
              HeaderColor="!bg-green-800"
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Knowledge;
