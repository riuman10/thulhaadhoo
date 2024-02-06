import * as React from "react"
import { SVGProps } from "react"
const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      stroke="#D6D6D6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M25 15 15 25m0-10 10 10"
    />
  </svg>
)
export default Close;
