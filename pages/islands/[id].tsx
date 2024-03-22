import React from "react";
import { useEffect, useState } from "react";
import { TableFields, searchByArr, D2DTableFields } from "@/data/Global";
import { supabase } from "@/supabase";
import VirtualTable from "@/components/tables/VirtualTable";
import { useParams } from "next/navigation";
import Input from "@/components/inputs/Input";
import ChevronDown from "@/components/icons/ChevronDown";
import { IslandTabs } from "@/data/TabsData";
import Tabs from "@/components/global/Tabs";
import SolidTabs from "@/components/global/SolidTabs";
import Modal from "@/components/global/Modal";
import CallCenter from "@/components/forms/CallCenter";
import D2D from "@/components/forms/D2D";
type Props = {
  params: { slug: string };
};

const PAGE_SIZE = 25;

function IslandDetaila({}: Props) {
  const params = useParams<{ id: string; item: string }>();
  let decodedString = decodeURIComponent(
    params && params.id ? params?.id.replace(/\%20/g, " ") : ""
  );
  const [drawer, setDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState(IslandTabs[0].id);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<string>("house");
  const [selectedItem, setSelectedItem] = useState<any>(false);

  const fetchData = async () => {
    let query = supabase
      .from("thulhaadhoo_foshi")
      .select("*")
      .order("house_name", {
        ascending: true,
      });

    if (decodedString !== "") {
      query = query.eq("island", decodedString);
    }

    const { data } = await query.range(
      (pageNumber - 1) * PAGE_SIZE,
      pageNumber * PAGE_SIZE - 1
    );

    if (pageNumber === 1) {
      setData(data);
    } else {
      setData((prev: any) => [...prev, ...(data || [])]);
    }
  };

  const searchData = async (value: string) => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("thulhaadhoo_foshi")
        .select("*")
        .eq("island", decodedString)
        .textSearch(searchBy === "house" ? "house_name" : "full_name", value);
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      setSearch("");
      fetchData();
    }
  }, [searchBy]);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <div className="space-y-8">
      <p className="text-2xl font-medium text-gray-900">{decodedString}</p>
      <Tabs
        tabs={IslandTabs}
        onClick={(x) => setActive(x.id)}
        activeTab={active}
        layoutId="island_tab"
      />
      <div className="w-full flex items-center justify-between">
        <p></p>
        <div className="flex items-center gap-2">
          <SolidTabs
            tabs={searchByArr}
            activeTab={searchBy}
            onClick={(x) => setSearchBy(x.id)}
          />
          <Input
            placeholder={
              searchBy === "house" ? "Search by house..." : "Search by name..."
            }
            value={search}
            width="md:w-[350px] w-[250px] max-w-[350px]"
            containerClassNames="w-min"
            onChange={(value) => {
              setSearch(value);
              setTimeout(() => {
                value ? searchData(value) : fetchData();
              }, 1000);
            }}
          />
        </div>
      </div>
      <VirtualTable
        data={data}
        tableFields={active === "call_center" ? TableFields : D2DTableFields}
        onRowClick={(x: any) => {
          setSelectedItem(x);
          setDrawer(true);
        }}
      />
      {search ? (
        <></>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div
            className=" bg-white px-4 text-center mt-10 rounded-xl cursor-pointer py-2"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <ChevronDown />
          </div>
        </div>
      )}

      <Modal
        drawerOpen={drawer}
        onClose={() => setDrawer(false)}
        size="max-w-[450px]"
        title={selectedItem.full_name}
        btnText="Update"
      >
        {active === "call_center" ? (
          <CallCenter
            item={selectedItem}
            onSuccess={(item) => {
              let index = data.findIndex((x: any) => x.id === item[0].id);
              setData(data.with(index, item[0]));
              setDrawer(false);
            }}
          />
        ) : (
          <D2D
            item={selectedItem}
            onSuccess={(item) => {
              let index = data.findIndex((x: any) => x.id === item[0].id);
              setData(data.with(index, item[0]));
              setDrawer(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default IslandDetaila;
