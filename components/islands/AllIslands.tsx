import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import BorderCard from "../cards/BorderCard";
import PartyChart from "../charts/PartyChart";
import CadidateChart from "../charts/CadidateChart";
import {
  processCandidatesWithColors,
  putCandidateColors,
} from "@/helpers/islandFunctions";

type Props = {};

export default function AllIslands({}: Props) {
  const [overview, setOverview] = useState<any>([]);
  const [candidateInsights, setCadidateInsights] = useState<any>([]);
  const [registeredVoters, setRegisteredVoters] = useState<any>([]);

  const fetchData = async () => {
    const { data } = await supabase.from(`party_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    setOverview(putCandidateColors(temp));
  };

  const fetchCandidates = async () => {
    const { data } = await supabase.from(`all_voting_for`).select("*");
    let temp = data && data.filter((obj) => obj.voting_for !== "-");
    setCadidateInsights(processCandidatesWithColors(temp));
  };

  const fetchVotersByIsland = async () => {
    const { data } = await supabase
      .from(`registered_voters_by_island`)
      .select("*");
    setRegisteredVoters(data);
  };

  useEffect(() => {
    fetchData();
    fetchCandidates();
    fetchVotersByIsland();
  }, []);

  return (
    <div className="h-full pb-10">
      <p className="text-xl md:text-2xl font-medium leading-6 text-left text-zinc-900 mb-8">
        All Islands
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-gray-200 w-full p-6 flex flex-col rounded-xl">
          <p className="text-lg font-medium text-zinc-900">Party insights</p>
          <p className="text-sm text-zinc-400">
            Insights of all the islands as a whole in the costituency.
          </p>
          <div className="flex items-center justify-center">
            <PartyChart series={overview} dataKey="party_count" />
          </div>
        </div>
        <div className="border border-gray-200 w-full p-6 flex-1 flex flex-col rounded-xl">
          <p className="text-lg font-medium text-zinc-900">Candidate insights</p>
          <p className="text-sm mb-8 text-zinc-400">
            Insights of all the candidates and vote count from the whole
            costituency.
          </p>
          <CadidateChart series={candidateInsights} />
        </div>
      </section>

      <section className="space-y-6 mt-10">
        <p className="text-xl md:text-2xl font-medium leading-6 text-left text-[#FCFCFC]">
          Registered Voters
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {registeredVoters &&
            registeredVoters.map((item: any, index: number) => (
              <BorderCard
                key={index}
                title={item.island}
                value={item.total_registered}
                party={false}
              />
            ))}
        </div>
      </section>

      <section className="space-y-6 mt-10">
        <p className="text-xl md:text-2xl font-medium leading-6 text-left text-[#FCFCFC]">
          Party headcount
        </p>
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
      </section>
    </div>
  );
}
