import React, { useEffect } from "react";
import { useState } from "react";
import PopoverDialog from "../global/PopoverDialog";

type Props = {
  value: string;
  condition: string;
  filterItems : any;
  triggerId : string;
  onSelect : (x : any) => void;
  icon : any,
  defaultValue : any
};

function FilterTab({
  value = "",
  condition = "",
  filterItems = [],
  triggerId = "",
  defaultValue = false,
  onSelect = () => {},
  icon = <></>
}: Props) {
  const [selectedItem, setSelectedItem] = useState<any>(false);

  const handleSelect = (x : any) => {
    setSelectedItem(x)
    onSelect(x);
    let element : any = document.getElementById(`${triggerId}`);
    element.click();
  }

  useEffect(() => {
    let temp = filterItems.find((x : any) => x.id === defaultValue)
    setSelectedItem(temp)
  },[defaultValue])
  return (
    <div className="flex h-8 max-h-[32px] items-center">
      <div className="text-700 border-300 relative flex items-center rounded-l-lg border-y border-l border-r-0  bg-white px-[7px] py-[3px]  ">
        <div className="flex items-center gap-1.5">
          {icon}
          <p className="text-gray-800 text-sm font-medium leading-5">{value}</p>
        </div>
      </div>
      <div className="text-gray-700 border-300 relative flex items-center border-y border-l bg-white px-1.5 py-[3px]">
        <div className="flex items-center gap-1.5">
          <p className="text-gray-700 text-sm font-medium leading-5">{condition}</p>
        </div>
      </div>

      <PopoverDialog
        side="bottom"
        align="start"
        triggerId = {triggerId}
        trigger={
          <button
            type="button"
            className="text-700 border-300 relative flex items-center rounded-r-lg border-y border-l border-r bg-white px-[7px] py-[3px] "
          >
            <div id="radix_popover_dialog_share_button_id">
              <p className="text-gray-700 text-sm font-medium leading-5">{selectedItem ? selectedItem.name : "Select"}</p>
            </div>
          </button>
        }
        content={
          <div className="border-200 z-50 h-auto max-h-[170px] w-[268px] overflow-scroll rounded-[10px] border bg-white p-1 shadow-lg">
            {filterItems ? filterItems.map((x : any) => (
              <p className="hover:bg-gray-100 px-1 py-1 text-sm cursor-pointer rounded-lg" onClick={() => handleSelect(x)}>{x.name}</p>
            )) : ""}
          </div>
        }
      ></PopoverDialog>
    </div>
  );
}

export default FilterTab;
