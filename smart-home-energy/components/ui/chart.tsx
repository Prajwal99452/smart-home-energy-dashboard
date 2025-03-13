import { cn } from "@/lib/utils"
import * as React from "react"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("rounded-md border bg-card text-card-foreground p-4", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("w-full", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

interface ChartTooltipContentProps {
  items: { label: string; value: string; color: string }[]
  className?: string
}

const ChartTooltipContent = ({ items, className }: ChartTooltipContentProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between text-sm">
          <span className="font-medium">{item.label}</span>
          <span className="font-bold">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(({ className, ...props }, ref) => {
  return <div className={cn("flex items-center space-x-4", className)} ref={ref} {...props} />
})
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps {
  name: string
  color: string
}

const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm">{name}</span>
    </div>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, ...props }, ref) => {
  return <div className={cn("", className)} ref={ref} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }

