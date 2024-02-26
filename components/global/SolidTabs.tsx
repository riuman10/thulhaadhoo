import { motion } from "framer-motion";

type Props = {
  tabs: any;
  extraClasses?: string;
  onClick: (tab: any) => void;
  activeTab: any;
};

function SolidTabs({
  tabs,
  extraClasses = "",
  onClick = () => {},
  activeTab,
}: Props) {
  return (
    <div
      className={`bg-[#212121] flex w-min space-x-1 rounded-xl p-1 ${extraClasses}`}
    >
      {tabs &&
        tabs.length > 0 &&
        tabs.map((tab: any, index: number) => (
          <button
            key={tab.id}
            onClick={() => onClick(tab)}
            className="relative whitespace-nowrap rounded-full p-2 px-3 py-1.5 capitalize"
          >
            <span className="relative z-10 flex items-center font-medium">
              <span
                className={`text-sm ${
                  activeTab === tab.id ? "text-gray-900" : " text-white"
                }`}
              >
                {tab.label || tab.name}
              </span>
            </span>
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-[#EDEDED] shadow-md"
                style={{ borderRadius: "8px" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
    </div>
  );
}

export default SolidTabs;
