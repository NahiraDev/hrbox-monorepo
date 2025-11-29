import { Edit, Trash } from "iconsax-reactjs";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { AppButton, AppPagination } from "@hrbox/uikit/components";
import { CupStarIcon } from "@hrbox/uikit/icons/CupStarIcon";
import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";

// MOCK DATA — Exactly matches your real API structure
const MOCK_RESPONSE = {
  data: {
    ViewList: [
      { Id: 13998, Title: "new record", Description: "test", Date: 1399, Place: "-" },
      { Id: 14006, Title: "تستی", Description: "توضیحات", Date: 1400, Place: "-" },
      { Id: 14019, Title: "ش", Description: "description", Date: 1400, Place: "-" },
      { Id: 14020, Title: "ش", Description: "description", Date: 1400, Place: "-نسیم شهر" },
      { Id: 14021, Title: "ش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14022, Title: "ش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14023, Title: "جدیدش", Description: "description", Date: 1400, Place: "-آذرشهر" },
      { Id: 14024, Title: "تست جدید", Description: "description", Date: 1400, Place: "ایران-آذرشهر" },
      { Id: 14025, Title: "ش", Description: "description", Date: 1400, Place: "-" },
      { Id: 14026, Title: "ش", Description: "description", Date: 1400, Place: "-" },
    ],
    LastPage: 2,
    Page: 0,
    PageSize: 10,
  },
  msg: null,
  IsSucces: true,
};

const Awards = () => {
  // Replace real query with mock data
  const response = MOCK_RESPONSE;
  const awards = response.data.ViewList;
  const pagination = {
    currentPage: response.data.Page + 1, // UI usually starts from page 1
    totalPages: response.data.LastPage,
  };

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {/* Main Content - Awards List */}
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-4">
            {awards.map((achievement) => (
              <Card
                key={achievement.Id}
                className="rounded-2xl shadow-theme-sm p-5 bg-white flex flex-col gap-3 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="border-b border-neutral-100 pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CupStarIcon color="#04070e" size={20} />
                      <h3 className="text-lg font-bold text-secondary-1000">
                        {achievement.Title}
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <AppButton
                        isIconOnly
                        color="white"
                        size="md"
                        radius="sm"
                        content={<Edit size="16" className="text-secondary-700" />}
                      />
                      <AppButton
                        isIconOnly
                        color="white"
                        size="md"
                        radius="sm"
                        content={<Trash size="16" className="text-red-600" />}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="text-sm space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-secondary-900">
                    <div>
                      <span className="font-light text-secondary-600">عنوان: </span>
                      <span className="font-medium">{achievement.Title}</span>
                    </div>
                    <div>
                      <span className="font-light text-secondary-600">سال: </span>
                      <span className="font-medium">{achievement.Date}</span>
                    </div>
                  </div>

                  {achievement.Place && achievement.Place !== "-" && (
                    <div>
                      <span className="font-light text-secondary-600">مکان: </span>
                      <span className="font-medium">
                        {achievement.Place.replace(/^[-–—]\s*/, "")}
                      </span>
                    </div>
                  )}

                  {achievement.Description && achievement.Description.trim() && achievement.Description !== "description" && (
                    <div>
                      <span className="font-light text-secondary-600">توضیحات: </span>
                      <p className="font-medium text-secondary-800 mt-1">
                        {achievement.Description}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <AppPagination
              meta={{
                page: pagination.currentPage,
                totalPages: pagination.totalPages,
                // onPageChange: (page) => console.log("Go to page", page),
              }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Awards;