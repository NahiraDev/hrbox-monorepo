import { Minus, Add } from "iconsax-react";
import { useState } from "react";
import { AppButton } from "shared/components/index";

export const Counter = () => {
  const [count, setCount] = useState(156);

  return (
    <div className="flex items-center justify-between border-2 border-sky-500 rounded-[6px] ">
      <AppButton
        props={{
          size: "md",
          color: "primary",
          variant: "light",
          isIconOnly: true,
          content: (
            <Minus
              className="text-black cursor-pointer"
              size={24}
              onClick={() => setCount(count - 1)}
            />
          ),
        }}
      />
      <span className="mx-4 text-xl font-medium">{count}</span>
      <AppButton
        props={{
          size: "md",
          color: "primary",
          variant: "light",
          isIconOnly: true,
          content: (
            <Add
              className="text-black cursor-pointer"
              size={24}
              onClick={() => setCount(count + 1)}
            />
          ),
        }}
      />
    </div>
  );
};
