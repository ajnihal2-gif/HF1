"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  DollarSign,
  User,
  Phone,
  ArrowLeft,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Morning Yoga Session",
    image: "/placeholder.svg?height=200&width=300",
    startDate: "2024-01-15",
    startTime: "07:00",
    endDate: "2024-01-15",
    endTime: "08:30",
    location: "Downtown Fitness Center",
    genderAcceptance: "All",
    maxParticipants: 25,
    currentParticipants: 18,
    about:
      "Start your day with a rejuvenating yoga session designed for all skill levels. Focus on breathing, flexibility, and mindfulness.",
    rules: "Bring your own mat, arrive 10 minutes early, no late entries allowed",
    amenities: ["Yoga Mats Available", "Water Station", "Changing Rooms", "Parking"],
    organizerName: "Sarah Johnson",
    contactInfo: "+1 (555) 123-4567",
    pricePerAttendee: 25,
    status: "upcoming",
  },
  {
    id: 2,
    title: "HIIT Training Bootcamp",
    image: "/placeholder.svg?height=200&width=300",
    startDate: "2024-01-16",
    startTime: "18:00",
    endDate: "2024-01-16",
    endTime: "19:00",
    location: "Outdoor Sports Complex",
    genderAcceptance: "All",
    maxParticipants: 20,
    currentParticipants: 15,
    about:
      "High-intensity interval training session to boost your metabolism and build strength. Perfect for all fitness levels.",
    rules: "Wear appropriate workout attire, bring water bottle, medical clearance required for heart conditions",
    amenities: ["Equipment Provided", "First Aid", "Parking", "Showers"],
    organizerName: "Mike Rodriguez",
    contactInfo: "+1 (555) 987-6543",
    pricePerAttendee: 35,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Swimming Competition",
    image: "/placeholder.svg?height=200&width=300",
    startDate: "2024-01-20",
    startTime: "09:00",
    endDate: "2024-01-20",
    endTime: "16:00",
    location: "Aquatic Center Pool",
    genderAcceptance: "All",
    maxParticipants: 50,
    currentParticipants: 42,
    about:
      "Annual swimming competition featuring multiple categories and age groups. Prizes for top performers in each category.",
    rules: "Registration closes 48 hours before event, valid swimming certification required, no refunds",
    amenities: ["Professional Timing", "Changing Rooms", "Spectator Seating", "Refreshments", "Parking"],
    organizerName: "Lisa Chen",
    contactInfo: "+1 (555) 456-7890",
    pricePerAttendee: 50,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Nutrition Workshop",
    image: "/placeholder.svg?height=200&width=300",
    startDate: "2024-01-12",
    startTime: "14:00",
    endDate: "2024-01-12",
    endTime: "16:00",
    location: "Community Health Center",
    genderAcceptance: "All",
    maxParticipants: 30,
    currentParticipants: 30,
    about:
      "Learn about proper nutrition for fitness goals, meal planning, and healthy eating habits from certified nutritionists.",
    rules: "Notebook recommended, no food allergies restrictions, interactive session",
    amenities: ["Materials Provided", "Sample Foods", "Take-home Guides", "Parking"],
    organizerName: "Dr. Amanda White",
    contactInfo: "+1 (555) 321-0987",
    pricePerAttendee: 40,
    status: "completed",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockEvents)[0] | null>(null)

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600">Manage and organize fitness events</p>
          </div>
        </div>
        <Link href="/events/new">
          <Button className="bg-[#33A040] hover:bg-[#2d8f39]">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
              <Badge className={`absolute top-2 right-2 ${getStatusColor(event.status)}`}>{event.status}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-600 gap-4">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(event.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {event.startTime}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {event.currentParticipants}/{event.maxParticipants} participants
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />${event.pricePerAttendee} per attendee
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {event.organizerName}
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{selectedEvent?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                      <div className="space-y-4">
                        <img
                          src={selectedEvent.image || "/placeholder.svg"}
                          alt={selectedEvent.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Event Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                {new Date(selectedEvent.startDate).toLocaleDateString()} -{" "}
                                {new Date(selectedEvent.endDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {selectedEvent.startTime} - {selectedEvent.endTime}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {selectedEvent.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {selectedEvent.currentParticipants}/{selectedEvent.maxParticipants} participants
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />${selectedEvent.pricePerAttendee} per attendee
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Organizer</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {selectedEvent.organizerName}
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {selectedEvent.contactInfo}
                              </div>
                              <div>
                                <span className="font-medium">Gender: </span>
                                {selectedEvent.genderAcceptance}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">About Event</h4>
                          <p className="text-sm text-gray-600">{selectedEvent.about}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Rules & Regulations</h4>
                          <p className="text-sm text-gray-600">{selectedEvent.rules}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedEvent.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Link href={`/events/${event.id}/edit`}>
                  <Button size="sm" className="bg-[#33A040] hover:bg-[#2d8f39]">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first event"}
          </p>
          <Link href="/events/new">
            <Button className="bg-[#33A040] hover:bg-[#2d8f39]">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
