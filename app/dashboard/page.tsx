"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const revenueData = [
  { month: "Jan", revenue: 8400, target: 9000 },
  { month: "Feb", revenue: 9200, target: 9500 },
  { month: "Mar", revenue: 10100, target: 10000 },
  { month: "Apr", revenue: 11300, target: 10500 },
  { month: "May", revenue: 12800, target: 11000 },
  { month: "Jun", revenue: 12450, target: 11500 },
]

const bookingData = [
  { day: "Mon", bookings: 45, capacity: 60 },
  { day: "Tue", bookings: 52, capacity: 60 },
  { day: "Wed", bookings: 38, capacity: 60 },
  { day: "Thu", bookings: 48, capacity: 60 },
  { day: "Fri", bookings: 58, capacity: 60 },
  { day: "Sat", bookings: 55, capacity: 60 },
  { day: "Sun", bookings: 42, capacity: 60 },
]

const calendarBookings = [
  {
    date: 1,
    bookings: [
      { type: "gym", name: "Downtown Fitness", time: "09:00", color: "bg-primary" },
      { type: "court", name: "Tennis Court A", time: "14:00", color: "bg-blue-500" },
    ],
  },
  {
    date: 3,
    bookings: [
      { type: "expert", name: "Dr. Lisa Park", time: "10:30", color: "bg-purple-500" },
      { type: "gym", name: "Elite Sports Center", time: "16:00", color: "bg-primary" },
    ],
  },
  { date: 5, bookings: [{ type: "court", name: "Basketball Court 1", time: "11:00", color: "bg-blue-500" }] },
  {
    date: 7,
    bookings: [
      { type: "gym", name: "Women's Wellness Hub", time: "08:00", color: "bg-primary" },
      { type: "expert", name: "Mike Chen", time: "15:30", color: "bg-purple-500" },
    ],
  },
  { date: 10, bookings: [{ type: "court", name: "Badminton Court 2", time: "13:00", color: "bg-blue-500" }] },
  {
    date: 12,
    bookings: [
      { type: "gym", name: "Downtown Fitness", time: "07:30", color: "bg-primary" },
      { type: "expert", name: "Sarah Johnson", time: "12:00", color: "bg-purple-500" },
      { type: "court", name: "Tennis Court A", time: "18:00", color: "bg-blue-500" },
    ],
  },
  { date: 15, bookings: [{ type: "gym", name: "Elite Sports Center", time: "09:30", color: "bg-primary" }] },
  { date: 18, bookings: [{ type: "expert", name: "Dr. Lisa Park", time: "14:30", color: "bg-purple-500" }] },
  {
    date: 20,
    bookings: [
      { type: "court", name: "Basketball Court 1", time: "10:00", color: "bg-blue-500" },
      { type: "gym", name: "Women's Wellness Hub", time: "17:00", color: "bg-primary" },
    ],
  },
  { date: 22, bookings: [{ type: "expert", name: "Mike Chen", time: "11:30", color: "bg-purple-500" }] },
  {
    date: 25,
    bookings: [
      { type: "gym", name: "Downtown Fitness", time: "08:30", color: "bg-primary" },
      { type: "court", name: "Tennis Court A", time: "16:30", color: "bg-blue-500" },
    ],
  },
  { date: 28, bookings: [{ type: "expert", name: "Sarah Johnson", time: "13:30", color: "bg-purple-500" }] },
]

const allListings = {
  gyms: ["Downtown Fitness", "Elite Sports Center", "Women's Wellness Hub"],
  courts: ["Tennis Court A", "Basketball Court 1", "Badminton Court 2"],
  experts: ["Sarah Johnson", "Mike Chen", "Dr. Lisa Park"],
}

