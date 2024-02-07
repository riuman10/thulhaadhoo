import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  fields: object[];
  items: object[];
  fetchNextUrl?: string;
  loading : boolean;
  onRowClick: (item: any) => any;
}

const InfinityTable = ({
  onRowClick = () => {},
  fields,
  items,
  fetchNextUrl,
  loading = false,
}: Props) => {
  const tableRef = useRef(null);
  const [nextUrl, setNextUrl] = useState("");
  const [tableFields, setTableFields] = useState(fields);
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    setData(items);
  }, [items]);

  useEffect(() => {}, [data]);

  return (
    <>
      <div
        className="flex flex-col border border-[#292929] shadow-sm bg-transparent rounded-xl overflow-hidden"
        ref={tableRef}
      >
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="w-full divide-y divide-[#292929] bg-[#141414]">
                <thead className="">
                  <tr className="">
                    {fields.map((header: any, index: number) => (
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
                {loading ? (
                  <Loading />
                ) : (
                  <tbody
                    className={`bg-[#141414] relative divide-y divide-[#292929]`}
                  >
                    {data &&
                      data.map((item : any, index : number) => (
                        <tr key={index} onClick={() => onRowClick(item)}>
                          {tableFields &&
                            tableFields.map((header: any, index: number) => (
                              <motion.td
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                key={index}
                                className={`px-6 py-4 whitespace-nowrap text-sm truncate max-w-[230px] cursor-pointer ${
                                  index == 0
                                    ? "w-[50px] text-gray-100"
                                    : "text-gray-100"
                                }`}
                              >
                                {header.render
                                  ? header.render(item)
                                  : item[header.id]}
                              </motion.td>
                            ))}
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfinityTable;

const Loading = () => {
  const [loaders, setLoaders] = useState(Array(30).fill(""));

  return (
    <div className="flex gap-6 mx-2 py-6">
      {loaders.map((_, i) => (
        <div key={i} role="status" className="max-w-sm animate-pulse">
          {Array(15)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-200 rounded-full w-48 mb-4"
              ></div>
            ))}
        </div>
      ))}
    </div>
  );
};
