export const Pending = ({
  color = "#FD8F02",
  size = 12,
}: {
  color?: string;
  size?: string | number;
}) => {
  return (
    <svg
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.92737 3.88664C9.34737 3.71331 8.70737 3.59998 8.0007 3.59998C4.80737 3.59998 2.2207 6.18664 2.2207 9.37998C2.2207 12.58 4.80737 15.1666 8.0007 15.1666C11.194 15.1666 13.7807 12.58 13.7807 9.38664C13.7807 8.19998 13.4207 7.09331 12.8074 6.17331"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7528 4.04671L8.82617 1.83337"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7525 4.04663L8.50586 5.68663"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
