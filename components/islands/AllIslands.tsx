import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import BorderCard from "../cards/BorderCard";
import PieChart from "../charts/PieChart";
import PartyChart from "../charts/PartyChart";
import CadidateChart from "../charts/CadidateChart";
import { colorLookup } from "@/data/Global";
import { processCandidatesWithColors } from "@/helpers/islandFunctions";

type Props = {};

export default function AllIslands({}: Props) {
  const [overview, setOverview] = useState<any>([]);
  const [candidateInsights, setCadidateInsights] = useState<any>([]);

  const fetchData = async () => {
    const { data } = await supabase.from(`party_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    const partyWithColors =
      temp &&
      temp.map((item) => ({
        ...item,
        fill: colorLookup[item.party] || "defaultColor",
      }));
    setOverview(partyWithColors);
  };

  const fetchCandidates = async () => {
    const { data } = await supabase.from(`all_voting_for`).select("*");
    let temp = data && data.filter((obj) => obj.voting_for !== "-");
    setCadidateInsights(processCandidatesWithColors(temp));
  };

  useEffect(() => {
    fetchData();
    fetchCandidates();
  }, []);

  return (
    <div className="h-full pb-10">
      <p className="text-xl md:text-3xl font-bold leading-6 mb-8 md:text-center text-left">
        All islands
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-[#292929] w-full p-6 flex flex-col rounded-xl">
          <p className="text-lg font-medium text-zinc-100">Party insights</p>
          <p className="text-sm text-zinc-100">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="flex items-center justify-center">
            <PartyChart series={overview} dataKey="party_count" />
          </div>
        </div>
        <div className="border border-[#292929] w-full p-6 flex-1 flex flex-col rounded-xl">
          <p className="text-lg font-medium">Candidate insights</p>
          <p className="text-sm mb-8">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <CadidateChart series={candidateInsights} />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {overview &&
          overview.map((item: any, index: number) => (
            <BorderCard
              key={index}
              title={item.party}
              value={item.party_count}
              party
            />
          ))}
      </div>
    </div>
  );
}
