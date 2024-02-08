import { useState } from "react";
import Header from "@/components/global/Header";
import { IslandDropdown } from "@/data/Dashboard";
import dynamic from "next/dynamic";
const DropDown = dynamic(() => import("@/components/global/DropDown"));
const Thulhaadhoo = dynamic(() => import("@/components/islands/Thulhaadhoo"));
const Goidhoo = dynamic(() => import("@/components/islands/Goidhoo"));
const Fehendhoo = dynamic(() => import("@/components/islands/Fehendhoo"));
const Fulhadhoo = dynamic(() => import("@/components/islands/Fulhadhoo"));
const AllIslands = dynamic(() => import("@/components/islands/AllIslands"));

type Props = {};

function Dashboard({}: Props) {
  const [selectedIsland, setSelectedIsland] = useState(IslandDropdown[0]);

  const Components = (island: string) => {
    switch (island) {
      case "B. Thulhaadhoo":
        return <Thulhaadhoo />;
      case "B. Goidhoo":
        return <Goidhoo />;
      case "B. Fehendhoo":
        return <Fehendhoo />;
      case "B. Fulhadhoo":
        return <Fulhadhoo />;
      case "all":
        return <AllIslands />;
      default:
        return <></>;
    }
  };
  return (
    <div className="h-full">
      <Header title="Dashboard" />
      <div className="flex flex-col gap-2 mt-10 mb-8">
        <p className={`text-700 text-sm pb-1.5 font-medium`}>Select Island</p>
        <div className="max-w-[300px]">
          <DropDown
            items={IslandDropdown}
            defaultSelected={selectedIsland}
            onSelect={(x) => setSelectedIsland(x)}
          />
        </div>
      </div>
      {Components(selectedIsland?.id)}
    </div>
  );
}

export default Dashboard;
