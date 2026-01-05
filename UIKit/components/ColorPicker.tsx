import { Card } from "@heroui/react";

type ColorItem = {
  value: string;   
  label?: string;  
};

type ColorPickerProps = {
  colors: ColorItem[];
  value?: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({
  colors,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {colors.map((item) => {
        const isActive = value === item.value;

        return (
          <Card
            key={item.value}
            isPressable
            onPress={() => onChange(item.value)}
            className={`
              w-6 h-6 rounded-md cursor-pointer
              ${isActive ? "ring-2 scale-120 ring-primary ring-offset-2" : ""}
            `}
            style={{ backgroundColor: item.value }}
            title={item.label}
          />
        );
      })}
    </div>
  );
}
