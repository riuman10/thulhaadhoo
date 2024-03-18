import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/global/Header";
import VirtualTable from "@/components/tables/VirtualTable";
import { supabase } from "@/supabase";
import { AllIslandsFields } from "@/data/Global";
import { useRouter } from "next/router";

type Props = {};

function Islands({}: Props) {
  const [data, setData] = useState<any>();
  const router = useRouter();

  const fetchIslands = async () => {
    const { data } = await supabase.from(`dhaairaa_all_count`).select("*");
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchIslands();
  }, []);

  return (
    <div className="space-y-8">
      <Header title="Islands" />

      <VirtualTable
        tableFields={AllIslandsFields}
        data={data}
        onRowClick={(item: any) => {
          console.log(item);
          router.push(`islands/${item.island}`);
        }}
      />
    </div>
  );
}

export default Islands;
