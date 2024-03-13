import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  series?: any;
  dataKey? : string;
};

function PartyChart({ series = [], dataKey = "" }: Props) {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <PieChart>
        <Pie
          data={series}
          dataKey={dataKey}
          nameKey={"party_name"}
          fill="#8884d8"
        />
        {/* <CartesianGrid /> */}
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PartyChart;

const CustomTooltip = ({ active, payload, label }: any) => {
  let partyName = payload[0]?.payload?.party;
  let color =  payload[0]?.payload?.fill;
  let percentage = payload[0]?.payload?.percentage;
  if (active && payload && payload.length) {
    return (
      <div className="bg-black px-4 py-2 rounded-xl flex items-center gap-3">
        <div className="w-3 h-3 rounded-full" style = {{background : color}}></div>
        <p className="text-white uppercase">{`${partyName} : ${payload[0].value}`}</p>
        <p>|</p>
        <p className="text-white uppercase">{`${percentage}%`}</p>

      </div>
    );
  }

  return null;
};
