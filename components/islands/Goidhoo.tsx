import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { colorLookup } from "@/data/Global";
const BorderCard = dynamic(() => import("../cards/BorderCard"));
const Voters = dynamic(() => import("./Voters"));
const PackageBox = dynamic(() => import("../icons/PackageBox"));
const Input = dynamic(() => import("../inputs/Input"));
const Modal = dynamic(() => import("../global/Modal"));
const CadidateChart = dynamic(() => import("../charts/CadidateChart"));
const PartyChart = dynamic(() => import("../charts/PartyChart"));
import { processCandidatesWithColors } from "@/helpers/islandFunctions";

type Props = {};

export default function Goidhoo({}: Props) {
  const [overview, setOverview] = useState<any>();
  const [votingFrom, setVotingFrom] = useState<any>(false);
  const [votingFor, setVotingFor] = useState<any>(false);
  const [selectedDhaairaa, setSelectedDhaairaa] = useState<any>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    const { data } = await supabase.from(`goidhoo_party_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    const partyWithColors =
      temp &&
      temp.map((item) => ({
        ...item,
        fill: colorLookup[item.party] || "defaultColor",
      }));
    setOverview(partyWithColors);
  };

  const fetchBox = async () => {
    const { data } = await supabase.from(`goidhoo_box_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    setVotingFrom(temp);
  };

  const fetchVotingFor = async () => {
    const { data } = await supabase.from(`goidhoo_voting_for`).select("*");
    let temp = data && data.filter((obj) => obj.voting_for !== "-");
    setVotingFor(processCandidatesWithColors(temp));
  };

  const filteredItems =
    votingFrom &&
    votingFrom.filter((item: any) =>
      item.registered_box.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    fetchBox();
    fetchData();
    fetchVotingFor();
  }, []);

  return (
    <div>
      <p className="text-xl md:text-3xl font-bold leading-6 mb-8 md:text-center text-left">Goidhoo</p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border border-[#292929] w-full p-6 flex flex-col rounded-xl">
          <p className="text-lg font-medium mb-1">Party insights</p>
          <p className="text-sm mb-8">
            Insights of all parties from B.Thulhaadhoo.
          </p>
          <div className="flex items-center justify-center">
            <PartyChart series={overview} dataKey="count" />
          </div>
        </div>
        <div className="border border-[#292929] w-full p-6 flex-1 flex flex-col rounded-xl">
          <p className="text-lg font-medium mb-1">Candidate insights</p>
          <p className="text-sm mb-8">
            Insights of all candidates from B.Thulhaadhoo
          </p>
          <CadidateChart series={votingFor} />
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-3">
          <PackageBox />
          <p className="text-xl font-semibold whitespace-nowrap">
            Party Insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
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
      </section>

      <section className="mt-20">
        <div className="flex items-center gap-3">
          <PackageBox />
          <p className="text-xl font-semibold whitespace-nowrap">Insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {votingFor &&
            votingFor.map((item: any, index: number) => (
              <BorderCard
                key={index}
                title={item.voting_for}
                value={item.count}
                party={true}
                onClick={() => {}}
              />
            ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center justify-between mt-14 w-full">
          <div className="flex items-center gap-3">
            <PackageBox />
            <p className="text-xl font-semibold whitespace-nowrap">
              Voting box
            </p>
          </div>
          <div>
            <Input
              placeholder="Search..."
              value={search}
              width="w-[200px] md:w-[300px]"
              onChange={(value) => setSearch(value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
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
      </section>

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        title={selectedDhaairaa.registered_box}
        showButton={false}
        size="max-w-[950px]"
      >
        <Voters item={selectedDhaairaa} onSuccess={() => {}} />
      </Modal>
    </div>
  );
}
