"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    day: "Mon",
    usage: 6.2,
    average: 5.8,
  },
  {
    day: "Tue",
    usage: 7.1,
    average: 5.9,
  },
  {
    day: "Wed",
    usage: 6.5,
    average: 6.0,
  },
  {
    day: "Thu",
    usage: 5.8,
    average: 5.9,
  },
  {
    day: "Fri",
    usage: 8.2,
    average: 6.1,
  },
  {
    day: "Sat",
    usage: 7.5,
    average: 6.2,
  },
  {
    day: "Sun",
    usage: 6.9,
    average: 6.0,
  },
]

export function Overview() {
  return (
    <ChartContainer className="h-[300px]">
      <ChartLegend className="mb-4">
        <ChartLegendItem name="Your Usage" color="#0ea5e9" />
        <ChartLegendItem name="Neighborhood Average" color="#94a3b8" />
      </ChartLegend>
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} unit=" kWh" />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      className="border-none bg-background p-2 shadow-md"
                      items={[
                        {
                          label: "Your Usage",
                          value: `${payload[0].value} kWh`,
                          color: "#0ea5e9",
                        },
                        {
                          label: "Neighborhood Average",
                          value: `${payload[1].value} kWh`,
                          color: "#94a3b8",
                        },
                      ]}
                    />
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#0ea5e9"
              strokeWidth={2}
              fill="#0ea5e9"
              fillOpacity={0.2}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="average"
              stroke="#94a3b8"
              strokeWidth={2}
              fill="#94a3b8"
              fillOpacity={0.1}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}

