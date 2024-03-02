import PartyPill from "@/components/global/PartyPill";
import Tick from "@/components/icons/Tick";
import { Home, Vote, Users , X} from "lucide-react";

const TableFields = [
  { name: "ID", id: "nid" },
  {
    name: "Agent",
    id: "agent",
    render: (item: any) => {
      return <p className="capitalize">{item.agent}</p>;
    },
  },
  { name: "Name", id: "full_name" },
  { name: "Island", id: "island" },
  { name: "House Name", id: "house_name" },
  { name: "Mobile", id: "mobile_number" },
  {
    name: "Party",
    id: "party",
    render: (item: any) => {
      return <PartyPill party={item.party} />;
    },
  },
  { name: "Registered Box", id: "registered_box" },
  { name: "Voting for", id: "voting_for" },
  {
    name: "Contacted",
    id: "approached",
    render: (item: any) => {
      return item.approached ? <Tick /> : <Tick background="#FEE6E8" stroke="#F2454D" />;
    },
  },
  {
    name: "Remarks",
    id: "remarks",
    render: (item: any) => {
      return <p className="w-[70px] truncate">{item.remarks}</p>;
    },
  },
];

const yesNo = [
  {
    id: "true",
    name: "Yes",
    subtitle: "Contacted already",
  },
  {
    id: "false",
    name: "No",
    subtitle: "Not Contacted",
  },
];

const roles = [
  {
    id: "agent",
    name: "Agent",
  },
  {
    id: "admin",
    name: "Admin",
  },
];

const colorLookup: any = {
  jp: `#D83731`,
  pnf: `#D83731`,
  democrats: `#63A8E1`,
  mdp: `#FDE047`,
  ppm: `#D63590`,
  pnc: `#69D8CB`,
  mnp: `#263F90`,
  adhaalath: "#63C355",
  kadde: "#D63590",
  shafeeg: "#FDE047",
  shareef: "#E7E5E4",
  hannan: "#E7E5E4",
  afrah: "#63A8E1",
  thahle: "#E7E5E4",
  undecided: "#57534E",
  adam: "#D83731",
  "-": "#E7E5E4",
};

const Candidates = [
  {
    id: "kadde",
    name: "Kadde",
    from: "PPM / PNC",
    color: "#D63590",
  },
  {
    id: "shafeeg",
    name: "Shafeeg",
    from: "MDP",
    color: "#FDE047",
  },
  {
    id: "shareef",
    name: "Shareef",
    from: "Amilla",
    color: "#FDE047",
  },
  {
    id: "thahle",
    name: "Thahle",
    from: "Amilla",
    color: "#FDE047",
  },
  {
    id: "hannan",
    name: "Hannan",
    from: "Amilla",
    color: "#FDE047",
  },
  {
    id: "afrah",
    name: "Afrah",
    from: "The Democrats",
    color: "#FDE047",
  },
  {
    id: "adam",
    name: "Adam",
    from: "PNF",
    color: "#D83731",
  },
  {
    id: "undecided",
    name: "Undecided",
    from: "",
    color: "#FDE047",
  },
];

const Agents = [
  {
    id: "mizzy",
    name: "Mizzy",
  },
  {
    id: "shehey",
    name: "Shehey",
  },
  {
    id: "atheef",
    name: "Atheef",
  },
  {
    id: "shafeeg",
    name: "Shafeeg",
  },
  {
    id: "-",
    name: "No agent",
  },
];

const Party = [
  {
    id: "mdp",
    color: "#FDE047",
    name: "Maldivian Democratic Party (MDP)",
  },
  {
    id: "ppm",
    color: "#D63590",
    name: "Progress Party of Maldives (PPM)",
  },
  {
    id: "pnc",
    color: "#69D8CB",
    name: "Peoples National Congress",
  },
  {
    id: "democrats",
    color: "#63A8E1",
    name: "The Democrats",
  },
  {
    id: "mnp",
    color: "#263F90",
    name: "Maldives National Party",
  },
  {
    id: "jp",
    color: "#D83731",
    name: "Jumhooree Party",
  },
  {
    id: "adhaalath",
    color: "#63C355",
    name: "Adhaalath Party",
  },
  {
    id: "pnf",
    color: "#D83731",
    name: "Peoples National Front (PNF)",
  },
  {
    id: "unknown",
    color: "#D83731",
    name: "No Party",
  },
];

const Islands = [
  {
    id: "B. Fehendhoo",
    name: "B. Fehendhoo",
  },
  {
    id: "B. Fulhadhoo",
    name: "B. Fulhadhoo",
  },
  {
    id: "B. Goidhoo",
    name: "B. Goidhoo",
  },
  {
    id: "B. Thulhaadhoo",
    name: "B. Thulhaadhoo",
  },
];

const adminNavigationLinks = [
  {
    id: "home",
    name: "Dashboard",
    link: "/dashboard",
    icon: <Home stroke="#71717A" />,
  },
  {
    id: "voters_list",
    name: "Voters List",
    link: "/voters-list",
    icon: <Vote stroke="#71717A" />,
  },
  {
    id: "users",
    name: "Users",
    link: "/users",
    icon: <Users stroke="#71717A" />,
  },
];

const agentNavigationLinks = [
  {
    id: "home",
    name: "Dashboard",
    link: "/dashboard",
    icon: <Home stroke="#71717A" />,
  },
  {
    id: "voters_list",
    name: "Voters List",
    link: "/voters-list",
    icon: <Vote stroke="#71717A" />,
  },
];

export {
  TableFields,
  Party,
  Islands,
  Candidates,
  yesNo,
  agentNavigationLinks,
  adminNavigationLinks,
  colorLookup,
  Agents,
  roles,
};
