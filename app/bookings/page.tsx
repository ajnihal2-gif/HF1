"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, MapPin, Clock, User, DollarSign, Phone, Mail, CheckCircle, XCircle } from "lucide-react"

const sampleBookings = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+1 (555) 123-4567",
    listingType: "gym",
    listingName: "Downtown Fitness Center",
    planType: "Daily Pass with Trainer",
    date: "2024-01-15",
    time: "09:00 AM",
    duration: "1 hour",
    price: 65,
    status: "confirmed",
    paymentStatus: "paid",
    trainerName: "Mike Rodriguez",
    notes: "First-time customer, focus on basic form and technique",
  },
  {
    id: 2,
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 (555) 987-6543",
    listingType: "court",
    listingName: "Tennis Court A",
    planType: "Hourly Booking",
    date: "2024-01-15",
    time: "06:30 AM",
    duration: "2 hours",
    price: 80,
    status: "confirmed",
    paymentStatus: "paid",
    notes: "Regular customer, prefers early morning sessions",
  },
  {
    id: 3,
    customerName: "Emily Chen",
    customerEmail: "emily.chen@email.com",
    customerPhone: "+1 (555) 456-7890",
    listingType: "expert",
    listingName: "Dr. Lisa Martinez - Nutritionist",
    planType: "Online Consultation",
    date: "2024-01-15",
    time: "07:00 PM",
    duration: "45 minutes",
    price: 120,
    status: "confirmed",
    paymentStatus: "paid",
    notes: "First consultation for meal planning",
  },
  {
    id: 4,
    customerName: "David Wilson",
    customerEmail: "david.w@email.com",
    customerPhone: "+1 (555) 234-5678",
    listingType: "gym",
    listingName: "Elite Sports Complex",
    planType: "Daily Pass with Trainer",
    date: "2024-01-16",
    time: "02:00 PM",
    duration: "1 hour",
    price: 65,
    status: "confirmed",
    paymentStatus: "paid",
    trainerName: "Lisa Thompson",
    notes: "Advanced training session, focus on strength building",
  },
  {
    id: 5,
    customerName: "Maria Garcia",
    customerEmail: "maria.g@email.com",
    customerPhone: "+1 (555) 345-6789",
    listingType: "court",
    listingName: "Basketball Court 1",
    planType: "Hourly Booking",
    date: "2024-01-16",
    time: "11:00 AM",
    duration: "3 hours",
    price: 90,
    status: "cancelled",
    paymentStatus: "refunded",
    notes: "Customer cancelled due to schedule conflict",
  },
  {
    id: 6,
    customerName: "Alex Thompson",
    customerEmail: "alex.t@email.com",
    customerPhone: "+1 (555) 567-8901",
    listingType: "expert",
    listingName: "James Wilson - Personal Trainer",
    planType: "Service at Home",
    date: "2024-01-17",
    time: "08:00 AM",
    duration: "1 hour",
    price: 150,
    status: "confirmed",
    paymentStatus: "paid",
    notes: "Home workout session, focus on cardio",
  },
]

const statusOptions = ["All Status", "confirmed", "cancelled"]
const paymentOptions = ["All Payments", "paid", "refunded"]
const listingTypeOptions = ["All Types", "gym", "court", "expert"]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPayment, setSelectedPayment] = useState("All Payments")
  const [selectedListingType, setSelectedListingType] = useState("All Types")
  const [selectedListingName, setSelectedListingName] = useState("All Names")
  const [bookings] = useState(sampleBookings)

  const getListingNames = () => {
    if (selectedListingType === "All Types") {
      return ["All Names", ...Array.from(new Set(bookings.map((b) => b.listingName)))]
    }
    return [
      "All Names",
      ...Array.from(new Set(bookings.filter((b) => b.listingType === selectedListingType).map((b) => b.listingName))),
    ]
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.listingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.planType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || booking.status === selectedStatus
    const matchesPayment = selectedPayment === "All Payments" || booking.paymentStatus === selectedPayment
    const matchesListingType = selectedListingType === "All Types" || booking.listingType === selectedListingType
    const matchesListingName = selectedListingName === "All Names" || booking.listingName === selectedListingName
    return matchesSearch && matchesStatus && matchesPayment && matchesListingType && matchesListingName
  })

  const handleListingTypeChange = (value: string) => {
    setSelectedListingType(value)
    setSelectedListingName("All Names")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getListingTypeColor = (type: string) => {
    switch (type) {
      case "gym":
        return "bg-primary/10 text-primary"
      case "court":
        return "bg-blue-100 text-blue-800"
      case "expert":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalBookings = filteredBookings.length
  const confirmedBookings = filteredBookings.filter((b) => b.status === "confirmed").length
  const totalRevenue = filteredBookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all bookings across gyms, courts, and experts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">Ready to go</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From paid bookings</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedListingType} onValueChange={handleListingTypeChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select listing type" />
          </SelectTrigger>
          <SelectContent>
            {listingTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "All Types" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedListingName} onValueChange={setSelectedListingName}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select specific name" />
          </SelectTrigger>
          <SelectContent>
            {getListingNames().map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPayment} onValueChange={setSelectedPayment}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {paymentOptions.map((payment) => (
              <SelectItem key={payment} value={payment}>
                {payment}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Booking Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(booking.status)}
                    {booking.customerName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {booking.listingName}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getListingTypeColor(booking.listingType)}>
                    {booking.listingType.charAt(0).toUpperCase() + booking.listingType.slice(1)}
                  </Badge>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  <Badge className={getPaymentColor(booking.paymentStatus)}>{booking.paymentStatus}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">${booking.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{booking.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Plan: {booking.planType}</p>
                {booking.trainerName && <p className="text-sm text-muted-foreground">Trainer: {booking.trainerName}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span>{booking.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span>{booking.customerPhone}</span>
                </div>
              </div>

              {booking.notes && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{booking.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {booking.status === "confirmed" && (
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Reschedule
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bookings found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
