import * as React from "react"
import { SVGProps } from "react"


const PackageBox = (props: SVGProps<SVGSVGElement>) => (
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
    d="m19.449 3.604-.99-.498a1 1 0 0 0-.892-.002l-1.573.777-1.54-.774a1 1 0 0 0-.895-.001L12 3.882l-1.559-.776a1 1 0 0 0-.894.001l-1.541.774-1.573-.777a1 1 0 0 0-.892.002l-.99.498A1 1 0 0 0 4 4.498v15.005a1 1 0 0 0 .551.893l.99.498a1 1 0 0 0 .892.002l1.573-.777 1.54.774a1 1 0 0 0 .895.002L12 20.119l1.559.776a1 1 0 0 0 .894-.002l1.541-.774 1.573.777a1 1 0 0 0 .892-.003l.99-.497a1 1 0 0 0 .551-.893V4.498a1 1 0 0 0-.551-.894v0ZM16.002 8.5h-8M12 15.5H8.002M12 12H8M16 15.445h-1M16 12h-1"
  />
</svg>
)
export default PackageBox;
