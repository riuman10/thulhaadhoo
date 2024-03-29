import React from 'react'
import { agentNavigationLinks } from '@/data/Global';
import { useRouter } from "next/router";
import LogoutIcon from '../icons/Logout';

type Props = {
  handleSignOut: () => void
}

function DesktopNavigation({
  handleSignOut = () => {}
}: Props) {
  const router = useRouter();
  return (
    <>
      <div className="w-full bg-[#0F0F0F] h-screen py-2 flex flex-col justify-between px-4">
        <div className="flex flex-1 flex-col gap-2 mt-6 overflow-y-scroll">
          {agentNavigationLinks.map((item: any) => (
            <Link
              key={item.id}
              name={item.name}
              icon={item.icon}
              onClick={() => {
                router.push(item.link);
              }}
              selected={router.pathname == item.link}
              dashboard={router.pathname == "/dashboard" ? true : false}
            />
          ))}
        </div>
        <div
          className="flex justify-between bg-[#292929] mb-4 px-4 py-3 rounded-md cursor-pointer"
          onClick={handleSignOut}
        >
          <p className="text-sm">Sign out</p>
          <LogoutIcon />
        </div>
      </div>
    </>
  )
}

const Link = ({ name, onClick, selected, dashboard, icon = "Home" }: any) => {
  return (
    <div
      className={`group cursor-pointer px-2 py-1 rounded-lg transition-all duration-300 ease-out ${
        selected ? "bg-[#292929] shadow-md " : " hover:bg-[#292929]"
      } ${selected && dashboard ? "" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        <div className="w-12">{icon}</div>
        <p
          className={`whitespace-nowrap pt-[2px] font-medium w-[200px] md:text-sm text-xs truncate ${
            selected ? " text-white" : "group-hover:text-white text-gray-300"
          }`}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
export default DesktopNavigation