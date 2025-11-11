import { memo } from 'react';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ArrowDown2, Briefcase, Trash, User } from 'iconsax-reactjs';
import { Handle, Position } from '@xyflow/react';

const OrgChartNode = () => {
  return (
    <div>
      <div className="px-4 py-[20px] flex rounded-lg">
        <div className="relative bg-white rounded-xl shadow-md  p-4 flex flex-col justify-between border-l-4 border-red-500">
          <button className="absolute top-2 right-2 text-gray-400 pt-3 hover:text-red-500">
            <Trash size={18} />
          </button>
          <div className="flex items-start flex-col gap-3">
            <img alt="" className="w-[26px] h-[26px] rounded-lg " src="https://placehold.co/28x28" />
            <div className="flex flex-row items-center gap-[62px]">
              <h3 className="text-sm font-semibold text-gray-800"> Zahra Pakniyat</h3>
              <Chip color="primary" variant="bordered">
                UIUX Designer
              </Chip>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 mt-4 text-sm  text-gray-600">
            <div className="flex items-center gap-1 border-2 border-blue-500 px-2 py-[2px] rounded-[6px]">
              <Briefcase size={12} />
              <span>0</span>
            </div>
            <div className="flex items-center gap-1 border-2 border-dashed rounded-[5px] px-1 py-[2px] border-primary-400">
              <span>0</span>
            </div>
            <div className="relative">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="!rounded-2 !px-1 !py-0.5 !min-w-fit !h-auto" color="primary" variant="solid">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span className="text-xs text-white">0</span>
                      <ArrowDown2 size={12} />
                    </div>
                  </Button>
                </DropdownTrigger>

                <DropdownMenu>
                  <DropdownItem key={1} className="hover:bg-blue-100">
                    1
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Right} type="source" />
    </div>
  );
};

OrgChartNode.displayName = 'OrgChartNode';

export default memo(OrgChartNode);
