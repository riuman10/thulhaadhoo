import { supabase } from "@/supabase"
import { useState, useEffect } from "react"
import BorderCard from "../cards/BorderCard"

type Props = {}

export default function AllIslands({}: Props) {
  const [overview, setOverview] = useState<any>();

  const fetchData = async () => {
    const { data } = await supabase.from(`party_count`).select('*');
    let temp = data && data.filter((obj) => obj.party !== "unknown")
    setOverview(temp);
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {
          overview && overview.map((item : any , index : number) => (
            <BorderCard key = {index} title = {item.party} value = {item.party_count} />
          ))
        }
      </div>
      <p></p>
    </div>
  )
}