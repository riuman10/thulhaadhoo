import * as React from "react"
import { SVGProps } from "react"
const Tick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} fill="#064E3B" fillOpacity={0.2} rx={10} />
    <path
      stroke="#10B981"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14 7-5.5 5.5L6 10"
    />
  </svg>
)
export default Tick
