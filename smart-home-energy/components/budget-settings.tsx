"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"

const formSchema = z.object({
  dailyBudget: z.coerce.number().min(1, {
    message: "Daily budget must be at least 1 kWh.",
  }),
  monthlyBudget: z.coerce.number().min(30, {
    message: "Monthly budget must be at least 30 kWh.",
  }),
  alertThreshold: z.coerce.number().min(50).max(100),
  emailAlerts: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
})

const usageData = [
  { day: "1", usage: 6.2, budget: 8 },
  { day: "2", usage: 7.1, budget: 8 },
  { day: "3", usage: 6.5, budget: 8 },
  { day: "4", usage: 5.8, budget: 8 },
  { day: "5", usage: 8.2, budget: 8 },
  { day: "6", usage: 7.5, budget: 8 },
  { day: "7", usage: 6.9, budget: 8 },
  { day: "8", usage: 7.3, budget: 8 },
  { day: "9", usage: 8.1, budget: 8 },
  { day: "10", usage: 7.8, budget: 8 },
  { day: "11", usage: 6.5, budget: 8 },
  { day: "12", usage: 5.9, budget: 8 },
  { day: "13", usage: 6.7, budget: 8 },
  { day: "14", usage: 7.2, budget: 8 },
  { day: "15", usage: 8.0, budget: 8 },
]

export function BudgetSettings() {
  const [showBudgetPreview, setShowBudgetPreview] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyBudget: 8,
      monthlyBudget: 240,
      alertThreshold: 80,
      emailAlerts: false,
      pushNotifications: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Budget settings updated",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="space-y-8">
      {showBudgetPreview && (
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Actual Usage</CardTitle>
            <CardDescription>Your energy usage compared to your daily budget.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[200px]">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={usageData}
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
                                  label: "Usage",
                                  value: `${payload[0].value} kWh`,
                                  color: "#0ea5e9",
                                },
                                {
                                  label: "Budget",
                                  value: `${payload[1].value} kWh`,
                                  color: "#f97316",
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
                    />
                    <Line type="monotone" dataKey="budget" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="dailyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Energy Budget (kWh)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      step={0.1}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        const monthlyValue = Number.parseFloat(e.target.value) * 30
                        form.setValue("monthlyBudget", monthlyValue)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Set your target daily energy consumption.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Energy Budget (kWh)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={30}
                      step={1}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        const dailyValue = Number.parseFloat(e.target.value) / 30
                        form.setValue("dailyBudget", dailyValue)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Your estimated monthly energy budget.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="alertThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Threshold ({field.value}%)</FormLabel>
                <FormControl>
                  <Slider
                    min={50}
                    max={100}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => {
                      field.onChange(vals[0])
                    }}
                  />
                </FormControl>
                <FormDescription>Get alerted when you reach this percentage of your daily budget.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="emailAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Alerts</FormLabel>
                    <FormDescription>Receive alerts about your energy usage via email.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Push Notifications</FormLabel>
                    <FormDescription>Receive alerts about your energy usage via push notifications.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  )
}

