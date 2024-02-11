import React from "react";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
        <XAxis dataKey="voting_for" tickLine={false} stroke="white" />
        <YAxis tickLine={false} stroke="white" />
        <CartesianGrid opacity={0.1} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CadidateChart;

const CustomTooltip = ({ active, payload, label }: any) => {
  let partyName = payload[0]?.payload?.voting_for;
  if (active && payload && payload.length) {
    return (
      <div className="bg-black px-4 py-2 rounded-xl">
        <p className="text-white uppercase">{`${partyName} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
