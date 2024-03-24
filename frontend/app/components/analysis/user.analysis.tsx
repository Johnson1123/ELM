import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const UserAnalysis = (props: Props) => {
  const dummyData = [
    {
      name: "Jan",
      uv: 4000,
    },
    {
      name: "Feb",
      uv: 3000,
    },
    {
      name: "Mar",
      uv: 2000,
    },
    {
      name: "April",
      uv: 2780,
    },
    {
      name: "June",
      uv: 1890,
    },
    {
      name: "July",
      uv: 2390,
    },
    {
      name: "August",
      uv: 3490,
    },
  ];
  return (
    <div>
      <div className="w-full h-[50vh]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} width={500} height={400}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalysis;
