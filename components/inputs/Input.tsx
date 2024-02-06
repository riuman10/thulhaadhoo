import React from "react";

type Props = {
  title?: string;
  disabled?: boolean;
  width?: string;
  placeholder: string;
  value: string;
  onChange: (item: any) => any;
};

function Input({
  title = "",
  disabled = false,
  width = "",
  placeholder = "placeholder",
  value = "",
  onChange,
}: Props) {
  return (
    <div className="relative w-full">
      <div className={`relative ${title && "h-[64px]"}`}>
        <div className="flex">
          {title ? (
            <p className={`text-700 text-sm pb-1.5 font-medium`}>{title}</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`relative ${width} group gap-2 flex overflow-hidden mt-px px-3 py-2 rounded-lg bg-[#424242] ${
            disabled ? "bg-[#292929]" : ""
          }`}
        >
          <input
            className={`focus:outline-none text-sm w-full text-white placeholder:text-[#A3A3A3] bg-[#424242] ${
              disabled ? "bg-[#292929]" : ""
            }`}
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            value={value ? value : ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Input;