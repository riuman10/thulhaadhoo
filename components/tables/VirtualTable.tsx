import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { motion } from "framer-motion";

const VirtualTable = ({ data, tableFields, onRowClick = () => {} }: any) => {
  const parentRef = useRef<any>();

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className="overflow-x-auto min-w-full">
      <table
        ref={parentRef}
        className="w-full divide-y divide-[#292929] bg-[#141414] overflow-hidden"
      >
        <thead className="">
          <tr className="bg-[#141414]">
            {tableFields.map((header: any, index: number) => (
              <th
                key={index}
                scope="col"
                className={`whitespace-nowrap px-6 py-3 text-left text-xs font-medium  tracking-wider border-b border-[#292929]`}
              >
                <p className={`text-xs font-semibold text-gray-100`}>
                  {header.name}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-[#141414] relative divide-y divide-[#292929]`}>
          {virtualItems.map((virtualItem, index) => {
            const listItem = data[index];
            return (
              <tr key={virtualItem.index} onClick={() => onRowClick(listItem)}>
                {tableFields &&
                  tableFields.map((header: any, index: number) => (
                    <motion.td
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      key={index}
                      className={`px-6 py-4 whitespace-nowrap text-sm truncate max-w-[230px] sm:max-w-none cursor-pointer ${
                        index === 0 ? "w-[50px] text-gray-100" : "text-gray-100"
                      }`}
                    >
                      {header.render
                        ? header.render(listItem)
                        : listItem[header.id]}
                    </motion.td>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VirtualTable;
