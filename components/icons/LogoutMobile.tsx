import * as React from "react"
import { SVGProps } from "react"
const LogoutMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none">
      <path
        fill="white"
        d="m2 12-.39-.312-.25.312.25.312zm9 .5a.5.5 0 0 0 0-1zM5.61 6.688l-4 5 .78.624 4-5zm-4 5.624 4 5 .78-.624-4-5zM2 12.5h9v-1H2z"
      />
      <path
        stroke="white"
        d="M10 8.132v-.743c0-1.619 0-2.428.474-2.987.474-.56 1.272-.693 2.868-.96l1.672-.278c3.243-.54 4.864-.81 5.925.088C22 4.151 22 5.795 22 9.082v5.835c0 3.288 0 4.932-1.06 5.83-1.062.9-2.683.63-5.926.089l-1.672-.279c-1.596-.266-2.394-.399-2.868-.958C10 19.039 10 18.229 10 16.61v-.545"
      />
    </g>
  </svg>
)
export default LogoutMobile;
