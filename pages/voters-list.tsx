import React from "react";
import Header from "@/components/global/Header";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/supabase";
import { useUserStore } from "@/store";
import { TableFields, Islands, Agents } from "@/data/Global";
import SolidTabs from "@/components/global/SolidTabs";
const ChevronDown = dynamic(() => import("@/components/icons/ChevronDown"));
const VoterDetails = dynamic(() => import("@/components/voters_list/VoterDetails"));
const VirtualTable = dynamic(() => import("@/components/tables/VirtualTable"));
const Modal = dynamic(() => import("@/components/global/Modal"));
const Input = dynamic(() => import("@/components/inputs/Input"));
const Tabs = dynamic(() => import("@/components/global/Tabs"));

const PAGE_SIZE = 25;

type Props = {};

function VotersList({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [voters, setVoters] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [island, setIsland] = useState<any>(Islands[0].id);
  const [islands, setIslands] = useState<any>([]);
  const { user } = useUserStore();

  const fetchVoters = async () => {
    let query = supabase
      .from("thulhaadhoo_foshi")
      .select("*")
      .order("house_name", {
        ascending: true,
      });

    if (island !== false) {
      query = query.eq("island", island);
    }

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
      .from("thulhaadhoo_foshi")
      .select("*")
      .textSearch("house_name", value)
      .eq("island", island);
    setVoters(data);
    setLoading(false);
  };

  function getUserIsland() {
    if (user && user.role == "agent" && user.island) {
      let temp = Islands.find((x) => x.id === user.island);
      setIslands([...islands, temp]);
      return;
    } else {
      setIslands(Islands);
      return;
    }
  }

  useEffect(() => {
    fetchVoters();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    fetchVoters();
  }, [island]);

  useEffect(() => {
    getUserIsland();
  }, []);

  return (
    <div>
      <Header title="Voters list" />
      <div className="mt-8">
        <div className="flex md:flex-row flex-col md:gap-0 gap-3 justify-between">
          <div className="flex h-[40px] gap-8">
            <SolidTabs
              tabs={islands}
              activeTab={island}
              onClick={(x: any) => setIsland(x.id)}
            />
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Input
              placeholder="Search..."
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
