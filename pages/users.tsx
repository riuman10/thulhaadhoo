import { useState, useEffect } from "react";
import Header from "@/components/global/Header";
import { supabase } from "@/supabase";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
const VirtualTable = dynamic(() => import("@/components/tables/VirtualTable"));
const Modal = dynamic(() => import("@/components/global/Modal"));
const CreateUser = dynamic(() => import("@/components/users/CreateUser"));

type Props = {};

function Users({}: Props) {
  const [users, setUsers] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(false);

  const fetchUsers = async () => {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  };

  const TableFields = [
    {
      id: "first_name",
      name: "First name",
    },
    {
      id: "last_name",
      name: "Last name",
    },
    {
      id: "email_address",
      name: "Email",
    },
    {
      id: "role",
      name: "User Role",
    },
    {
      id: "id_card",
      name: "ID Card",
    },
    {
      id: "island",
      name: "Island",
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setOpen(true)}
        className="text-white bg-[#292929] py-2 px-2  text-sm rounded-lg flex items-center gap-2"
      >
        <Plus size={14} />
        <p>Add</p>
      </button>
      <Header title={"Users"} />

      <VirtualTable
        data={users}
        tableFields={TableFields}
        onRowClick={(x: any) => {
          setOpen(true);
          setSelectedUser(x);
        }}
      />

      <Modal
        drawerOpen={open}
        onClose={() => setOpen(false)}
        title="Create user"
      >
        <CreateUser
          item={selectedUser}
          onSuccess={(x) => {
            setUsers([...users, x]);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default Users;
