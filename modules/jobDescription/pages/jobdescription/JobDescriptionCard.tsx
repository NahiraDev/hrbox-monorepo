import {
  ArchiveBook,
  Calendar,
  DocumentText,
  Edit,
  Trash,
} from "iconsax-reactjs";

const JobDescriptionCard = () => {
  return (
    <>
      <div className="w-[292px] px-4 py-3 flex flex-col gap-3 bg-white rounded-xl shadow-[0_1px_3px_0_rgba(8,14,28,0.3)]">
        <div className="w-full flex justify-between items-center border-b-2 border-neutral-100">
          <div className="flex items-center gap-2">
            <span>
              <ArchiveBook size={20} />
            </span>
            <p className="font-semibold text-[16PX]">DNN Supervisor</p>
          </div>
          <div className="flex gap-1 p-1">
            <span>
              <Edit size={17} />
            </span>
            <span>
              <Trash size={17} />
            </span>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="gap-1 flex">
            <span>
              <Calendar size={18} />
            </span>
            <p className="text-sm">Correction date:</p>
          </div>
          <div>
            <p className="text-sm">2024/09/11</p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex gap-1">
            <span>
              <DocumentText size={18} />
            </span>
            <p className="text-sm font-normal">Poition Code:</p>
          </div>
          <div>
            <p className="text-sm">123456</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionCard;
