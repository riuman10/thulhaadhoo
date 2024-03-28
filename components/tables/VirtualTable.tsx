import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { motion } from "framer-motion";

const VirtualTable = ({ data, tableFields, onRowClick = () => {} }: any) => {
  const parentRef = useRef<any>();

  const rowVirtualizer = useVirtualizer({
    count: data && data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className="overflow-x-auto min-w-full rounded-md border border-gray-200">
      <table
        ref={parentRef}
        className="w-full divide-y  bg-[#141414] overflow-hidden"
      >
        <thead className="">
          <tr className="bg-[#F7F7F7]">
            {tableFields.map((header: any, index: number) => (
              <th
                key={index}
                scope="col"
                className={`whitespace-nowrap px-6 py-3 text-left text-xs font-medium  tracking-wider`}
              >
                <p className={`text-xs font-semibold text-gray-500`}>
                  {header.name}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white relative divide-y divide-gray-200`}>
          {virtualItems && virtualItems.length > 0 ? (
            virtualItems.map((virtualItem, index) => {
              const listItem = data[index];
              return (
                <tr
                  key={virtualItem.index}
                  onClick={() => onRowClick(listItem)}
                  className="hover:bg-gray-100 transition-all duration-300 ease-out"
                >
                  {tableFields &&
                    tableFields.map((header: any, index: number) => (
                      <motion.td
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        key={index}
                        className={`px-6 py-4 whitespace-nowrap text-sm max-w-[200px] truncate cursor-pointer capitalize ${
                          index === 0
                            ? "w-[50px] text-gray-900"
                            : "text-gray-800 font-medium"
                        }`}
                      >
                        {header.render
                          ? header.render(listItem)
                          : listItem[header.id]}
                      </motion.td>
                    ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={tableFields.length}>
                <p className="text-gray-500 text-left px-4 text-sm py-3">
                  No data to show
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VirtualTable;
