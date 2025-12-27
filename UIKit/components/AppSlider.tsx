import { Slider } from "@heroui/react";
import { useState } from "react";

interface AppsliderProps{
    size?:"sm"|"md"|"lg",
    defaultValue?:number,
    isDisabled:boolean,
}

const AppSlider = ({size="sm",defaultValue=0,isDisabled=false}:AppsliderProps) => {
    return ( <>
     <Slider
     isDisabled={isDisabled}
        className="max-w-full"
        classNames={{
        track:
          `border-l-[#1E3363]! dark:bg-[#FD1B51] ${isDisabled && "opacity-100!"}`,
        filler:
          `bg-[#1E3363]! ${isDisabled&& "bg-[#1E3363]! opacity-100!"}`,
        thumb:
          `bg-[#1E3363]! ${isDisabled&& "bg-[#1E3363]! opacity-100!"}`,
      }}
        defaultValue={defaultValue}
        maxValue={1}
        minValue={0}
        size={size}
        step={0.01}
      />
    </> );
}
 
export default AppSlider;