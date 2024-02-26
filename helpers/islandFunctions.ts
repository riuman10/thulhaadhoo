import { colorLookup } from "@/data/Global";

const customOrder = [
  "shareef",
  "hannan",
  "kadde",
  "shafeeg",
  "afrah",
  "thahle",
  "adam",
];

const putCandidateColors = (temp : any) => {
  const items = temp &&
  temp.map((item : any) => ({
    ...item,
    fill: colorLookup[item.party] || "defaultColor",
  }));

  return items
}

function processCandidatesWithColors(temp: any) {
  const items = temp.map((item: any) => ({
    ...item,
    fill: colorLookup[item.voting_for] || "defaultColor",
  }));
  items.sort((a: any, b: any) => {
    const indexA = customOrder.indexOf(a.voting_for);
    const indexB = customOrder.indexOf(b.voting_for);
    return indexA - indexB;
  });
  return items;
}

export { processCandidatesWithColors , putCandidateColors};
