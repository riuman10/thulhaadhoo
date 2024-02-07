import { useState } from "react";

const Tabs = ({ buttons, active = "", className = "", buttonClassName = "" , onClick = () => {}} : any) => {
  const [hover, setHover] = useState("");

  return (
    <div className={`flex divide-x divide-[#292929] border border-[#292929] rounded-lg overflow-scroll ${className}`}>
      {buttons.map((button : any, index : number) => (
        <button
          id={`button-${index}`}
          disabled={button.disabled ?? false}
          onClick={() => onClick(button)}
          onMouseEnter={() => setHover(button.id)}
          onMouseLeave={() => setHover("")}
          className={`py-2 px-3 flex items-center w-full ${button.name ? "gap-x-2" : null} font-medium text-sm ${
            button.disabled ? "bg-gray-100 cursor-not-allowed" : ""
          } transition-colors ${buttonClassName} ${
            active ? (hover == button.id || active === button.id ? "text-gray-800 bg-yellow-400" : "text-gray-200") : "text-gray-700"
          }`}
        >
          <span className=" whitespace-nowrap">{button.name ? button.name : null}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;

