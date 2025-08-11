export const Check = ({
  color = "#22AD5C",
  size = 12,
}: {
  color?: string;
  size?: string | number;
}) => {
  return (
    <svg
      fill="none"
      height="11"
      viewBox="0 0 12 11"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.49997L5.28571 9.29217L11 1.70776"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.60772"
      />
    </svg>
  );
};
