import React from "react";
import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import { Candidates, Party, Agents, yesNo } from "@/data/Global";
import { MessageSquareQuote } from "lucide-react";
import { useUserStore } from "@/store";
import TextArea from "../inputs/TextArea";
import DropDown from "../global/DropDown";
import PartyPill from "../global/PartyPill";
import Radio from "../inputs/Radio";
import Input from "../inputs/Input";

type Props = {
  item: any;
  confirm?: boolean;
  setConfirm?: (value: boolean) => void;
  onSuccess: (value: any) => void;
};

function CallCenter({
  item = false,
  confirm = false,
  setConfirm = () => {},
  onSuccess = () => {},
}: Props) {
  const [remarks, setRemarks] = useState<string>("");
  const [agent, setAgent] = useState<any>(false);
  const [votingFor, setVotingFor] = useState<any>(false);
  const [party, setParty] = useState<any>(false);
  const [contacted, setContacted] = useState<any>(false);
  const [mobile, setMobile] = useState<string>("");
  const { user } = useUserStore();
  const [agents, setAgents] = useState<any>([]);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const fetchAgents = async () => {
    const { data } = await supabase.from("agents").select("*");
    setAgents(data);
    setAgent(data && data.find((x: any) => x.agent_name === item.agent));
  };

  const updateItem = async () => {
    const { data } = await supabase
      .from("thulhaadhoo_foshi")
      .update({
        approached: contacted.id === "true" ? true : false,
        voting_for: votingFor ? votingFor.id : "-",
        party: party ? party.id : "unknown",
        agent: agent ? agent.agent_name : "-",
        mobile_number: mobile,
        remarks: remarks,
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
    setRemarks(item.remarks);
    setVotingFor(
      item.voting_for !== "-"
        ? Candidates.find((x) => x.id === item.voting_for)
        : false
    );
    setContacted(item.approached);
    setMobile(item.mobile_number);
  }, [item]);

  useEffect(() => {
    setHasAccess(
      user && (user.role === "admin" || user.role === "super_admin")
    );
  }, [user]);

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="p-6 pb-[130px]">
      <div className="grid grid-cols-2 gap-6">
        <StatusContainer label={"Name"}>
          <p className="text-sm leading-5 text-gray-900">{item.full_name}</p>
        </StatusContainer>
        <StatusContainer label={"Party"}>
          <PartyPill party={item.party} />
        </StatusContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <StatusContainer label={"House"}>
          <p className="text-sm leading-5 text-gray-900">{item.house_name}</p>
        </StatusContainer>
        <StatusContainer label={"Island"}>
          <p className="text-sm leading-5 text-gray-900">{item.island}</p>
        </StatusContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <StatusContainer label={"NID"}>
          <p className="text-sm leading-5 text-gray-900">{item.nid}</p>
        </StatusContainer>
        <StatusContainer label={"Mobile No"}>
          <p className="text-sm leading-5 text-gray-900">
            {item.mobile_number}
          </p>
        </StatusContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <StatusContainer label={"Consit"}>
          <p className="text-sm leading-5 text-gray-900">{item.consit}</p>
        </StatusContainer>
        <StatusContainer label={"Registered box"}>
          <p className="text-sm leading-5 text-gray-900">
            {item.registered_box}
          </p>
        </StatusContainer>
      </div>

      <div className="bg-[#F7F7F7] mt-4 p-2">
        <div className="flex items-center gap-2 mb-[6px]">
          <MessageSquareQuote size={12} stroke="#A3A3A3" />
          <p className="text-xs leading-4 text-gray-400">
            Remarks from Door to Door
          </p>
        </div>
        <p className="text-gray-900 text-sm leading-5 font-medium">
          {item?.remarks_d2d ? item.remarks_d2d : "-"}
        </p>
      </div>

      <div className="border-t py-4 mt-4 space-y-10">
        <Input
          placeholder="Enter contact number"
          title="Contact Number"
          value={mobile}
          onChange={(value) => setMobile(value)}
        />
        <div className="space-y-1.5">
          <p className={`text-gray-700 md:text-sm text-xs pb-1.5 font-medium`}>Party</p>
          <DropDown
            items={Party}
            defaultSelected={Party.find((x) => x.id === item.party)}
            onSelect={(obj) => {
              setParty(obj);
            }}
          />
        </div>
        <div className="space-y-1.5">
          <p className={`text-gray-700 md:text-sm text-xs pb-1.5 font-medium`}>Agent</p>
          <DropDown
            items={agents}
            defaultSelected={agents.find((x: any) => x.agent_name === item.agent)}
            onSelect={(obj) => {
              setAgent(obj);
            }}
          />
        </div>
        <div className="space-y-1.5">
          <p className={`text-gray-700 md:text-sm text-xs pb-1.5 font-medium`}>
            Contacted
          </p>
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
        <div className="space-y-1.5">
          <p className={`text-gray-700 md:text-sm text-xs pb-1.5 font-medium`}>
            Voting for
          </p>
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
        <div className="space-y-1.5">
          <TextArea
            placeholder="type..."
            title="Remarks"
            value={remarks}
            onChange={(value) => setRemarks(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CallCenter;

const StatusContainer = ({ children = <></>, label = "" }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-400 text-xs font-medium uppercase leading-none">
        {label}
      </p>
      {children}
    </div>
  );
};