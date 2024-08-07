import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Palmtree, Home } from "lucide-react";
const BorderCard = dynamic(() => import("../cards/BorderCard"));
const Voters = dynamic(() => import("./Voters"));
const PackageBox = dynamic(() => import("../icons/PackageBox"));
const Input = dynamic(() => import("../inputs/Input"));
const Modal = dynamic(() => import("../global/Modal"));
const CadidateChart = dynamic(() => import("../charts/CadidateChart"));
const PartyChart = dynamic(() => import("../charts/PartyChart"));
const HouseVoters = dynamic(() => import("./HouseVoters"));
import {
  processCandidatesWithColors,
  putCandidateColors,
} from "@/helpers/islandFunctions";

type Props = {};

export default function Thulhaadhoo({}: Props) {
  const [overview, setOverview] = useState<any>();
  const [votingFrom, setVotingFrom] = useState<any>(false);
  const [votingFor, setVotingFor] = useState<any>(false);
  const [houses, setHouses] = useState<any>(false);
  const [selectedDhaairaa, setSelectedDhaairaa] = useState<any>(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [houseSearch, setHouseSearch] = useState<string>("");
  const [houseDrawer, setHouseDrawer] = useState<boolean>(false);
  const [selectedHouse, setSelectedHouse] = useState<any>(false);

  const fetchData = async () => {
    const { data } = await supabase.from(`thulhaadhoo_party`).select("*");
    let temp =
      data && data.length > 0 && data.filter((obj) => obj.party !== "unknown");
    setOverview(putCandidateColors(temp));
  };

  const fetchBox = async () => {
    const { data } = await supabase.from(`mdp_island_count`).select("*");
    let temp = data && data.filter((obj) => obj.party !== "unknown");
    setVotingFrom(temp);
  };

  const fetchVotingFor = async () => {
    const { data } = await supabase.from(`thulhaadhoo_voting_for`).select("*");
    let temp = data && data.filter((obj) => obj.voting_for !== "-");
    setVotingFor(processCandidatesWithColors(temp));
  };

  const fetchHouses = async () => {
    const { data } = await supabase.from(`thulhaadhoo_house_count`).select("*");
    let sorted = data && data.sort((a, b) => a.house_name.localeCompare(b.house_name));
    setHouses(sorted);
  };

  const filteredItems =
    votingFrom &&
    votingFrom.filter((item: any) =>
      item.island.toLowerCase().includes(search.toLowerCase())
    );

  const houseFiltered =
    houses &&
    houses.filter((item: any) =>
      item.house_name.toLowerCase().includes(houseSearch.toLowerCase())
    );

  useEffect(() => {
    fetchData();
    fetchBox();
    fetchVotingFor();
    fetchHouses();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center gap-3 mb-8">
        <Palmtree size={25} stroke="#A3A3A3" />
        <p className="text-xl md:text-2xl font-medium leading-6 md:text-left text-left text-zinc-900">
          Thulhaadhoo
        </p>
      </div>
      <section className="w-full grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className="border border-gray-200 w-full p-6 flex flex-col rounded-xl bg-white">
          <p className="text-lg font-medium mb-1 text-zinc-900">
            Party insights
          </p>
          <p className="text-sm mb-8 text-zinc-400">
            Insights of all parties from B.Thulhaadhoo.
          </p>
          <div className="flex items-center justify-center">
            <PartyChart series={overview} dataKey="count" />
          </div>
        </div>
        <div className="border border-gray-200 w-full p-6 flex-1 flex flex-col rounded-xl bg-white">
          <p className="text-lg font-medium mb-1 text-zinc-900">
            Candidate insights
          </p>
          <p className="text-sm mb-8 text-zinc-400">
            Insights of all candidates from B.Thulhaadhoo
          </p>
          <CadidateChart series={votingFor} />
        </div>
      </section>

      {/* <section className="mt-10">
        <div className="flex items-center gap-3">
          <PackageBox />
          <p className="text-xl font-semibold whitespace-nowrap">
            Party Insights
          </p>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-8">
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
      </section> */}

      <section className="mt-20">
        <div className="flex items-center gap-3">
          <PackageBox />
          <p className="text-xl font-semibold whitespace-nowrap">
            Cadidate Insights
          </p>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-8">
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
              Voting Islands
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

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-8">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item: any, index: number) => (
              <BorderCard
                key={index}
                title={item.island}
                value={item.island_count}
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

      <section className="my-20 border-t border-gray-200 pt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Home stroke="#A3A3A3" size={23} />
            <p className="text-xl font-semibold whitespace-nowrap">Houses</p>
          </div>
          <div>
            <Input
              placeholder="Search..."
              value={houseSearch}
              width="w-[200px] md:w-[300px]"
              onChange={(value) => setHouseSearch(value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-8">
          {houseFiltered && houseFiltered.length > 0 ? (
            houseFiltered.map((item: any, index: number) => (
              <BorderCard
                key={index}
                title={item.house_name}
                value={item.total_registered}
                party={false}
                classNames="cursor-pointer"
                onClick={() => {
                  setSelectedHouse(item);
                  setHouseDrawer(true);
                }}
              />
            ))
          ) : (
            <p className="text-sm">No house's found.</p>
          )}
        </div>
      </section>

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        title={selectedDhaairaa.island}
        showButton={false}
        size="max-w-[1200px]"
      >
        <Voters item={selectedDhaairaa} onSuccess={() => {}} />
      </Modal>

      <Modal
        drawerOpen={houseDrawer}
        onClose={() => setHouseDrawer(false)}
        title={selectedHouse.house_name}
        showButton={false}
        size="max-w-[1400px]"
      >
        <HouseVoters
          item={selectedHouse}
          island="B. Thulhaadhoo"
          onSuccess={() => {}}
        />
      </Modal>
    </div>
  );
}
