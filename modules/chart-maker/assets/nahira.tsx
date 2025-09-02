import React from "react";

const Nahira: React.FC<React.SVGProps<SVGSVGElement>> = ({
                                                           width = 24,
                                                           height = 24,
                                                           fill = "currentColor",
                                                           className,
                                                           ...props
                                                         }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill={fill} />
    <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
      N
    </text>
  </svg>
);

export default Nahira;
