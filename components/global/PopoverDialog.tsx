import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = PopoverPrimitive.Content;

interface Props {
  align: "end" | "center" | "start";
  side?: "top" | "right" | "bottom" | "left";
  containerClass?: string;
  triggerId: string;
  content: any;
  trigger: any;
}

function PopoverDialog({
  align = "end",
  side = "top",
  triggerId = "string",
  content = <></>,
  trigger = <></>,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger
        id={triggerId}
        className="focus:outline-none"
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align={align}
        side={side}
        className="z-50 h-full w-full focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverDialog;
