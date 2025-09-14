import { OrganizationalLocation } from 'mock';
import { Avatar, Card } from '@heroui/react';
import { Location, MoreSquare, Trash } from 'iconsax-react';
import { Button } from '@heroui/button';
import { useState } from 'react';

import { AppPagination } from '../../../../core';

const OrganizationalLocations = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  return (
    <>
      {/*<SubHeader />*/}
      <div className="flex flex-col justify-between w-full h-full p-4">
        <div className="grid grid-cols-5 gap-4 w-full h-full">
          {OrganizationalLocation.map((detail, index) => (
            <Card
              key={index}
              className="w-full max-h-[347px] bg-white shadow-[0_1px_2px_1px_#080E1C4D] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-[#D6F2FF] hover:border border-primary-400 "
            >
              <div className="w-58 z-1000 flex absolute top-1 right-2 justify-end gap-2 ">
                {activeButton === index && (
                  <Button key={index} className="w-27 mt-9 mr-[-25px] bg-white rounded-lg">
                    <Trash color="black" size="20" />
                    Delete
                  </Button>
                )}
                <MoreSquare
                  color="white"
                  size="42"
                  variant="Bold"
                  onClick={() => {
                    setActiveButton(index);
                  }}
                />
              </div>
              <Avatar className="w-full h-550" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <div className="w-full">
                <span className="font-bold text-left">{detail.title}</span>
              </div>

              <div className="bg-[#EEF9FF] w-full h-full rounded-lg border border-sky-100 p-1 flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Location size="15" />
                  <span className="text-xs">Address</span>
                </div>
                <p className="text-xs font-bold">{detail.Address}</p>
              </div>

              <div className="bg-[#EEF9FF] w-full h-full rounded-lg border border-sky-100 p-1 flex items-center gap-2 overflow-hidden">
                <div className="flex items-center gap-1">
                  <Location size="15" />
                  <span className="text-xs">Email</span>
                </div>
                <p className="text-xs font-bold">{detail.email}</p>
              </div>

              <div className="bg-[#EEF9FF] w-full h-full rounded-lg border border-sky-100 p-1 flex items-center gap-2 overflow-hidden">
                <div className="flex items-center gap-1">
                  <Location size="15" />
                  <span className="text-xs">Website</span>
                </div>
                <a className="text-xs font-bold" href="https://example.com">
                  {detail.webLink}
                </a>
              </div>

              <div className="bg-[#EEF9FF] w-full h-full rounded-lg border border-sky-100 flex items-center gap-2 overflow-hidden p-1">
                <div className="flex items-center gap-1">
                  <Location size="15" />
                  <span className="text-xs">Is it visible?</span>
                </div>
                <p className="text-xs font-bold">{detail.visible}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="w-full flex items-end justify-end ">
          <AppPagination
            dotsJump={10}
            initialPage={1}
            showControls={true}
            size="sm"
            total={10}
            onChange={() => console.log('page changed')}
          />
        </div>
      </div>
    </>
  );
};

export default OrganizationalLocations;
