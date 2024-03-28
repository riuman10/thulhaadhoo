import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const TooltipProvider = TooltipPrimitive.Provider
 
// const Tooltip = TooltipPrimitive.Root
 
const TooltipTrigger = TooltipPrimitive.Trigger

const Tooltip = ({ content, side = "top", children } : any) => {

  return (
    <TooltipProvider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className="TooltipContent bg-800 z-[1000000] rounded-[10px] p-2 shadow-lg"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
};

export default Tooltip;
