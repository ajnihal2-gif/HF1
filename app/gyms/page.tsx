"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, MapPin, Clock, Users, Square, Star, Edit, DollarSign, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample gym data
const sampleGyms = [
  {
    id: 1,
    name: "Downtown Fitness Center",
    location: "123 Main St, Downtown, NY 10001",
    hours: "5:00 AM - 11:00 PM",
    genderAcceptance: "All Genders",
    size: 5000,
    rating: 4.8,
    reviews: 124,
    amenities: ["Free Weights", "Cardio Equipment", "Group Classes", "Locker Rooms", "Parking"],
    description:
      "Modern fitness center in the heart of downtown with state-of-the-art equipment and professional trainers.",
    image: "/modern-gym-interior.png",
    pricingOptions: ["dailyPassWithTrainer", "membership"],
    pricing: {
      dailyPassWithTrainer: "$25",
      dailyPassWithoutTrainer: "",
      membershipPlan: "Monthly",
      membershipDescription: "Full access to all equipment and group classes",
      membershipPrice: "$50",
    },
  },
  {
    id: 2,
    name: "Elite Sports Complex",
    location: "456 Oak Ave, Midtown, NY 10002",
    hours: "6:00 AM - 10:00 PM",
    genderAcceptance: "All Genders",
    size: 8500,
    rating: 4.6,
    reviews: 89,
    amenities: ["Swimming Pool", "Basketball Court", "Free Weights", "Sauna", "Personal Training"],
    description: "Premium sports complex offering diverse fitness options including pool and court sports.",
    image: "/sports-complex-with-pool.png",
    pricingOptions: ["dailyPassWithTrainer", "dailyPassWithoutTrainer", "membership"],
    pricing: {
      dailyPassWithTrainer: "$35",
      dailyPassWithoutTrainer: "$20",
      membershipPlan: "Weekly",
      membershipDescription: "Access to all facilities including pool and courts",
      membershipPrice: "$75",
    },
  },
  {
    id: 3,
    name: "Women's Wellness Studio",
    location: "789 Pine St, Uptown, NY 10003",
    hours: "7:00 AM - 9:00 PM",
    genderAcceptance: "Women Only",
    size: 3200,
    rating: 4.9,
    reviews: 67,
    amenities: ["Yoga Studio", "Pilates", "Cardio Equipment", "Childcare", "Nutrition Counseling"],
    description: "Dedicated women's fitness studio focusing on holistic wellness and community support.",
    image: "/women-yoga-studio.png",
    pricingOptions: ["dailyPassWithoutTrainer", "membership"],
    pricing: {
      dailyPassWithTrainer: "",
      dailyPassWithoutTrainer: "$18",
      membershipPlan: "Monthly",
      membershipDescription: "Unlimited classes and wellness consultations",
      membershipPrice: "$45",
    },
  },
]

export default function GymsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [gyms] = useState(sampleGyms)

  const filteredGyms = gyms.filter(
    (gym) =>
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Listed Gyms</h1>
          <p className="text-muted-foreground">Manage your gym locations and listings</p>
        </div>
        <Button asChild>
          <Link href="/gyms/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New Gym
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search gyms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Gym Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={gym.image || "/placeholder.svg"} alt={gym.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Button size="sm" variant="secondary" asChild>
                  <Link href={`/gyms/${gym.id}/edit`}>
                    <Edit className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{gym.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {gym.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{gym.rating}</span>
                  <span className="text-xs text-muted-foreground">({gym.reviews})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{gym.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{gym.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-muted-foreground" />
                  <span>{gym.size.toLocaleString()} sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{gym.genderAcceptance}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Amenities:</p>
                <div className="flex flex-wrap gap-1">
                  {gym.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {gym.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{gym.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Pricing:
                </p>
                <div className="flex flex-wrap gap-1">
                  {gym.pricingOptions.includes("dailyPassWithTrainer") && gym.pricing.dailyPassWithTrainer && (
                    <Badge variant="outline" className="text-xs">
                      Daily Pass + Trainer: {gym.pricing.dailyPassWithTrainer}
                    </Badge>
                  )}
                  {gym.pricingOptions.includes("dailyPassWithoutTrainer") && gym.pricing.dailyPassWithoutTrainer && (
                    <Badge variant="outline" className="text-xs">
                      Daily Pass: {gym.pricing.dailyPassWithoutTrainer}
                    </Badge>
                  )}
                  {gym.pricingOptions.includes("membership") && gym.pricing.membershipPrice && (
                    <Badge variant="outline" className="text-xs">
                      {gym.pricing.membershipPlan} Membership: {gym.pricing.membershipPrice}
                    </Badge>
                  )}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{gym.name}</DialogTitle>
                    <DialogDescription>{gym.location}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <img
                      src={gym.image || "/placeholder.svg"}
                      alt={gym.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{gym.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Operating Hours</h4>
                        <p className="text-sm">{gym.hours}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Size</h4>
                        <p className="text-sm">{gym.size.toLocaleString()} sq ft</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Gender Policy</h4>
                        <p className="text-sm">{gym.genderAcceptance}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Rating</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {gym.rating} ({gym.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">All Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {gym.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Pricing Plans</h4>
                      <div className="space-y-3">
                        {gym.pricingOptions.includes("dailyPassWithTrainer") && gym.pricing.dailyPassWithTrainer && (
                          <div className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium">Daily Pass with Trainer</h5>
                              <span className="font-semibold text-primary">{gym.pricing.dailyPassWithTrainer}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Full gym access with personal trainer session
                            </p>
                          </div>
                        )}
                        {gym.pricingOptions.includes("dailyPassWithoutTrainer") &&
                          gym.pricing.dailyPassWithoutTrainer && (
                            <div className="border rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium">Daily Pass without Trainer</h5>
                                <span className="font-semibold text-primary">
                                  {gym.pricing.dailyPassWithoutTrainer}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">Full gym access for one day</p>
                            </div>
                          )}
                        {gym.pricingOptions.includes("membership") && gym.pricing.membershipPrice && (
                          <div className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium">{gym.pricing.membershipPlan} Membership</h5>
                              <span className="font-semibold text-primary">{gym.pricing.membershipPrice}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{gym.pricing.membershipDescription}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGyms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No gyms found matching your search.</p>
        </div>
      )}
    </div>
  )
}
