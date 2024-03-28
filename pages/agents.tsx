import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { AgentsTableFields } from "@/data/Global";
import { useUserStore } from "@/store";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import Header from "@/components/global/Header";
import Modal from "@/components/global/Modal";
const VirtualTable = dynamic(() => import("@/components/tables/VirtualTable"));
import AddAgent from "@/components/forms/AddAgent";
import { findIndexById } from "@/helpers/findIndexById";

type Props = {};

function Agents({}: Props) {
  const [agents, setAgents] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(false);

  const { user } = useUserStore();
  const fetchAgents = async () => {
    const { data } = await supabase.from("agents").select("*");
    setAgents(data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="space-y-6">
      {user && user.role === "super_admin" ? (
        <button
          onClick={() => setOpen(true)}
          className=" bg-[#292929] py-2 px-2  text-sm rounded-lg flex items-center gap-2"
        >
          <Plus size={14} stroke="white" />
          <p className="text-white">Add</p>
        </button>
      ) : (
        ""
      )}

      <Header title={"Agents"} />

      <VirtualTable
        data={agents}
        tableFields={AgentsTableFields}
        onRowClick={(x: any) => {
          setOpen(true);
          setSelectedItem(x);
        }}
      />

      <Modal
        drawerOpen={open}
        onClose={() => setOpen(false)}
        title={selectedItem ? "Edit Agent" : "Add Agent"}
        btnText={selectedItem ? "Update" : "Add"}
      >
        <AddAgent
          item={selectedItem}
          onSuccess={(x) => {
            if (!x) return;
            if (selectedItem) {
              let index = findIndexById(agents, selectedItem.id);
              setAgents(agents.with(index, x[0]));
            } else {
              setAgents([...agents, x[0]]);
            }
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default Agents;
