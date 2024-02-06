import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/supabase";
import { Party, Candidates } from "@/data/Global";
const Input = dynamic(() => import("../inputs/Input"));
const DropDown = dynamic(() => import("../global/DropDown"));
const Radio = dynamic(() => import("../inputs/Radio"));

type Props = {
  item: any;
  confirm?: boolean;
  setConfirm?: (value: boolean) => void;
  onSuccess: (value: any) => void;
};

function VoterDetails({
  item = false,
  confirm = false,
  setConfirm = () => {},
  onSuccess = () => {},
}: Props) {
  const [idCard, setIdCard] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [party, setParty] = useState<any>(false);
  const [votingFor, setVotingFor] = useState<any>(false);

  const updateItem = async () => {
    const { data } = await supabase
      .from("thulhaadhoo_foshi")
      .update({
        nid: idCard,
        party: party ? party.id : "unknown",
        mobile_number: mobile,
        voting_for: votingFor ? votingFor.id : "-",
      })
      .eq("id", item.id)
      .select();
    data ? onSuccess(data) : null;
  };

  useEffect(() => {
    if (!confirm) return;
    updateItem();
    setConfirm(false);
  }, [confirm]);

  useEffect(() => {
    if (!item) return;
    setIdCard(item.nid);
    setMobile(item.mobile_number);
    setParty(item.party);
    setVotingFor(
      item.voting_for !== "-"
        ? Candidates.find((x) => x.id === item.voting_for)
        : false
    );
  }, [item]);

  console.log(votingFor);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-col gap-6">
          <Input
            placeholder="Hello"
            title="Name"
            value={item.full_name}
            disabled
            onChange={() => {}}
          />
          <Input
            placeholder="Hello"
            title="Island"
            value={item.island}
            disabled
            onChange={() => {}}
          />
          <Input
            placeholder="Hello"
            title="House Name"
            value={item.house_name}
            disabled
            onChange={() => {}}
          />
          <Input
            placeholder="type..."
            title="ID card"
            value={idCard}
            onChange={(value) => setIdCard(value)}
          />
          <Input
            placeholder="Enter contact number"
            title="Contact Number"
            value={mobile}
            onChange={(value) => setMobile(value)}
          />
          <div className="flex flex-col gap-1">
            <p className={`text-700 text-sm pb-1.5 font-medium`}>Party</p>
            <DropDown
              items={Party}
              defaultSelected={Party.find((x) => x.id === item.party)}
              onSelect={(obj) => {
                setParty(obj);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg font-semibold mt-8">Voting for</p>
        <Radio
          defaultSelected={
            item.voting_for
              ? Candidates.find((x) => x.id === item.voting_for)
              : votingFor
          }
          onChange={(x) => setVotingFor(x)}
          items={Candidates}
        />
      </div>
      <div>
        <p className="text-lg font-semibold mb-4 mt-8">Voting from</p>
        <div className="flex flex-col gap-6">
          <Input
            placeholder="Hello"
            title="Registered box"
            value={item.registered_box}
            disabled
            onChange={() => {}}
          />
          <Input
            placeholder="Hello"
            title="Consit"
            value={item.consit}
            disabled
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default VoterDetails;
