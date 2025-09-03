"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Download, Calendar, TrendingUp, Users, DollarSign, Star, Building2, Clock, Target } from "lucide-react"

// Sample data for reports
const performanceData = [
  { month: "Jul", bookings: 156, revenue: 8400, newCustomers: 45, avgRating: 4.6 },
  { month: "Aug", bookings: 178, revenue: 9200, newCustomers: 52, avgRating: 4.7 },
  { month: "Sep", bookings: 189, revenue: 10100, newCustomers: 48, avgRating: 4.8 },
  { month: "Oct", bookings: 203, revenue: 11300, newCustomers: 61, avgRating: 4.7 },
  { month: "Nov", bookings: 234, revenue: 12800, newCustomers: 58, avgRating: 4.8 },
  { month: "Dec", bookings: 227, revenue: 12450, newCustomers: 55, avgRating: 4.9 },
]

const gymComparisonData = [
  {
    gym: "Downtown Fitness",
    bookings: 312,
    revenue: 18500,
    avgRating: 4.8,
    utilization: 78,
    growth: 12.5,
  },
  {
    gym: "Elite Sports Complex",
    revenue: 14200,
    bookings: 245,
    avgRating: 4.6,
    utilization: 65,
    growth: 8.3,
  },
  {
    gym: "Women's Wellness",
    bookings: 178,
    revenue: 8100,
    avgRating: 4.9,
    utilization: 82,
    growth: 15.2,
  },
]

const planPerformanceData = [
  { plan: "Daily Pass", bookings: 245, revenue: 6125, avgRating: 4.5, conversionRate: 12 },
  { plan: "Daily Pass with Trainer", bookings: 160, revenue: 10400, avgRating: 4.8, conversionRate: 25 },
  { plan: "Membership", bookings: 330, revenue: 24800, avgRating: 4.7, conversionRate: 68 },
]

const peakHoursData = [
  { hour: "6 AM", bookings: 45 },
  { hour: "7 AM", bookings: 62 },
  { hour: "8 AM", bookings: 38 },
  { hour: "9 AM", bookings: 28 },
  { hour: "10 AM", bookings: 22 },
  { hour: "11 AM", bookings: 18 },
  { hour: "12 PM", bookings: 35 },
  { hour: "1 PM", bookings: 42 },
  { hour: "2 PM", bookings: 25 },
  { hour: "3 PM", bookings: 20 },
  { hour: "4 PM", bookings: 30 },
  { hour: "5 PM", bookings: 55 },
  { hour: "6 PM", bookings: 68 },
  { hour: "7 PM", bookings: 52 },
  { hour: "8 PM", bookings: 35 },
  { hour: "9 PM", bookings: 25 },
]

const reportTypes = ["Monthly Summary", "Quarterly Review", "Annual Report", "Custom Range"]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Monthly Summary")

  const totalBookings = performanceData.reduce((sum, month) => sum + month.bookings, 0)
  const totalRevenue = performanceData.reduce((sum, month) => sum + month.revenue, 0)
  const totalNewCustomers = performanceData.reduce((sum, month) => sum + month.newCustomers, 0)
  const avgRating = performanceData.reduce((sum, month) => sum + month.avgRating, 0) / performanceData.length

  const currentMonth = performanceData[performanceData.length - 1]
  const previousMonth = performanceData[performanceData.length - 2]
  const bookingGrowth = ((currentMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100

  const generateReport = () => {
    // In real app, generate and download report
    console.log(`Generating ${selectedReport}...`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Business Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights on bookings, revenue, and performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />+{bookingGrowth.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />+{revenueGrowth.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNewCustomers}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Across all gyms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Bookings and revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "#22c55e",
                },
                revenue: {
                  label: "Revenue",
                  color: "#ef4444",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartContainer
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.name}:{" "}
                                {entry.dataKey === "revenue" ? `$${entry.value?.toLocaleString()}` : entry.value}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
                  <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Peak Hours Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Booking patterns throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "#22c55e",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartContainer
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p style={{ color: payload[0]?.color }}>Bookings: {payload[0]?.value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="bookings" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gym Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Gym Performance Comparison</CardTitle>
          <CardDescription>Key metrics across all gym locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gymComparisonData.map((gym) => (
              <div key={gym.gym} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="md:col-span-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {gym.gym}
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{gym.bookings}</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">${gym.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{gym.avgRating}</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center">
                  <Badge variant={gym.growth > 10 ? "default" : "secondary"}>+{gym.growth}% Growth</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{gym.utilization}% Utilization</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Performance Analysis</CardTitle>
          <CardDescription>Revenue and conversion rates by plan type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {planPerformanceData.map((plan) => (
              <div key={plan.plan} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{plan.plan}</h3>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{plan.bookings}</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">${plan.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{plan.avgRating}</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">{plan.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered business insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
              <Target className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary">Peak Hour Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Your busiest hours are 6-7 PM. Consider offering off-peak discounts to distribute demand and increase
                  overall capacity utilization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-700">Strong Growth Trend</h4>
                <p className="text-sm text-muted-foreground">
                  Women's Wellness Studio shows 15.2% growth with highest customer satisfaction. Consider expanding
                  similar programs to other locations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-700">Trainer Utilization</h4>
                <p className="text-sm text-muted-foreground">
                  Daily Pass with Trainer has high conversion rates but lower volume. Consider promotional campaigns to
                  increase awareness and bookings.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
