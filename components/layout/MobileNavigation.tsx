import { createContext, useState, ReactNode } from "react";
import { NavigationLinks } from "@/data/Global";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoutIcon from "../icons/Logout";
import LogoutMobile from "../icons/LogoutMobile";
interface SidebarProps {
  children?: ReactNode;
  handleSignOut:() => void
}

interface SidebarContextType {
  expanded: boolean;
}

export default function Sidebar({ handleSignOut }: SidebarProps): JSX.Element {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-[#0F0F0F]">
      <div className="flex flex-col gap-2 mt-6 overflow-y-scroll">
        {NavigationLinks.map((item: any) => (
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
          className=" bg-[#292929] mb-4 flex items-center justify-center py-2 px-1 rounded-md cursor-pointer mx-2"
          onClick={handleSignOut}
        >
          <LogoutMobile />
        </div>
    </div>
  );
}

const Link = ({ name, onClick, selected, dashboard, icon = "Home" }: any) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className={`group cursor-pointer rounded-lg flex items-center justify-center py-2 mx-2 transition-all duration-300 ease-out overflow-auto ${
        selected ? "bg-[#292929] shadow-md" : " hover:bg-[#292929]"
      }`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{icon}</TooltipTrigger>
            <TooltipContent className="bg-[#292929] absolute -right-[120px]">
              <p className="text-sm text-zinc-100 whitespace-nowrap">{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
