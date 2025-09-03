"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Building2,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const monthlyRevenueData = [
  { month: "Jul", revenue: 8400, target: 9000, bookings: 156 },
  { month: "Aug", revenue: 9200, target: 9500, bookings: 178 },
  { month: "Sep", revenue: 10100, target: 10000, bookings: 189 },
  { month: "Oct", revenue: 11300, target: 10500, bookings: 203 },
  { month: "Nov", revenue: 12800, target: 11000, bookings: 234 },
  { month: "Dec", revenue: 12450, target: 11500, bookings: 227 },
]

const allRevenueData = [
  // Gyms
  { type: "gym", name: "Downtown Fitness", revenue: 18500, percentage: 35, bookings: 312 },
  { type: "gym", name: "Elite Sports Complex", revenue: 14200, percentage: 27, bookings: 245 },
  { type: "gym", name: "Women's Wellness", revenue: 8100, percentage: 15, bookings: 178 },
  // Courts
  { type: "court", name: "Tennis Center Pro", revenue: 6800, percentage: 13, bookings: 156 },
  { type: "court", name: "Basketball Arena", revenue: 3200, percentage: 6, bookings: 89 },
  // Experts
  { type: "expert", name: "Sarah Johnson - Yoga", revenue: 1800, percentage: 3, bookings: 45 },
  { type: "expert", name: "Mike Chen - Personal Training", revenue: 1200, percentage: 2, bookings: 32 },
]

const allTransactions = [
  // Gym transactions
  {
    id: 1,
    customer: "Sarah Johnson",
    listingType: "gym",
    listingName: "Downtown Fitness Center",
    plan: "Daily Pass with Trainer",
    amount: 65,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    customer: "John Smith",
    listingType: "gym",
    listingName: "Elite Sports Complex",
    plan: "Daily Pass",
    amount: 35,
    date: "2024-01-15",
    status: "completed",
  },
  // Court transactions
  {
    id: 3,
    customer: "Emily Chen",
    listingType: "court",
    listingName: "Tennis Center Pro",
    plan: "Hourly Booking",
    amount: 45,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 4,
    customer: "David Wilson",
    listingType: "court",
    listingName: "Basketball Arena",
    plan: "Hourly Booking",
    amount: 35,
    date: "2024-01-14",
    status: "completed",
  },
  // Expert transactions
  {
    id: 5,
    customer: "Maria Garcia",
    listingType: "expert",
    listingName: "Sarah Johnson - Yoga",
    plan: "Online Session",
    amount: 40,
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: 6,
    customer: "Alex Thompson",
    listingType: "expert",
    listingName: "Mike Chen - Personal Training",
    plan: "Service at Home",
    amount: 80,
    date: "2024-01-13",
    status: "completed",
  },
]

const payoutData = [
  {
    id: 2,
    recipient: "Mike Chen",
    type: "expert",
    service: "Personal Training",
    amount: 800,
    commission: 20,
    netPayout: 640,
    status: "completed",
    dueDate: "2024-01-15",
    bookings: 16,
  },
  {
    id: 4,
    recipient: "Tennis Center Pro",
    type: "court",
    service: "Court Bookings",
    amount: 680,
    commission: 12,
    netPayout: 598.4,
    status: "completed",
    dueDate: "2024-01-18",
    bookings: 28,
  },
  {
    id: 5,
    recipient: "Alex Rodriguez",
    type: "expert",
    service: "Nutrition Consulting",
    amount: 320,
    commission: 15,
    netPayout: 272,
    status: "completed",
    dueDate: "2024-01-10",
    bookings: 8,
  },
  {
    id: 6,
    recipient: "Sarah Johnson",
    type: "expert",
    service: "Yoga Sessions",
    amount: 450,
    commission: 15,
    netPayout: 382.5,
    status: "completed",
    dueDate: "2024-01-20",
    bookings: 12,
  },
]

const timeRanges = ["Last 6 months", "Last 3 months", "Last month", "This month"]

export default function RevenuePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 6 months")

  const totalRevenue = 53800
  const totalTarget = 61500
  const totalBookings = 1187
  const averageBookingValue = 45.32
  const monthlyGrowth = -2.8

  const totalCompletedPayouts = 1914.5
  const totalProcessingPayouts = 980.9

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getListingTypeBadge = (type: string) => {
    switch (type) {
      case "gym":
        return "bg-green-100 text-green-800"
      case "court":
        return "bg-blue-100 text-blue-800"
      case "expert":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPayoutTypeColor = (type: string) => {
    switch (type) {
      case "gym":
        return "bg-green-100 text-green-800"
      case "court":
        return "bg-blue-100 text-blue-800"
      case "expert":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Revenue Tracking</h1>
          <p className="text-muted-foreground">Monitor your business financial performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />+{monthlyGrowth.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTarget > 0 ? ((totalRevenue / totalTarget) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              ${(totalRevenue - totalTarget).toLocaleString()} {totalRevenue > totalTarget ? "above" : "below"} target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">All listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageBookingValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per booking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trends</CardTitle>
            <CardDescription>Revenue vs targets over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#22c55e",
                },
                target: {
                  label: "Target",
                  color: "#94a3b8",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.name}: ${entry.value?.toLocaleString()}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stackId="1"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="2"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Plan Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan Type</CardTitle>
            <CardDescription>Distribution of revenue across plan types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#22c55e",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allRevenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="revenue"
                  >
                    {allRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${142 + index * 30}, 76%, ${36 + index * 10}%)`} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{payload[0]?.payload?.name}</p>
                            <p style={{ color: payload[0]?.color }}>Revenue: ${payload[0]?.value?.toLocaleString()}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {allRevenueData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(${142 + index * 30}, 76%, ${36 + index * 10}%)` }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ${item.revenue.toLocaleString()} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Location</CardTitle>
            <CardDescription>Performance comparison across all listings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#22c55e",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{payload[0]?.payload?.name}</p>
                            <p style={{ color: payload[0]?.color }}>Revenue: ${payload[0]?.value?.toLocaleString()}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.customer}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={getListingTypeBadge(transaction.listingType)} variant="secondary">
                        {transaction.listingType}
                      </Badge>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {transaction.listingName}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{transaction.plan}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-primary">${transaction.amount}</p>
                    <Badge className={getStatusColor(transaction.status)} variant="secondary">
                      {transaction.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Management Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Payout Management</h2>
            <p className="text-muted-foreground">Track and manage payments to service providers</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Process Payouts
          </Button>
        </div>

        {/* Payout Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${totalProcessingPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {payoutData.filter((p) => p.status === "processing").length} in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalCompletedPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {payoutData.filter((p) => p.status === "completed").length} completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payout Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Manage payments to trainers, experts, and partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payoutData.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{payout.recipient}</p>
                      <Badge className={getPayoutTypeColor(payout.type)} variant="secondary">
                        {payout.type}
                      </Badge>
                      <Badge className={getPayoutStatusColor(payout.status)} variant="secondary">
                        {payout.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payout.service}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{payout.bookings} bookings</span>
                      <span>Commission: {payout.commission}%</span>
                      <span>Due: {payout.dueDate}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Gross: ${payout.amount}</p>
                      <p className="text-lg font-bold text-primary">${payout.netPayout}</p>
                    </div>
                    {payout.status === "processing" && (
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
