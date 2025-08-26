import { OrganizationalLocation } from '@mock/index.ts';
import { Avatar } from '@heroui/react';
import { Location, MoreSquare, Trash } from 'iconsax-react';
import { Button } from '@heroui/button';
import { useState } from 'react';

import { AppPagination } from '../../../../core';
import { BaseLayout } from '../../../../core';

const OrganizationalLocations = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  return (
    <BaseLayout
      props={{
        children: (
          <>
            {/*<SubHeader />*/}
            <div className="w-340 h-145 content-start relative rounded-2xl border border-primary-400 bg-[#DCF0F966] flex flex-wrap gap-x-4 gap-y-2 items-center justify-center p-3">
              {OrganizationalLocation.map((detail, index) => (
                <div
                  key={index}
                  className="w-63 h-100 bg-white shadow-[0_1px_2px_1px_#080E1C4D] rounded-2xl p-2 flex flex-col items-center justify-center gap-2 hover:bg-[#D6F2FF] hover:border border-primary-400 "
                >
                  <div className="w-58 z-1000 flex absolute top-8  justify-end gap-2 ">
                    {activeButton === index && (
                      <Button
                        key={index}
                        className="w-27 mt-7 mr-[-30px] bg-white rounded-lg"
                      >
                        <Trash color="black" size="20" />
                        Delete
                      </Button>
                    )}
                    <MoreSquare
                      color="white"
                      size="32"
                      variant="Bold"
                      onClick={() => {
                        setActiveButton(index);
                      }}
                    />
                  </div>

                  <Avatar
                    className="w-55 h-30"
                    radius="sm"
                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  />
                  <div className="w-55">
                    <span className="font-bold text-left">{detail.title}</span>
                  </div>

                  <div className="bg-[#EEF9FF] w-55  rounded-lg border border-sky-100 p-1 flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <Location size="15" />
                      <span className="text-xs">Address</span>
                    </div>
                    <p className="text-xs font-bold">{detail.Address}</p>
                  </div>

                  <div className="bg-[#EEF9FF] w-55 h-8 rounded-lg border border-sky-100 p-1 flex items-center gap-2 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <Location size="15" />
                      <span className="text-xs">Email</span>
                    </div>
                    <p className="text-xs font-bold">{detail.email}</p>
                  </div>

                  <div className="bg-[#EEF9FF] w-55 h-8 rounded-lg border border-sky-100 p-1 flex items-center gap-2 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <Location size="15" />
                      <span className="text-xs">Website</span>
                    </div>
                    <a className="text-xs font-bold" href="https://example.com">
                      {detail.webLink}
                    </a>
                  </div>

                  <div className="bg-[#EEF9FF] w-55 h-8 rounded-lg border border-sky-100 flex items-center gap-2 overflow-hidden p-2">
                    <div className="flex items-center gap-1">
                      <Location size="15" />
                      <span className="text-xs">Is it visible?</span>
                    </div>
                    <p className="text-xs font-bold">{detail.visible}</p>
                  </div>
                </div>
              ))}
              <div className="w-350 flex justify-end mt-29">
                <AppPagination
                  props={{
                    size: 'sm',
                    total: 10,
                    initialPage: 1,
                    onChange: () => console.log(),
                    showControls: true,
                    dotsJump: 10,
                  }}
                />
              </div>
            </div>
          </>
        ),
      }}
    />
  );
};

export default OrganizationalLocations;
