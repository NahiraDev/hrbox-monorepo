import { Button } from '@heroui/react';
import { ArrowRight } from 'iconsax-react';

import CoWorksImage1 from '../assets/img/Co-Works/1.png';
import CoWorksImage2 from '../assets/img/Co-Works/2.png';
import CoWorksImage3 from '../assets/img/Co-Works/3.png';
import CoWorksImage4 from '../assets/img/Co-Works/4.png';

export const AppCoWorks = () => {
  return (
    <div className="bg-[#dcf0f966] border-1 border-primary-400 p-2.5 rounded-5 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between border-b-1 border-primary-700 pb-1 items-center">
          <span className="text-secondary-900">Co-Workers</span>
          <Button
            className="!border-1 !border-primary-400 !px-2 !py-1 !rounded-2 bg-white gap-2 !h-fit"
            variant="light"
          >
            <span className="text-secondary-1000 text-xs font-normal">
              See More
            </span>
            <ArrowRight className="text-secondary-800" size="12" />
          </Button>
        </div>
        <div className="flex justify-between">
          <button>
            <div className="flex gap-2 items-center">
              <img
                alt=""
                className="w-[50px] h-[50px] rounded-5 object-cover"
                src={CoWorksImage1}
              />
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-normal text-[10px]">
                  Bahar Behbodi
                </span>
                <span className="text-secondary-1000 font-light text-[8px] text-start">
                  Ui Designer
                </span>
              </div>
            </div>
          </button>
          <button>
            <div className="flex gap-2 items-center">
              <img
                alt=""
                className="w-[50px] h-[50px] rounded-5 object-cover"
                src={CoWorksImage2}
              />
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-normal text-[10px]">
                  Bahar Behbodi
                </span>
                <span className="text-secondary-1000 font-light text-[8px] text-start">
                  Ui Designer
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="flex justify-between">
          <button>
            <div className="flex gap-2 items-center">
              <img
                alt=""
                className="w-[50px] h-[50px] rounded-5 object-cover"
                src={CoWorksImage3}
              />
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-normal text-[10px]">
                  Bahar Behbodi
                </span>
                <span className="text-secondary-1000 font-light text-[8px] text-start">
                  Ui Designer
                </span>
              </div>
            </div>
          </button>
          <button>
            <div className="flex gap-2 items-center">
              <img
                alt=""
                className="w-[50px] h-[50px] rounded-5 object-cover"
                src={CoWorksImage4}
              />
              <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-normal text-[10px]">
                  Bahar Behbodi
                </span>
                <span className="text-secondary-1000 font-light text-[8px] text-start">
                  Ui Designer
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
