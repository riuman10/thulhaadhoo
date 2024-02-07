import dynamic from "next/dynamic";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/supabase";
import { TableFields, Islands } from "@/data/Global";
import ChevronDown from "@/components/icons/ChevronDown";
const Modal = dynamic(() => import("@/components/global/Modal"));
const InfinityTable = dynamic(() => import("@/components/tables/InfinityTable"));
const Input = dynamic(() => import("@/components/inputs/Input"));
const VoterDetails = dynamic(
  () => import("@/components/voters_list/VoterDetails")
);
const Tabs = dynamic(() => import("@/components/global/Tabs"));
import VirtualTable from "@/components/tables/VirtualTable";

const PAGE_SIZE = 25;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [voters, setVoters] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [island, setIsland] = useState<any>(Islands[0].id);

  const fetchData = async () => {
    const { data } = await supabase
      .from("thulhaadhoo_foshi")
      .select("*")
      .range((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE - 1);
    if (voters.length === 0) {
      setVoters(data);
      setLoading(false);
    } else {
      setVoters((prev: any) => [...prev, ...(data || [])]);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchVoters = async () => {
    let query = supabase.from("thulhaadhoo_foshi").select("*").order('house_name', { ascending: true });

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
      .textSearch("full_name", value)
      .eq("island", island);
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

  useEffect(() => {
    fetchVoters();
  }, []);

  return (
    <div className="p-14">
      <div className="flex justify-between">
        <div>
          <Tabs
            buttons={Islands}
            active={island}
            onClick={(x: any) => setIsland(x.id)}
          />
        </div>
        <div className="flex gap-3 items-center mb-8">
          <Input
            placeholder="Search..."
            value={search}
            width="md:w-[350px] w-[150px]"
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
      data = {voters} 
      tableFields = {TableFields} 
      onRowClick={(x: any) => {
        setSelectedItem(x);
        setOpen(true);
      }}
      />
      {/* <InfinityTable
        fields={TableFields}
        items={voters}
        loading={loading}
        onRowClick={(x: any) => {
          setSelectedItem(x);
          setOpen(true);
        }}
      /> */}

      {search ? (
        <></>
      ) : (
        <div className="w-full flex items-center justify-center">
        <div className=" bg-[#141414] px-8 text-center mt-10 rounded-xl cursor-pointer py-2" onClick={() => setPageNumber(pageNumber + 1)}>
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
  );
}
