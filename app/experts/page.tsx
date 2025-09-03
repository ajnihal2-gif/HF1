"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MapPin, Clock, Star, Users } from "lucide-react"
import Link from "next/link"

// Mock data for experts
const mockExperts = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Downtown Fitness Center",
    description:
      "Certified personal trainer with 8+ years of experience specializing in strength training and weight loss.",
    service: "Personal Training",
    rating: 4.9,
    reviews: 127,
    image: "/gym-owner-avatar.png",
    genderAcceptance: "All",
    hours: "6:00 AM - 10:00 PM",
    serviceTypes: ["online", "service-at-center"],
    specialties: ["Strength Training", "Weight Loss", "Nutrition"],
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "Yoga Studio Plus",
    description: "Experienced yoga instructor and meditation coach helping clients achieve mind-body wellness.",
    service: "Yoga & Meditation",
    rating: 4.8,
    reviews: 89,
    image: "/gym-owner-avatar.png",
    genderAcceptance: "All",
    hours: "7:00 AM - 9:00 PM",
    serviceTypes: ["online", "service-at-home", "service-at-center"],
    specialties: ["Hatha Yoga", "Meditation", "Stress Relief"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Home Service Area",
    description: "Nutritionist and wellness coach providing personalized meal plans and lifestyle guidance.",
    service: "Nutrition Coaching",
    rating: 4.7,
    reviews: 156,
    image: "/gym-owner-avatar.png",
    genderAcceptance: "Women Only",
    hours: "9:00 AM - 6:00 PM",
    serviceTypes: ["online", "service-at-home"],
    specialties: ["Meal Planning", "Weight Management", "Sports Nutrition"],
  },
]

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredExperts = mockExperts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = serviceFilter === "all" || expert.service.toLowerCase().includes(serviceFilter.toLowerCase())
    const matchesLocation =
      locationFilter === "all" || expert.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesService && matchesLocation
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expert Listing</h1>
          <p className="text-gray-600 mt-1">Manage your fitness and wellness experts</p>
        </div>
        <Link href="/experts/new">
          <Button className="bg-[#33A040] hover:bg-[#2a8535] text-white">
            <Plus className="w-4 h-4 mr-2" />
            List as Expert
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search experts by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="personal">Personal Training</SelectItem>
            <SelectItem value="yoga">Yoga & Meditation</SelectItem>
            <SelectItem value="nutrition">Nutrition Coaching</SelectItem>
            <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="home">Home Service</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Experts</p>
                <p className="text-2xl font-bold text-[#33A040]">{mockExperts.length}</p>
              </div>
              <Users className="w-8 h-8 text-[#33A040]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-[#33A040]">12</p>
              </div>
              <Star className="w-8 h-8 text-[#33A040]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-[#33A040]">4.8</p>
              </div>
              <Star className="w-8 h-8 text-[#33A040]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-[#33A040]">372</p>
              </div>
              <Users className="w-8 h-8 text-[#33A040]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <Card key={expert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={expert.image || "/placeholder.svg"} alt={expert.name} />
                    <AvatarFallback>
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {expert.service}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{expert.rating}</span>
                  <span className="text-xs text-gray-500">({expert.reviews})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{expert.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {expert.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {expert.hours}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Service Types:</p>
                <div className="flex flex-wrap gap-1">
                  {expert.serviceTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {expert.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge variant={expert.genderAcceptance === "All" ? "default" : "secondary"}>
                  {expert.genderAcceptance}
                </Badge>
                <div className="flex space-x-2">
                  <Link href={`/experts/${expert.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#33A040] border-[#33A040] hover:bg-[#33A040] hover:text-white bg-transparent"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No experts found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new expert.</p>
          <Link href="/experts/new">
            <Button className="bg-[#33A040] hover:bg-[#2a8535] text-white">
              <Plus className="w-4 h-4 mr-2" />
              List as Expert
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
