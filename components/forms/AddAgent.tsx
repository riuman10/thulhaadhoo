import React from 'react'
import { useState , useEffect} from 'react';
import Input from '../inputs/Input';
import { supabase } from '@/supabase';
type Props = {
  item: any;
  confirm?: boolean;
  setConfirm?: (value: boolean) => void;
  onSuccess: (value: any) => void;
}

function AddAgent({
  item = false,
  confirm = false,
  setConfirm = () => {},
  onSuccess = () => {},
}: Props) {
  const [fullName , setFullName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");


  const addAgent = async () => {
    const { data } = await supabase
      .from("agents")
      .insert({
        full_name: fullName,
        mobile_number : mobile,
        agent_name : fullName.toLowerCase().replace(/\s+/g, '_')
      })
      .select();
    data ? onSuccess(data) : null;
  };


  const updateAgent = async () => {
    const { data } = await supabase
      .from("agents")
      .update({
        full_name: fullName,
        mobile_number : mobile,
        agent_name : fullName.toLowerCase().replace(/\s+/g, '_')
      })
      .eq("id", item.id)
      .select();
    data ? onSuccess(data) : null;
  };

  useEffect(() => {
    if (!item) return;
    setMobile(item.mobile_number);
    setFullName(item.full_name);
    console.log(item);
  }, [item]);

  useEffect(() => {
    if (!confirm) return;
    item ? updateAgent() : addAgent();
    setConfirm(false);
  }, [confirm]);

  return (
    <div className='space-y-2 px-4 mt-4'>
      <div className="space-y-1.5">
          <p className={`text-gray-700 text-sm pb-1.5 font-medium`}>Name</p>
          <Input
          placeholder='type...'
          value={fullName}
          onChange={(value) => setFullName(value)}
          />
        </div>

        <div className="space-y-1.5">
          <p className={`text-gray-700 text-sm pb-1.5 font-medium`}>Mobile Number</p>
          <Input
          placeholder='type...'
          value={mobile}
          onChange={(value) => setMobile(value)}
          />
        </div>
    </div>
  )
}

export default AddAgent