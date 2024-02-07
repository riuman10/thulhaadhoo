import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";

type Props = {
  items: any;
  onSelect: (x: any) => void;
  disabled?: boolean;
  extraClasses?: string;
  position?: string;
  loading?: boolean;
  placeholder?: string;
  defaultSelected?: any;
};

function DropDown({
  items = [],
  onSelect,
  disabled = false,
  extraClasses,
  position = "",
  loading = false,
  placeholder = "Select...",
  defaultSelected,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<any>();

  useEffect(() => {
    if (!defaultSelected || defaultSelected.id == selectedItem?.id) {
      return;
    }
    setSelectedItem(defaultSelected);
  }, [defaultSelected]);

  return (
    <div className="relative border border-[#292929] rounded-lg">
      <Combobox
        value={selectedItem}
        disabled={disabled}
        onChange={(item) => {
          setSelectedItem(item);
          onSelect(item);
        }}
      >
        <div className="relative">
          <div
            className={`relative w-full group overflow-hidden rounded-lg ${extraClasses} duration-300 ease-out transition-all`}
          >
            <Combobox.Button
              className={`w-full relative flex gap-2 items-center justify-between pl-[10px] pr-[17px] py-2 ${
                disabled ? "cursor-not-allowed" : ""
              } bg-[#424242]`}
            >
              <div className="flex gap-2.5 items-center">
                <p
                  className={`text-sm ${loading ? "opacity-80" : ""} ${
                    placeholder ? "text-white" : ""
                  } ${selectedItem ? "text-white font-medium capitalize" : ""}`}
                >
                  {selectedItem ? selectedItem.name : placeholder}
                </p>
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200 transform"
            enterFrom="transform opacity-0 -translate-y-[5px]"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-[5px]"
          >
            <Combobox.Options
              className={`absolute ${position} shadow-lg py-1 z-20 mt-1 px-1 w-full max-h-60 rounded-lg  overflow-y-scroll bg-[#141414]`}
            >
              {items &&
                items.map((item: any, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `cursor-pointer flex items-center gap-3 w-full rounded py-2 px-3 text-700 hover:bg-[#424242] ${
                        active ? "bg-100" : ""
                      }`
                    }
                    value={item}
                  >
                    {item.color ? (
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: item.color,
                        }}
                      ></div>
                    ) : (
                      <></>
                    )}
                    <p className="text-sm">{item.name}</p>
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default DropDown;
