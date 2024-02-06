interface PillProps {
  party: string;
  title?: string;
  containerClass?: string;
}

const PartyPill = ({ party, title, containerClass }: PillProps) => {
  const partyContainer: any = {
    mdp: "bg-yellow-50 border-yellow-200",
    ppm: "bg-pink-50 border-pink-200",
    pnc: "bg-teal-50 border-teal-200",
    democrats: "bg-blue-50 border-blue-200",
    mnp: "bg-blue-50 border-blue-200",
    jp: "bg-red-50 border-red-200",
    adhaalath: "bg-emerald-50 border-emerald-200",
    pnf: "bg-purple-50 border-purple-200",
    unknown: "bg-gray-50 border-gray-200",
  };

  const textType: any = {
    mdp: "text-yellow-500",
    ppm: "text-pink-500 ",
    pnc: "text-teal-500",
    democrats: "text-blue-500",
    mnp: "text-blue-500",
    jp: "text-red-500",
    adhaalath: "text-emerald-500",
    pnf: "text-purple-500",
    unknown: "text-gray-500",
  };

  const background: any = {
    mdp: "#FDE047",
    ppm: "#D63590",
    pnc: "#14B8A6",
    democrats: "#63A8E1",
    mnp: "#263F90",
    jp: "#D83731",
    adhaalath: "#63C355",
    pnf: "#D83731",
    unknown: "black",
  };

  return (
    <>
      <div className="flex">
        <div
          className={`flex h-5 px-2.5 items-center py-0.5 gap-1 rounded-lg border ${partyContainer[party]} ${containerClass}`}
        >
          <div
            style={{
              background: `${background[party]}`,
            }}
            className="h-2 w-2 rounded-full"
          ></div>
          <p
            className={`text-xs font-medium uppercase px-0.5 ${textType[party]}`}
          >
            {title ? title : party}
          </p>
        </div>
      </div>
    </>
  );
};

export default PartyPill;
