"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Plus, MapPin, Clock, Users, Star, DollarSign, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for courts
const courts = [
  {
    id: 1,
    name: "Elite Basketball Court",
    location: "Downtown Sports Complex, 123 Main St",
    size: 2800,
    images: ["/modern-gym-interior.png"],
    amenities: ["Air Conditioning", "Sound System", "Scoreboard", "Parking"],
    genderAcceptance: "All",
    openingTime: "06:00",
    closingTime: "22:00",
    pricePerHour: 75,
    rating: 4.8,
    totalBookings: 156,
    status: "Active",
  },
  {
    id: 2,
    name: "Premium Tennis Court",
    location: "Riverside Tennis Club, 456 Oak Ave",
    size: 2100,
    images: ["/sports-complex-with-pool.png"],
    amenities: ["Lighting", "Net System", "Seating Area", "Water Station"],
    genderAcceptance: "All",
    openingTime: "07:00",
    closingTime: "21:00",
    pricePerHour: 60,
    rating: 4.6,
    totalBookings: 89,
    status: "Active",
  },
  {
    id: 3,
    name: "Multi-Purpose Court",
    location: "Community Center, 789 Pine St",
    size: 3200,
    images: ["/women-yoga-studio.png"],
    amenities: ["Flexible Layout", "Equipment Storage", "Changing Rooms"],
    genderAcceptance: "All",
    openingTime: "08:00",
    closingTime: "20:00",
    pricePerHour: 45,
    rating: 4.4,
    totalBookings: 67,
    status: "Active",
  },
]

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
]

const weekDays = [
  { date: "08", day: "Tue" },
  { date: "09", day: "Wed" },
  { date: "10", day: "Thu" },
  { date: "11", day: "Fri" },
  { date: "12", day: "Sat" },
  { date: "13", day: "Sun" },
  { date: "14", day: "Mon" },
]

export default function CourtsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [slotsDialogOpen, setSlotsDialogOpen] = useState(false)
  const [selectedCourt, setSelectedCourt] = useState<any>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ time: string; day: string } | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [manageDialogOpen, setManageDialogOpen] = useState(false)

  const filteredCourts = courts.filter((court) => {
    const matchesSearch =
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || court.status.toLowerCase() === filterStatus
    return matchesSearch && matchesStatus
  })

  const openSlotsDialog = (court: any) => {
    setSelectedCourt(court)
    setSlotsDialogOpen(true)
  }

  const handleSlotSelect = (time: string, day: string) => {
    setSelectedSlot({ time, day })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Listed Courts</h1>
          <p className="text-muted-foreground">Manage your sports courts and facilities</p>
        </div>
        <Link href="/courts/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Court
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courts</p>
                <p className="text-2xl font-bold">{courts.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Courts</p>
                <p className="text-2xl font-bold">{courts.filter((c) => c.status === "Active").length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{courts.reduce((sum, c) => sum + c.totalBookings, 0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courts by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <Card key={court.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={court.images[0] || "/placeholder.svg"} alt={court.name} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={court.status === "Active" ? "default" : "secondary"}>{court.status}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{court.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{court.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{court.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {court.openingTime} - {court.closingTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size: {court.size} sq ft</span>
                <span className="font-semibold text-primary">${court.pricePerHour}/hour</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {court.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {court.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{court.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/courts/${court.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => openSlotsDialog(court)}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Slots
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourts.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No courts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search criteria" : "Get started by adding your first court"}
          </p>
          <Link href="/courts/new">
            <Button>Add Your First Court</Button>
          </Link>
        </div>
      )}

      <Dialog open={slotsDialogOpen} onOpenChange={setSlotsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {selectedCourt?.name} - Time Slots
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Week Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
                Previous Week
              </Button>
              <span className="font-medium">December 2024</span>
              <Button variant="outline" size="sm">
                Next Week
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Time Slots Grid */}
            <div className="border rounded-lg overflow-hidden">
              {/* Header with days */}
              <div className="grid grid-cols-8 bg-muted/50">
                <div className="p-3 font-medium border-r">Time</div>
                {weekDays.map((day) => (
                  <div key={day.date} className="p-3 text-center border-r last:border-r-0">
                    <div className="font-medium">{day.date}</div>
                    <div className="text-sm text-muted-foreground">{day.day}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 border-t">
                  <div className="p-3 font-medium border-r bg-muted/30">{time}</div>
                  {weekDays.map((day) => (
                    <div key={`${time}-${day.date}`} className="border-r last:border-r-0">
                      <button
                        className={`w-full h-16 p-2 hover:bg-primary/10 transition-colors border-0 ${
                          selectedSlot?.time === time && selectedSlot?.day === day.date
                            ? "bg-primary/20 ring-2 ring-primary"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => handleSlotSelect(time, day.date)}
                      >
                        <div className="text-lg font-semibold text-primary">{selectedCourt?.pricePerHour || 250}</div>
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Action buttons when slot is selected */}
            {selectedSlot && (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">
                    Selected: {selectedSlot.time} on {weekDays.find((d) => d.date === selectedSlot.day)?.day}{" "}
                    {selectedSlot.day}
                  </p>
                  <p className="text-sm text-muted-foreground">Price: ${selectedCourt?.pricePerHour || 250}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setBookingDialogOpen(true)}>
                    Book Slot
                  </Button>
                  <Button variant="outline" onClick={() => setManageDialogOpen(true)}>
                    Manage Slot
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Time Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p>
                <strong>Court:</strong> {selectedCourt?.name}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot?.time}
              </p>
              <p>
                <strong>Date:</strong> {weekDays.find((d) => d.date === selectedSlot?.day)?.day} {selectedSlot?.day}
              </p>
              <p>
                <strong>Price:</strong> ${selectedCourt?.pricePerHour || 250}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer Name</label>
              <Input placeholder="Enter customer name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input placeholder="Enter contact number" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90">Confirm Booking</Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setBookingDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Time Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p>
                <strong>Court:</strong> {selectedCourt?.name}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot?.time}
              </p>
              <p>
                <strong>Date:</strong> {weekDays.find((d) => d.date === selectedSlot?.day)?.day} {selectedSlot?.day}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price for this slot</label>
              <Input type="number" defaultValue={selectedCourt?.pricePerHour || 250} placeholder="Enter price" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90">Save Changes</Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setManageDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
