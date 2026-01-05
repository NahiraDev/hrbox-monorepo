import { AppPagination } from "@hrbox/uikit/components";
import { ProfileEmployee } from "../../app/mock";
import { useState } from "react";
import { Verify } from "iconsax-reactjs";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import CostCenterModal from "../../modals/CostCenterModal";
import { useModal } from "@hrbox/core/hooks";
const EmployeeProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 27; 
  const totalItems = ProfileEmployee.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = ProfileEmployee.slice(startIndex, endIndex);
  const meta = {
    page: currentPage,
    totalPages,
    pageSize,
    total: totalItems,
  };
  const modal = useModal();
  const clickHandler = (profile: any) => {
  modal.open(
    ModalType.VIEW,
    "CostCenterModal",
    <CostCenterModal profile={profile} />,
    {
      isForm: false,
      cancelLabel: "Close",
    },
    ModalSize["3XL"]
  );
};


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full   flex flex-col px-3">
      <div
        className="
          w-full
          grid
          grid-cols-[repeat(auto-fill,minmax(155px,1fr))]
          gap-3
          py-2
        "
      >
        {paginatedData?.map((profile) => (
          <section
          onClick={()=>clickHandler(profile)}
            key={profile.id}
            className="
              bg-white
              h-45
              cursor-pointer
              relative
              py-3
              flex
              flex-col
              items-center
              gap-2
              shadow-sm
              rounded-lg
            "
          >
            <img
              className="w-[70%] h-[70%] object-cover rounded-2xl"
              src={profile.image}
              alt={profile.Name}
            />
            {profile.info? (<span className="absolute  top-3 right-3"><profile.icon className="" variant="Bold" color="#0B76B7"/></span>):(<span className="absolute top-3 right-3"><profile.icon variant="Bold" color="#CCCCCC"/></span>)}
            <span className="text-xs text-secondary-1000">{profile.Name}</span>
            <span className="px-2 text-xs rounded-lg text-primary bg-[#DCF0F960]">
              {profile.category}
            </span>
          </section>
        ))}
      </div>
      <div className="w-full  absolute right-3 bottom-0 justify-end flex ">
        <AppPagination  meta={meta} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
