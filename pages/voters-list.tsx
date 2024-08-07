import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/supabase";
import { useUserStore } from "@/store";
import { TableFields, Islands, Agents } from "@/data/Global";
const Header = dynamic(() => import("@/components/global/Header"));
const SolidTabs = dynamic(() => import("@/components/global/SolidTabs"));
const ChevronDown = dynamic(() => import("@/components/icons/ChevronDown"));
const VoterDetails = dynamic(() => import("@/components/voters_list/VoterDetails"));
const VirtualTable = dynamic(() => import("@/components/tables/VirtualTable"));
const Modal = dynamic(() => import("@/components/global/Modal"));
const Input = dynamic(() => import("@/components/inputs/Input"));

const PAGE_SIZE = 25;

type Props = {};

let searchTypes = [
  {
    id : "full_name",
    name : "Name"
  },
  {
    id : "house_name",
    name : "House"
  }
]

function VotersList({}: Props) {
  // const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [voters, setVoters] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [searchBy, setSearchBy] = useState<any>(searchTypes[0].id);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [island, setIsland] = useState<any>(Islands[3].id);
  const [islands, setIslands] = useState<any>([]);
  const { user } = useUserStore();

  const fetchVoters = async () => {
    let query = supabase
      .from("thulhaadhoo_mdp")
      .select("*")
      // .order("house_name", {
      //   ascending: true,
      // });

    const { data } = await query.range(
      (pageNumber - 1) * PAGE_SIZE,
      pageNumber * PAGE_SIZE - 1
    );

    if (pageNumber === 1) {
      setVoters(data);
    } else {
      setVoters((prev: any) => [...prev, ...(data || [])]);
    }
  };

  const searchData = async (value: string) => {
    const { data } = await supabase
      .from("thulhaadhoo_mdp")
      .select("*")
      .textSearch(searchBy.id === "house_name" ? "house_name" : `full_name`, value)
      // .eq("island", island);
    setVoters(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVoters();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    fetchVoters();
  }, [island]);

  return (
    <div>
      <Header title="Voters list" />
      <div className="mt-8">
        <div className="flex md:flex-row flex-col md:gap-0 gap-3 justify-between">
          <div className="flex h-[40px] gap-8">
            <SolidTabs
              tabs={[{id : "B. Thulhaadhoo" , name : "B.Thulhaadhoo"}]}
              activeTab={island}
              onClick={(x: any) => setIsland(x.id)}
            />
          </div>
          <div className="flex gap-3 items-center mb-8">
            <div className="flex flex-row gap-2">
            {searchTypes &&
              searchTypes.map((item, index) => (
                <>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSearchBy(item)}>
                    <input
                      id="red-radio"
                      type="radio"
                      value={searchBy}
                      checked={item.id === searchBy.id}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:yellow-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {item.name}
                    </label>
                  </div>
                </>
              ))}
              </div>
            <Input
              placeholder={searchBy.id === "house_name" ? "Search by house..." : "Search by name..."}
              value={search}
              width="md:w-[350px] w-[250px]"
              onChange={(value) => {
                setSearch(value);
                setTimeout(() => {
                  value ? searchData(value) : fetchVoters();
                }, 1000);
              }}
            />
          </div>
        </div>
        <VirtualTable
          data={voters}
          tableFields={TableFields}
          onRowClick={(x: any) => {
            setSelectedItem(x);
            setOpen(true);
          }}
        />
        {search ? (
          <></>
        ) : (
          <div className="w-full flex items-center justify-center">
            <div
              className=" bg-white px-4 text-center mt-10 rounded-xl cursor-pointer py-2"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <ChevronDown />
            </div>
          </div>
        )}
        <Modal
          drawerOpen={open}
          onClose={() => setOpen(false)}
          size="max-w-[540px]"
          title={`Voter details`}
          btnText="Update"
        >
          <VoterDetails
            item={selectedItem}
            onSuccess={(item) => {
              let index = voters.findIndex((x: any) => x.id === item[0].id);
              setVoters(voters.with(index, item[0]));
              setOpen(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default VotersList;
