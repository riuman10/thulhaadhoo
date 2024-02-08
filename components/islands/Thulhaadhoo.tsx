import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const BorderCard = dynamic(() => import("../cards/BorderCard"));
const Voters = dynamic(() => import("./Voters"));
const PackageBox = dynamic(() => import("../icons/PackageBox"));
const Input = dynamic(() => import("../inputs/Input"));
const Modal = dynamic(() => import("../global/Modal"));

type Props = {};

export default function Thulhaadhoo({}: Props) {
  const [overview, setOverview] = useState<any>();
  const [votingFrom, setVotingFrom] = useState<any>(false);
  const [selectedDhaairaa, setSelectedDhaairaa] = useState<any>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    const { data } = await supabase.from(`thulhaadhoo_party`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    setOverview(temp);
  };

  const fetchBox = async () => {
    const { data } = await supabase.from(`thulhaadhoo_box_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    setVotingFrom(temp);
  };

  const filteredItems =
    votingFrom &&
    votingFrom.filter((item: any) =>
      item.registered_box.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    fetchData();
    fetchBox();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {overview &&
          overview.map((item: any, index: number) => (
            <BorderCard
              key={index}
              title={item.party}
              value={item.count}
              party={true}
            />
          ))}
      </div>

      <div className="flex items-center justify-between mt-14 w-full">
        <div className="flex items-center gap-3">
          <PackageBox />
          <p className="text-lg font-semibold whitespace-nowrap">Voting box</p>
        </div>
        <div>
          <Input
            placeholder="Search..."
            value={search}
            width="w-[300px]"
            onChange={(value) => setSearch(value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item: any, index: number) => (
            <BorderCard
              key={index}
              title={item.registered_box}
              value={item.count}
              party={false}
              classNames="cursor-pointer"
              onClick={() => {
                setSelectedDhaairaa(item);
                setDrawer(true);
              }}
            />
          ))
        ) : (
          <p className="text-sm">No box's found.</p>
        )}
      </div>

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        title={selectedDhaairaa.registered_box}
        showButton={false}
        size="max-w-[900px]"
      >
        <Voters 
        item={selectedDhaairaa} 
        onSuccess={() => {}} 
        />
      </Modal>
    </div>
  );
}
