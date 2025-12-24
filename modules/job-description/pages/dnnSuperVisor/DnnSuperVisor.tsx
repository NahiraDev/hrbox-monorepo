import { AppButton } from "@hrbox/uikit/components";
import clsx from "clsx";
import { useState } from "react";
import { tabs } from "../../app/mock";

const DnnSuperVisor = () => {

  const [selected, setSelected] = useState<number | null>(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === selected)?.component;
  return (
    <>
      <div className="flex flex-row gap-3 w-full h-full">
        {/* buttons */}
        <div className="flex p-3 rounded-xl border border-primary h-full bg-[#DCF0F940] dark:bg-[#01101A]">
          <div className="flex flex-col gap-1.5">
            {tabs.map((btn) => (
              <AppButton
                key={btn.id}
                className={clsx(
                  "text-[#1E3363] px-3! py-4 text-[14px] flex justify-start",
                  selected === btn.id
                    ? "bg-[#D6F2FF] border-primary border dark:bg-[#04425C40]"
                    : "bg-white"
                )}
                content={btn.content}
                startContent={btn.icon}
                onPress={() => setSelected(btn.id)}
              />
            ))}
          </div>
        </div>
        {/* buttons */}
        {/* content */}
        <div className="w-full h-full border border-primary rounded-xl dark:bg-[#01101A]">
          {activeContent}
        </div>
        {/* content */}
      </div>
    </>
  );
};

export default DnnSuperVisor;
