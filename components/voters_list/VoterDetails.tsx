import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Party, Candidates, yesNo, Agents } from "@/data/Global";
import { useUserStore } from "@/store";
import dynamic from "next/dynamic";
const Input = dynamic(() => import("../inputs/Input"));
const DropDown = dynamic(() => import("../global/DropDown"));
const Radio = dynamic(() => import("../inputs/Radio"));
const TextArea = dynamic(() => import("../inputs/TextArea"));

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
  const [remarks, setRemarks] = useState<string>("");
  const [party, setParty] = useState<any>(false);
  const [agent, setAgent] = useState<any>(false);
  const [votingFor, setVotingFor] = useState<any>(false);
  const [contacted, setContacted] = useState<any>(false);
  const [votingForD2D , setVotingForD2D] = useState<any>(false);
  const { user } = useUserStore();
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const updateItem = async () => {
    const { data } = await supabase
      .from("thulhaadhoo_foshi")
      .update({
        nid: idCard,
        party: party ? party.id : "unknown",
        mobile_number: mobile,
        remarks: remarks,
        voting_for: votingFor ? votingFor.id : "-",
        approached: contacted.id === "true" ? true : false,
        agent: agent ? agent.id : "-",
        ...(hasAccess && { voting_for_d2d: votingForD2D ? votingForD2D.id  : "-"}),
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
    setRemarks(item.remarks);
    setAgent(item.agent);
    setVotingFor(
      item.voting_for !== "-"
        ? Candidates.find((x) => x.id === item.voting_for)
        : false
    );
    setVotingForD2D(
      item.voting_for_d2d !== "-"
        ? Candidates.find((x) => x.id === item.voting_for_d2d)
        : false
    );
  }, [item]);

  useEffect(() => {
    setHasAccess(user && (user.role === "admin" || user.role === "super_admin"));
  }, [user]);

  console.log(hasAccess)

  return (
    <div className="h-full flex flex-col gap-6 bg-white">
      <div>
        <div className="space-y-8">
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
          <div className="flex flex-col gap-1">
            <p className={`text-700 text-sm pb-1.5 font-medium`}>Agent</p>
            <DropDown
              items={Agents}
              defaultSelected={Agents.find((x) => x.id === item.agent)}
              onSelect={(obj) => {
                setAgent(obj);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-lg font-semibold mt-8">Contacted</p>
        <Radio
          defaultSelected={
            item.approached !== undefined
              ? yesNo.find((x) => x.id === item.approached.toString())
              : contacted
          }
          onChange={(x) => setContacted(x)}
          items={yesNo}
        />
      </div>
      <div className="flex flex-col gap-6 mb-10">
        <TextArea
          placeholder="type..."
          title="Remarks"
          value={remarks}
          onChange={(value) => setRemarks(value)}
        />
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

      {
        hasAccess ? (
          <div className="flex flex-col gap-6">
        <p className="text-lg font-semibold mt-8">Voting for D2D</p>
        <Radio
          defaultSelected={
            item.voting_for_d2d
              ? Candidates.find((x) => x.id === item.voting_for_d2d)
              : votingForD2D
          }
          onChange={(x) => setVotingForD2D(x)}
          items={Candidates}
        />
      </div>
        ) : ""
      }
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
