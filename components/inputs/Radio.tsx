import React, { useEffect, useState} from "react";
import {RadioGroup} from "@headlessui/react";

interface item {
  id: string;
  name: string;
  from?: string;
  subtitle? : string
}

interface RadioProps {
  disabled?: boolean;
  extraClasses?: string;
  theme?: string;
  title?: string;
  onChange: (item: any) => any;
  items?: item[];
  defaultSelected: item;
}

const Radio: React.FC<RadioProps> = ({
  title,
  items = [],
  onChange,
  disabled = false,
  theme = "dafault",
  extraClasses = " grid-cols-2",
  defaultSelected,
}) => {
  const [selected, setSelected] = useState<item>(defaultSelected);

  useEffect(() => {
    selected && onChange(selected);
  }, [selected]);

  const themes: any = {
    default: ` ${
      disabled
        ? "bg-200 cursor-not-allowed"
        : "bg-primary-600 cursor-pointer hover:bg-primary-700"
    }`,
    delete: `${
      disabled
        ? "bg-200 cursor-not-allowed"
        : " bg-red-300 text-gray-100 hover:bg-red-700"
    }`,
    ghost: `${
      disabled
        ? "bg-200 cursor-not-allowed"
        : "bg-transparent cursor-pointer hover:bg-50"
    }`,
  };

  const textTheme: any = {
    default: `${disabled ? "text-white" : "text-400"}`,
    delete: `${disabled ? "text-white" : "text-100"}`,
    ghost: `${disabled ? "text-200" : "text-500 group-hover:text-25"}`,
  };

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
      {title ? (
        <p
          className={`text-700 text-sm pb-1.5 font-medium ${textTheme[theme]}`}
        >
          {title}
        </p>
      ) : null}
      <div className={`grid ${extraClasses} gap-4 rounded-lg overflow-hidden `}>
        {items.map((item, index) => (
          <RadioGroup.Option
            key={item.name + index}
            value={item}
            className={({active, checked}) =>
              ` ${active ? "bg-50" : ""}
                ${selected?.id == item.id ? "bg-10 ring-2 ring-red-600 border-transparent" : "bg-transparent b-100"}
                flex cursor-pointer p-4  focus:outline-none m-1 border border-[#292929] rounded-lg
              `
            }
          >
            {({active, checked}) => (
              <>
                <div className="flex w-full flex-col">
                  {/* <Icon
                    name={`input/${item.icon ? item.icon : "PkgType"}`}
                    stroke={selected?.id == item.id ? "#fcfcfc" : iconTheme[theme]}
                  /> */}
                  <div className="flex items-center mt-2">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium ${textTheme[theme]} ${
                          selected?.id == item.id ? "text-700" : ""
                        }`}
                      >
                        {item.name}
                      </RadioGroup.Label>
                      <p className="text-xs mt-3">{item.from || item.subtitle}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
export default Radio;
