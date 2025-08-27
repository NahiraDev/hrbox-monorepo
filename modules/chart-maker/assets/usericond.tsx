import React from "react";

const UserIconD: React.FC<React.SVGProps<SVGSVGElement>> = ({
                                                              width = 18,
                                                              height = 18,
                                                              fill = "#fff",
                                                              className,
                                                              ...props
                                                            }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.4425 16.5C15.4425 13.5975 12.555 11.25 9 11.25C5.445 11.25 2.5575 13.5975 2.5575 16.5"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UserIconD;
