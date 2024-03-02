import * as React from "react"
const Tick = ({
  background = "#D1FAE5",
  stroke = "#10B981"
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
  >
    <rect width={24} height={24} fill={background} rx={12} />
    <path
      fill={stroke}
      fillRule="evenodd"
      d="m17.096 7.39-7.16 6.91-1.9-2.03c-.35-.33-.9-.35-1.3-.07-.39.29-.5.8-.26 1.21l2.25 3.66c.22.34.6.55 1.03.55.41 0 .8-.21 1.02-.55.36-.47 7.23-8.66 7.23-8.66.9-.92-.19-1.73-.91-1.03v.01Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Tick;
