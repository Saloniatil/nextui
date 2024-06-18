"use client";
import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    visit: 1000,
    click: 400,
  },
  {
    name: "Page B",
    visit: 400,
    click: 220,
  },
  {
    name: "Page C",
    visit: 460,
    click: 700,
  },
  {
    name: "Page D",
    visit: 610,
    click: 270,
  },
  {
    name: "Page E",
    visit: 480,
    click: 20,
  },
  {
    name: "Page F",
    visit: 600,
    click: 20,
  },
  {
    name: "Page G",
    visit: 85,
    click: 24,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="click"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
