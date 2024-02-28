import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import { roles, Islands } from "@/data/Global";
import Input from "../inputs/Input";
import DropDown from "../global/DropDown";
import { useUserStore } from "@/store";
import { toast } from "sonner";

type Props = {
  item: any;
  confirm?: boolean;
  setConfirm?: (value: boolean) => void;
  onSuccess: (value: any) => void;
};

function CreateUser({
  item = false,
  confirm = false,
  setConfirm = () => {},
  onSuccess = () => {},
}: Props) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [idCard, setIdCard] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<any>(roles[0].id);
  const [island, setIsland] = useState<any>(Islands[0].id);

  const { user } = useUserStore();

  const signUpUser = async () => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { id: user?.id },
    });

    if (data) {
      createUser(data?.user?.id);
    }
  };

  const createUser = async (id: any) => {
    if (!id) return;
    const { data } = await supabase
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
        id_card: idCard,
        email_address: email,
        password: password,
        role: role ? role.id : "agent",
        island: island ? island.id : null,
      })
      .eq("id", id)
      .select();
    data ? onSuccess(data[0]) : null;
  };

  const handleValidation = () => {
    if (firstName && lastName && email && password && role) {
      signUpUser();
    } else {
      toast.error("Required fields are missing")
    }
  };
  useEffect(() => {
    if (!confirm) return;
    handleValidation();
    setConfirm(false);
  }, [confirm]);

  return (
    <div>
      <div className="space-y-8">
        <Input
          placeholder="type..."
          title="First Name"
          value={firstName}
          onChange={(value) => setFirstName(value)}
        />
        <Input
          placeholder="type..."
          title="Last Name"
          value={lastName}
          onChange={(value) => setLastName(value)}
        />
        <Input
          placeholder="type..."
          title="ID Card Number"
          value={idCard}
          onChange={(value) => setIdCard(value)}
        />
        <div className="flex flex-col gap-1">
          <p className={`text-700 text-sm pb-1.5 font-medium`}>Role</p>
          <DropDown
            items={roles}
            defaultSelected={role}
            onSelect={(obj) => {
              setRole(obj);
            }}
          />
        </div>

        {role.id === "agent" ? (
          <div className="flex flex-col gap-1">
            <p className={`text-700 text-sm pb-1.5 font-medium`}>Island</p>
            <DropDown
              items={Islands}
              defaultSelected={island}
              onSelect={(obj) => {
                setIsland(obj);
              }}
            />
          </div>
        ) : null}
        <Input
          placeholder="type..."
          title="Email"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <Input
          placeholder="type..."
          title="Password"
          value={password}
          onChange={(value) => setPassword(value)}
        />
      </div>
    </div>
  );
}

export default CreateUser;
