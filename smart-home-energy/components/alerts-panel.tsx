"use client"

import { useState } from "react"
import { AlertTriangle, Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AlertType = "warning" | "info" | "success"

interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  device: string
  timestamp: string
  read: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "High Energy Usage",
    message: "Your HVAC system is consuming more energy than usual.",
    device: "HVAC",
    timestamp: "Today, 10:23 AM",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Budget Threshold Reached",
    message: "You've reached 80% of your daily energy budget.",
    device: "Whole Home",
    timestamp: "Today, 9:15 AM",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Energy Saving Opportunity",
    message: "Your refrigerator door was left open for 5 minutes.",
    device: "Refrigerator",
    timestamp: "Yesterday, 8:30 PM",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Energy Saving Achievement",
    message: "You've reduced your energy consumption by 15% this week!",
    device: "Whole Home",
    timestamp: "Yesterday, 12:00 PM",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Device Maintenance",
    message: "Your HVAC filter needs to be replaced soon.",
    device: "HVAC",
    timestamp: "2 days ago",
    read: true,
  },
]

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [filter, setFilter] = useState<string>("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unread") return !alert.read
    return alert.type === filter
  })

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })))
  }

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
      case "success":
        return <Check className="h-5 w-5" />
    }
  }

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500"
      case "success":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter alerts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="warning">Warnings</SelectItem>
            <SelectItem value="info">Information</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No alerts to display</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className={`relative rounded-lg border p-4 ${!alert.read ? "bg-muted/50" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getAlertColor(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    {!alert.read && (
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                    <span>{alert.device}</span>
                    <Separator orientation="vertical" className="h-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!alert.read && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markAsRead(alert.id)}>
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => dismissAlert(alert.id)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

