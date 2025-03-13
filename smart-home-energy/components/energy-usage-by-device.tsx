"use client"

import { useState } from "react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const deviceData = [
  {
    name: "HVAC",
    usage: 12.5,
    color: "#0ea5e9",
  },
  {
    name: "Water Heater",
    usage: 8.2,
    color: "#f97316",
  },
  {
    name: "Refrigerator",
    usage: 5.7,
    color: "#8b5cf6",
  },
  {
    name: "Washer/Dryer",
    usage: 4.3,
    color: "#10b981",
  },
  {
    name: "Lighting",
    usage: 3.8,
    color: "#f59e0b",
  },
  {
    name: "TV & Electronics",
    usage: 3.2,
    color: "#ec4899",
  },
  {
    name: "Dishwasher",
    usage: 2.1,
    color: "#6366f1",
  },
  {
    name: "Other",
    usage: 5.4,
    color: "#94a3b8",
  },
]

export function EnergyUsageByDevice() {
  const [timeframe, setTimeframe] = useState("week")

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer className="h-[400px]">
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={deviceData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                unit=" kWh"
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={100}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        className="border-none bg-background p-2 shadow-md"
                        items={[
                          {
                            label: payload[0].payload.name,
                            value: `${payload[0].value} kWh`,
                            color: payload[0].payload.color,
                          },
                        ]}
                      />
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="usage" radius={[0, 4, 4, 0]} fill="currentColor" className="fill-primary" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </ChartContainer>
    </div>
  )
}

