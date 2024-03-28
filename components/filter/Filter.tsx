import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveDiagonal } from 'lucide-react';

const Filter = ({ children = <></> }: any) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 border px-2 py-[3px] rounded-lg">
        <MoveDiagonal size={15} stroke="#424242" />
        <p className="text-gray-700 text-sm leading-5 font-medium">Filters</p>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{
              opacity: 0,
              // height: 0,
            }}
            animate={{
              opacity: 1,
              // height: "auto",
            }}
            exit={{
              opacity: 0,
              // height: "0px",
            }}
            className="flex flex-wrap items-center gap-2"
          >
           {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
