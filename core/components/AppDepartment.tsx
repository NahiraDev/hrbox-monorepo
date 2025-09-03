import { useState } from "react";
import { ArrowDown2,  Setting4 } from "iconsax-react";

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "IT Department" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
];

export default function DepartmentSelect() {
  const [selected, setSelected] = useState<Option | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center  gap-2 border-2  border-sky-500 rounded-lg px-3 py-1.5 bg-white shadow-sm text-neutral-250 hover:border-sky-500 transition"
      >
        <div className="flex items-center gap-2">
          <Setting4 className="w-5 h-5 text-black dark:text-white" />
          <span>{selected ? selected.label : "Department/Unit"}</span>
        </div>
        <ArrowDown2
          className={`w-5 h-5 dark:text-white transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
