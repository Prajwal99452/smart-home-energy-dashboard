"use client"

import { Activity, AlertTriangle, ArrowDown, ArrowUp, Check, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    device: "HVAC",
    event: "High usage detected",
    time: "10 minutes ago",
    type: "alert",
    icon: AlertTriangle,
    change: "+1.2 kW",
    direction: "up",
  },
  {
    id: 2,
    device: "Smart Thermostat",
    event: "Temperature adjusted",
    time: "25 minutes ago",
    type: "info",
    icon: Activity,
    change: "-0.4 kW",
    direction: "down",
  },
  {
    id: 3,
    device: "Washer",
    event: "Cycle completed",
    time: "1 hour ago",
    type: "success",
    icon: Check,
    change: "-0.8 kW",
    direction: "down",
  },
  {
    id: 4,
    device: "EV Charger",
    event: "Charging started",
    time: "2 hours ago",
    type: "info",
    icon: Activity,
    change: "+7.2 kW",
    direction: "up",
  },
  {
    id: 5,
    device: "Solar Panels",
    event: "Peak production",
    time: "3 hours ago",
    type: "success",
    icon: Check,
    change: "-4.5 kW",
    direction: "down",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  activity.type === "alert" ? "destructive" : activity.type === "success" ? "success" : "secondary"
                }
                className="h-8 w-8 rounded-full p-1"
              >
                <activity.icon className="h-4 w-4" />
              </Badge>
              <p className="text-sm font-medium leading-none">{activity.device}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{activity.time}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pl-10">{activity.event}</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {activity.direction === "up" ? (
              <ArrowUp className="h-4 w-4 text-destructive" />
            ) : (
              <ArrowDown className="h-4 w-4 text-emerald-500" />
            )}
            <span className={activity.direction === "up" ? "text-destructive" : "text-emerald-500"}>
              {activity.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