const sampleActivities = [
  {
    id: 1,
    type: "gym",
    listing: "Downtown Fitness",
    activity: "New booking",
    details: "Sarah Johnson - Daily Pass with Trainer",
    time: "2 min ago",
    color: "bg-primary",
  },
  {
    id: 2,
    type: "court",
    listing: "Tennis Court A",
    activity: "Court booking",
    details: "Tennis session - 2 hours",
    time: "15 min ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    type: "expert",
    listing: "Dr. Lisa Park",
    activity: "Expert consultation",
    details: "Nutrition consultation - Online",
    time: "30 min ago",
    color: "bg-purple-500",
  },
  {
    id: 4,
    type: "gym",
    listing: "Elite Sports Center",
    activity: "Payment received",
    details: "Monthly membership - $89.99",
    time: "1 hour ago",
    color: "bg-green-500",
  },
  {
    id: 5,
    type: "court",
    listing: "Basketball Court 1",
    activity: "New review",
    details: "5 stars - Great court condition!",
    time: "2 hours ago",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    type: "expert",
    listing: "Mike Chen",
    activity: "Service completed",
    details: "Personal training - Service at home",
    time: "3 hours ago",
    color: "bg-purple-500",
  },
]

export default function DashboardPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)

  const stats = {
    totalListings: 9,
    activeBookings: 127,
    monthlyRevenue: 12450,
    avgRating: 4.8,
  }

  const generateCalendarDays = () => {
    const daysInMonth = 31
    const firstDayOfWeek = 2 // December 2024 starts on Sunday (0), but we want Monday first
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = calendarBookings.find((b) => b.date === day)?.bookings || []
      days.push({ date: day, bookings: dayBookings })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handleBookingClick = (booking: any, date: number) => {
    setSelectedBooking({
      ...booking,
      date: `December ${date}, 2024`,
      customer: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      duration: booking.type === "expert" ? "1 hour" : booking.type === "court" ? "2 hours" : "Full day access",
      price: booking.type === "expert" ? "$75" : booking.type === "court" ? "$45" : "$25",
      status: "Confirmed",
    })
    setIsBookingDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBookings}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-destructive" />
              -2.8% from target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              Based on 89 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue vs targets (Last 6 months)</CardDescription>
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
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    stroke="var(--color-target)"
                    fill="var(--color-target)"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="2"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Booking Patterns</CardTitle>
            <CardDescription>Daily bookings vs capacity (This week)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "#22c55e",
                },
                capacity: {
                  label: "Capacity",
                  color: "#94a3b8",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.name}: {entry.value}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="capacity" fill="var(--color-capacity)" fillOpacity={0.3} />
                  <Bar dataKey="bookings" fill="var(--color-bookings)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Calendar
              </CardTitle>
              <CardDescription>December 2024 - Click on bookings to view details</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Legend */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Gyms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Courts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Experts</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border rounded-lg overflow-hidden">
            {/* Days of week header */}
            <div className="grid grid-cols-7 bg-muted/50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="p-3 text-center font-medium border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <div key={index} className="min-h-[100px] border-r border-b last:border-r-0 p-2">
                  {day && (
                    <>
                      <div className="font-medium text-sm mb-2">{day.date}</div>
                      <div className="space-y-1">
                        {day.bookings.slice(0, 2).map((booking, bookingIndex) => (
                          <div
                            key={bookingIndex}
                            className={`text-xs p-1 rounded text-white ${booking.color} truncate cursor-pointer hover:opacity-80 transition-opacity`}
                            title={`${booking.name} - ${booking.time}`}
                            onClick={() => handleBookingClick(booking, day.date)}
                          >
                            {booking.time}
                          </div>
                        ))}
                        {day.bookings.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{day.bookings.length - 2} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.type === "gyms" ? "gym" : activity.type === "courts" ? "court" : "expert"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.listing} - {activity.details}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Complete information about this booking</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${selectedBooking.color} rounded-full`}></div>
                <div>
                  <h3 className="font-medium">{selectedBooking.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{selectedBooking.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{selectedBooking.duration}</p>
                </div>
                <div>
                  <p className="font-medium">Price</p>
                  <p className="text-muted-foreground">{selectedBooking.price}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Customer</p>
                  <p className="text-muted-foreground">{selectedBooking.customer}</p>
                </div>
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">{selectedBooking.phone}</p>
                  <p className="text-muted-foreground">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <Badge variant="outline" className="text-xs">
                    {selectedBooking.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
