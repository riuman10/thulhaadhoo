import React from "react";

function BothArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-move-diagonal"
      viewBox="0 0 24 24"
    >
      <path d="M13 5L19 5 19 11"></path>
      <path d="M11 19L5 19 5 13"></path>
      <path d="M19 5L5 19"></path>
    </svg>
  );
}

export default BothArrow;
