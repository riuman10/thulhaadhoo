import { colorLookup } from "@/data/Global";


function processCandidatesWithColors(temp : any) {
  const items = temp.map((item : any) => ({
    ...item,
    fill: colorLookup[item.voting_for] || "defaultColor",
  }));
  items.sort((a : any, b : any) => {
    if (a.voting_for === "Undecided") return -1;
    if (b.voting_for === "Undecided") return 1;
    return a.voting_for.localeCompare(b.voting_for);
  });

  return items;
}


export {processCandidatesWithColors}