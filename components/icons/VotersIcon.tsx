import * as React from "react"
import { SVGProps } from "react"
const VotersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.926 15.999V8.001c0-.715-.381-1.375-1-1.732L13 2.27a2.001 2.001 0 0 0-2 0L4.074 6.269a2 2 0 0 0-1 1.732v7.997c0 .715.381 1.375 1 1.732l6.926 4a2.001 2.001 0 0 0 2 0l6.926-3.999a2 2 0 0 0 1-1.732v0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6.17 12.63 3 1.74M3.342 7.001 12 12l8.658-4.999M12 22V12M7.67 9.5l8.93-5.15"
    />
  </svg>
)
export default VotersIcon
