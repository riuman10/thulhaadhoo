type Props = {
  title: string;
  value: string;
  party: boolean;
  onClick?: () => void;
  classNames?: string;
};

function BorderCard({
  title = "",
  value,
  party = false,
  onClick = () => {},
  classNames = "",
}: Props) {

  const partyLookUp: any = {
    jp: `Jumhooree Party`,
    pnf: `People's National Front`,
    democrats: `The Democrats`,
    mdp: `Maldivian Democratic Party`,
    ppm: `Progressive Party of Maldives`,
    pnc: `People's National Congress`,
    mnp: `Maldives National Party`,
    adhaalath: "Adhaalath Party",
  };

  const partyColor: any = {
    jp: `#D83731`,
    pnf: `#D83731`,
    democrats: `#63A8E1`,
    mdp: `#FDE047`,
    ppm: `#D63590`,
    pnc: `#69D8CB`,
    mnp: `#263F90`,
    adhaalath: "#63C355",
  };

  return (
    <div
      className={`border border-[#292929] bg-transparent p-6 w-full flex flex-col gap-3 rounded-xl transition-all duration-500 ease-out ${classNames} ${
        !party ? "hover:border-[#A3A3A3]" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-3 items-center">
        {party ? (
          <div
            style={{ background: partyColor[title] }}
            className="h-3 w-3 rounded-full"
          ></div>
        ) : (
          <></>
        )}
        <p className="text-sm leading-5 font-medium text-[0#D6D6D6]">
          {party ? partyLookUp[title] : title}
        </p>
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}

export default BorderCard;
