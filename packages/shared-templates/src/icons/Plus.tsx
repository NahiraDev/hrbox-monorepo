import { useDarkMode } from "../context";

export function Plus({
  color = "#04070E",
  size = 24,
}: {
  color?: string;
  size?: number | string;
  text?: string;
}) {
  const { darkMode } = useDarkMode();

  darkMode ? (color = "#ffffff") : color;

  return (
    <svg
      fill="none"
      height={size}
      viewBox={`0 0 24 24`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4418_9825)">
        <path
          d="M6 12H18"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M12 18V6"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_4418_9825">
          <rect fill={color} height="24" width="24" />
        </clipPath>
      </defs>
    </svg>
  );
}
