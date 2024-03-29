import { motion } from "framer-motion";

type Props = {
  extraClasses?: string;
  tabs: any,
  onClick: (x : any) => void,
  activeTab: any,
  layoutId: string
}

function Tabs({ extraClasses = "", tabs = [], onClick = () => {}, activeTab , layoutId = "default_tabs" }: Props) {
  return (
    <div className={`border-150 flex space-x-3 border-b ${extraClasses}`}>
      {tabs &&
        tabs.length > 0 &&
        tabs.map((tab : any) => (
          <button
            key={tab.id}
            onClick={() => onClick(tab)}
            className={`${
              activeTab === tab.id ? "text-900" : "hover:text-gray/60"
            } text-500 relative py-2.5 text-center text-sm font-medium leading-5 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute -bottom-0.5 left-0 right-0 m-auto h-[3px] w-full bg-zinc-900"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.name}
          </button>
        ))}
    </div>

  )
}

export default Tabs;