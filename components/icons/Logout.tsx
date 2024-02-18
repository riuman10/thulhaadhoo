import * as React from "react";
import { SVGProps } from "react";
const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#D6D6D6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5m5.833 11.667L17.5 10m0 0-4.167-4.167M17.5 10h-10"
    />
  </svg>
);
export default LogoutIcon;
