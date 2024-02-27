import { TableFields } from "@/data/Global";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const VirtualTable = dynamic(() => import("../tables/VirtualTable"));
const VoterDetails = dynamic(() => import("../voters_list/VoterDetails"));
const Modal = dynamic(() => import("../global/Modal"));

type Props = {
  item: any;
  island : string,
  confirm?: boolean;
  setConfirm?: (value: boolean) => void;
  onSuccess: (value: any) => void;
};

function HouseVoters({
  item = false,
  island = "",
  confirm = false,
  setConfirm = () => {},
  onSuccess = () => {},
}: Props) {
  const [voters, setVoters] = useState<any>(false);
  const [selectedVoter, setSelectedVoter] = useState<any>(false);
  const [open, setOpen] = useState<boolean>(false);

  const fetchVoters = async () => {
    if (!island) return;
    const { data } = await supabase
      .from(`thulhaadhoo_foshi`)
      .select("*")
      .eq("island", island)
      .eq("house_name", item.house_name);
    setVoters(data);
  };

  useEffect(() => {
    if (!item || !island) return;
    fetchVoters();
  }, [item]);

  return (
    <div>
      <VirtualTable
        data={voters}
        tableFields={TableFields}
        onRowClick={(x: any) => {
          setSelectedVoter(x);
          setOpen(true);
        }}
      />

      <Modal
        drawerOpen={open}
        onClose={() => setOpen(false)}
        title={selectedVoter.full_name}
        btnText="Update"
        size="max-w-[540px]"
      >
        <VoterDetails
          item={selectedVoter}
          onSuccess={(item) => {
            let index = voters.findIndex((x: any) => x.id === item[0].id);
            setVoters(voters.with(index, item[0]));
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default HouseVoters;
