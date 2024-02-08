import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import BorderCard from "../cards/BorderCard";
import dynamic from "next/dynamic";
import Voters from "./Voters";
import PackageBox from "../icons/PackageBox";
const Modal = dynamic(() => import("../global/Modal"));

type Props = {};

export default function Thulhaadhoo({}: Props) {
  const [overview, setOverview] = useState<any>();
  const [votingFrom, setVotingFrom] = useState<any>(false);
  const [selectedDhaairaa, setSelectedDhaairaa] = useState<any>(false);
  const [drawer, setDrawer] = useState<boolean>(false);

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
      <div className="flex gap-3 items-center mt-14">
        <PackageBox />
        <p className="text-lg font-semibold">Voting box</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {votingFrom &&
          votingFrom.map((item: any, index: number) => (
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
          ))}
      </div>

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        title={selectedDhaairaa.registered_box}
        showButton={false}
        size="max-w-[900px]"
      >
        <Voters item={selectedDhaairaa} onSuccess={() => {}} />
      </Modal>
    </div>
  );
}
