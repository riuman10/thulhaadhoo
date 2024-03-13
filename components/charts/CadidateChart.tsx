import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
type Props = {
  series: any;
};

function CadidateChart({ series = [] }: Props) {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart data={series}>
        <Bar dataKey="count" fill="#8884d8" barSize={30} radius={5} />
        <XAxis dataKey="voting_for" tickLine={false} stroke="#737373" />
        <YAxis tickLine={false} stroke="#737373" />
        <CartesianGrid opacity={0.1} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CadidateChart;

const CustomTooltip = ({ active, payload, label }: any) => {
  let partyName = payload[0]?.payload?.voting_for;
  let percentage = payload[0]?.payload?.percentage;
  if (active && payload && payload.length) {
    return (
      <div className="bg-black px-4 py-2 rounded-xl flex items-center gap-3">
        <p className="text-white uppercase">{`${partyName} : ${payload[0].value}`}</p>
        <p>|</p>
        <p className="text-white uppercase">{`${percentage}%`}</p>
      </div>
    );
  }

  return null;
};
