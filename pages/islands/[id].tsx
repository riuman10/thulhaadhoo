import React from "react";
import { useEffect, useState } from "react";
import { TableFields, searchByArr, D2DTableFields, Party, Agents, Candidates} from "@/data/Global";
import { supabase } from "@/supabase";
import VirtualTable from "@/components/tables/VirtualTable";
import { useParams } from "next/navigation";
import Input from "@/components/inputs/Input";
import ChevronDown from "@/components/icons/ChevronDown";
import { IslandTabs } from "@/data/TabsData";
import Tabs from "@/components/global/Tabs";
import SolidTabs from "@/components/global/SolidTabs";
import Modal from "@/components/global/Modal";
import CallCenter from "@/components/forms/CallCenter";
import D2D from "@/components/forms/D2D";
import Filter from "@/components/filter/Filter";
import FilterTab from "@/components/filter/FilterTab";
import { Scale , User , Trash2, FileCheck} from 'lucide-react';

type Props = {
  params: { slug: string };
};

const PAGE_SIZE = 25;

function IslandDetaila({}: Props) {
  const params = useParams<{ id: string; item: string }>();
  let decodedString = decodeURIComponent(
    params && params.id ? params?.id.replace(/\%20/g, " ") : ""
  );
  const [drawer, setDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState(IslandTabs[0].id);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<string>("house");
  const [selectedItem, setSelectedItem] = useState<any>(false);
  const [agents, setAgents] = useState<any>([]);


  // Filters
  const [selectedParty, setSelectedParty] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(false);

  const fetchAgents = async () => {
    const { data } = await supabase.from("agents").select("*");
    let temp = data && data.forEach((obj : any) => {
      obj["name"] = obj.full_name;
  });
  console.log(data , "mmmm")
    data ? setAgents(data) : setAgents([]);
  };

  const fetchData = async () => {
    let query = supabase
      .from("thulhaadhoo_foshi")
      .select("*")
      .order("house_name", {
        ascending: true,
      })
      .eq("island", decodedString);

    if (selectedParty !== false) {
      query = query.eq("party", selectedParty);
    }
    if (selectedAgent !== false) {
      query = query.eq("agent", selectedAgent);
    }
    if (selectedCandidate !== false) {
      query = query.eq("voting_for", selectedCandidate);
    }

    const { data } = await query.range(
      (pageNumber - 1) * PAGE_SIZE,
      pageNumber * PAGE_SIZE - 1
    );

    if (pageNumber === 1) {
      setData(data);
    } else {
      setData((prev: any) => [...prev, ...(data || [])]);
    }
  };

  const searchData = async (value: string) => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("thulhaadhoo_foshi")
        .select("*")
        .eq("island", decodedString)
        .textSearch(searchBy === "house" ? "house_name" : "full_name", value);
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      setSearch("");
      fetchData();
    }
  }, [searchBy]);

  useEffect(() => {
      setPageNumber(1);
      fetchData();
  }, [selectedParty, selectedAgent , selectedCandidate]);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    fetchAgents();
  },[]);

  return (
    <div className="space-y-8">
      <p className="text-2xl font-medium text-gray-900">{decodedString}</p>
      <Tabs
        tabs={IslandTabs}
        onClick={(x) => setActive(x.id)}
        activeTab={active}
        layoutId="island_tab"
      />
      <div className="w-full flex items-center justify-between">
        <Filter>
          <FilterTab
            icon = {<Scale stroke = "#737373" size = {14} />}
            value="Party"
            triggerId="#party_trigger"
            condition="is"
            filterItems={Party}
            defaultValue={selectedParty}
            onSelect={(x) => {
              setSelectedParty(x.id);
            }}
          />
           <FilterTab
            icon = {<User stroke = "#737373" size = {14} />}
            value="Agent"
            triggerId="#agent_trigger"
            condition="is"
            filterItems={agents}
            defaultValue={selectedAgent}
            onSelect={(x) => {
              setSelectedAgent(x.agent_name);
            }}
          />
           <FilterTab
            icon = {<FileCheck stroke = "#737373" size = {14} />}
            value="Voting"
            triggerId="#voting_for_trigger"
            condition="for"
            filterItems={Candidates}
            defaultValue={selectedCandidate}
            onSelect={(x) => {
              setSelectedCandidate(x.id);
            }}
          />

      <div className="border px-2 py-[5px] rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        setSelectedAgent(false);
        setSelectedParty(false);
        setSelectedCandidate(false);
      }}
      >
        <Trash2 stroke = "#737373" size = {14} />
      </div>
        </Filter>
        <div className="flex items-center gap-2">
          <SolidTabs
            tabs={searchByArr}
            activeTab={searchBy}
            onClick={(x) => setSearchBy(x.id)}
          />
          <Input
            placeholder={
              searchBy === "house" ? "Search by house..." : "Search by name..."
            }
            value={search}
            width="md:w-[350px] w-[250px] max-w-[350px]"
            containerClassNames="w-min"
            onChange={(value) => {
              setSearch(value);
              setTimeout(() => {
                value ? searchData(value) : fetchData();
              }, 1000);
            }}
          />
        </div>
      </div>
      <VirtualTable
        data={data}
        tableFields={active === "call_center" ? TableFields : D2DTableFields}
        onRowClick={(x: any) => {
          setSelectedItem(x);
          setDrawer(true);
        }}
      />
      {search ? (
        <></>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div
            className=" bg-gray-50 px-2 text-center mt-10 rounded-xl cursor-pointer py-1"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <ChevronDown />
          </div>
        </div>
      )}

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        size="max-w-[450px]"
        title={`${selectedItem.full_name} | ${active === "call_center" ? "Call Center" : "D2D"}`}
        btnText="Update"
      >
        {active === "call_center" ? (
          <CallCenter
            item={selectedItem}
            onSuccess={(item) => {
              let index = data.findIndex((x: any) => x.id === item[0].id);
              setData(data.with(index, item[0]));
              setDrawer(false);
            }}
          />
        ) : (
          <D2D
            item={selectedItem}
            onSuccess={(item) => {
              let index = data.findIndex((x: any) => x.id === item[0].id);
              setData(data.with(index, item[0]));
              setDrawer(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default IslandDetaila;