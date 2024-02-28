import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DropDown = dynamic(() => import("@/components/global/DropDown"));
const Thulhaadhoo = dynamic(() => import("@/components/islands/Thulhaadhoo"));
const Goidhoo = dynamic(() => import("@/components/islands/Goidhoo"));
const Fehendhoo = dynamic(() => import("@/components/islands/Fehendhoo"));
const Fulhadhoo = dynamic(() => import("@/components/islands/Fulhadhoo"));
const AllIslands = dynamic(() => import("@/components/islands/AllIslands"));
import { IslandDropdown } from "@/data/Dashboard";
import { useUserStore } from "@/store";

type Props = {};

function Dashboard({}: Props) {
  const [selectedIsland, setSelectedIsland] = useState<any>(IslandDropdown[0]);
  const [islands, setIslands] = useState<any>([]);
  const { user } = useUserStore();

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

  function getUserIsland() {
    if (user && user.role == "agent" && user.island) {
      let temp = IslandDropdown.find((x) => x.id === user.island);
      setIslands([...islands, temp]);
      return;
    } else {
      setIslands(IslandDropdown);
      return;
    }
  }

  useEffect(() => {
    if (user && user.role === "agent" && user.island) {
      let temp = IslandDropdown.find((x) => x.id == user.island);
      setSelectedIsland(temp);
    } else {
      setSelectedIsland(IslandDropdown[0]);
    }
    getUserIsland();
  }, []);

  return (
    <div className="h-full">
      <p className="text-3xl pb-8 font-medium text-gray-200 border-b border-[#424242] leading-6">
        Hello, {user?.first_name}
      </p>

      <div className="flex items-center justify-between mb-8 pt-4">
        <p></p>
        <div className="flex flex-row items-center gap-6">
          <p className={`text-zinc-100 text-sm font-medium`}>Select Island :</p>
          <div className="w-[300px]">
            <DropDown
              items={islands}
              defaultSelected={selectedIsland}
              onSelect={(x) => setSelectedIsland(x)}
            />
          </div>
        </div>
      </div>
      {Components(selectedIsland?.id)}
    </div>
  );
}

export default Dashboard;
