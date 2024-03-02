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
const [islands, setIslands] = useState<any>([])
  const { user , session} = useUserStore();


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
      <div className="flex flex-col gap-3 pb-8 border-b border-gray-200">
        <p className="text-3xl font-medium text-zinc-900 leading-6">
          Hello, {user?.first_name}
        </p>
        <p className="text-zinc-400 text-sm">
          Insights of Thulhaadhoo dhaaira for 2024
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 pt-4">
        <p></p>
        <div className="flex flex-row items-center gap-6">
          <p className={`text-zinc-900 text-sm font-medium`}>Select Island :</p>
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
