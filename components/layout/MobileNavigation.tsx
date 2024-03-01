import { ReactNode } from "react";
import { agentNavigationLinks, adminNavigationLinks } from "@/data/Global";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoutMobile from "../icons/LogoutMobile";
import { useUserStore } from "@/store";
interface SidebarProps {
  children?: ReactNode;
  handleSignOut: () => void;
}

export default function Sidebar({ handleSignOut }: SidebarProps): JSX.Element {
  const router = useRouter();
  const { user } = useUserStore();

  const lookup: any = {
    agent: agentNavigationLinks,
    admin: adminNavigationLinks,
    super_admin : adminNavigationLinks,
    default: [],
  };
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-white">
      <div className="flex flex-col gap-2 mt-6 overflow-y-scroll">
        {lookup[user.role] &&
          lookup[user.role].map((item: any) => (
            <Link
              key={item.id}
              name={item.name}
              icon={item.icon}
              onClick={() => {
                router.push(item.link);
              }}
              selected={router.pathname == item.link}
            />
          ))}
      </div>
      <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
        <div
        className=" bg-[#292929] mb-1 flex items-center justify-center py-2 px-1 rounded-md cursor-pointer mx-2"
        onClick={handleSignOut}
      >
        <LogoutMobile />
      </div>
      <TooltipContent className="bg-zinc-900">
          <p className="text-sm text-zinc-100 whitespace-nowrap">Sign out</p>
        </TooltipContent>
        </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

type LinkProps = {
  icon: string;
  selected?: any;
  onClick?: () => void;
  name: string;
};

const Link = ({ name, onClick, selected, icon = "Home" }: LinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div
            className={`group cursor-pointer rounded-lg flex items-center justify-center py-2 mx-2 transition-all duration-300 ease-out overflow-auto ${
              selected ? "bg-zinc-900 shadow-md" : " hover:bg-zinc-900"
            }`}
            onClick={onClick}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-zinc-900">
          <p className="text-sm text-zinc-100 whitespace-nowrap">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
