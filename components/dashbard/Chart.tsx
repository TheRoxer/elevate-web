"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";

const data = [
  {
    name: "Mon",
    average: 400,
    today: 240,
  },
  {
    name: "Tue",
    average: 300,
    today: 139,
  },
  {
    name: "Wed",
    average: 200,
    today: 980,
  },
  {
    name: "Thu",
    average: 278,
    today: 390,
  },
  {
    name: "Fri",
    average: 189,
    today: 480,
  },
  {
    name: "Sat",
    average: 239,
    today: 380,
  },
  {
    name: "Sun",
    average: 349,
    today: 430,
  },
];

export default function Chart() {
  return (
    <div>
      <div className="h-[calc((100vh-57px)/2-9rem)] ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            width={3000}
            margin={{
              top: 15,
              right: 30,
              left: 35,
              bottom: 55,
            }}
          >
            {/* Grid for better readability */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--muted-foreground))"
              opacity={0.2}
              vertical={false}
            />

            {/* X-Axis with time labels */}
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            {/* Y-Axis with income values */}
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            >
              <Label
                value="Income ($)"
                angle={-90}
                position="insideLeft"
                style={{
                  textAnchor: "middle",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
              />
            </YAxis>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Average
                          </span>
                          <span className="font-bold text-muted-foreground">
                            ${payload[0].value}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Today
                          </span>
                          <span className="font-bold">${payload[1].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="average"
              name="Average Income"
              activeDot={{
                r: 6,
                style: { fill: "var(--theme-primary)", opacity: 0.25 },
              }}
              style={
                {
                  stroke: "var(--theme-primary)",
                  opacity: 0.25,
                  "--theme-primary": `hsl(263, 70%, 50%)`,
                } as React.CSSProperties
              }
            />
            <Line
              type="monotone"
              dataKey="today"
              name="Daily Income"
              strokeWidth={2}
              activeDot={{
                r: 8,
                style: { fill: "var(--theme-primary)" },
              }}
              style={
                {
                  stroke: "var(--theme-primary)",
                  "--theme-primary": `hsl(263, 70%, 50%)`,
                } as React.CSSProperties
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
