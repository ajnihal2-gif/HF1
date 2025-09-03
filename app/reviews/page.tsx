"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Star, Search, MapPin, Calendar, User, MessageSquare, ThumbsUp, Flag } from "lucide-react"

// Sample review data with all listing types
const sampleReviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    listingType: "gym",
    listingName: "Downtown Fitness Center",
    rating: 5,
    date: "2024-01-14",
    planType: "Daily Pass with Trainer",
    title: "Excellent personal training session!",
    comment:
      "Had an amazing workout with Mike. He really knows his stuff and helped me with proper form. The gym is clean and well-equipped. Will definitely be back!",
    helpful: 12,
    response: null,
    verified: true,
  },
  {
    id: 2,
    customerName: "John Smith",
    listingType: "gym",
    listingName: "Elite Sports Complex",
    rating: 4,
    date: "2024-01-13",
    planType: "Daily Pass",
    title: "Great facilities, minor issues",
    comment:
      "Love the pool and basketball court. Equipment is top-notch. Only complaint is that it gets pretty crowded during peak hours. Overall a solid gym experience.",
    helpful: 8,
    response: {
      date: "2024-01-14",
      text: "Thank you for the feedback! We're working on expanding our peak hour capacity. We appreciate your patience and look forward to serving you again.",
    },
    verified: true,
  },
  {
    id: 3,
    customerName: "Emily Chen",
    listingType: "court",
    listingName: "Tennis Center Pro",
    rating: 5,
    date: "2024-01-12",
    planType: "Hourly Booking",
    title: "Perfect tennis courts!",
    comment:
      "The courts are in excellent condition and well-maintained. Booking system is easy to use and the staff is very helpful. Great value for money!",
    helpful: 15,
    response: {
      date: "2024-01-13",
      text: "Thank you Emily! We're thrilled you enjoyed your tennis session. We work hard to maintain our courts at the highest standard!",
    },
    verified: true,
  },
  {
    id: 4,
    customerName: "David Wilson",
    listingType: "expert",
    listingName: "Sarah Johnson - Yoga",
    rating: 3,
    date: "2024-01-11",
    planType: "Online Session",
    title: "Average yoga session",
    comment:
      "The instructor was knowledgeable but the online connection had some issues. Content was good but technical difficulties affected the experience.",
    helpful: 3,
    response: null,
    verified: false,
  },
  {
    id: 5,
    customerName: "Maria Garcia",
    listingType: "gym",
    listingName: "Women's Wellness Studio",
    rating: 5,
    date: "2024-01-10",
    planType: "Membership",
    title: "Outstanding value and service",
    comment:
      "Been a member for 6 months now and absolutely love it. The variety of equipment and classes is incredible. Staff is always helpful and friendly.",
    helpful: 20,
    response: {
      date: "2024-01-11",
      text: "Maria, thank you for being such a wonderful member! Your dedication to your fitness journey inspires us all. Keep up the great work!",
    },
    verified: true,
  },
  {
    id: 6,
    customerName: "Alex Thompson",
    listingType: "court",
    listingName: "Basketball Arena",
    rating: 2,
    date: "2024-01-09",
    planType: "Hourly Booking",
    title: "Disappointing court condition",
    comment:
      "Court surface was not in good condition, several lights were out, and the booking system was confusing. Expected better for the price.",
    helpful: 5,
    response: {
      date: "2024-01-10",
      text: "We sincerely apologize for your experience. We've addressed the maintenance issues and updated our booking system. Please give us another chance!",
    },
    verified: true,
  },
  {
    id: 7,
    customerName: "Lisa Park",
    listingType: "expert",
    listingName: "Mike Chen - Personal Training",
    rating: 5,
    date: "2024-01-08",
    planType: "Service at Home",
    title: "Excellent personal trainer!",
    comment:
      "Mike came to my home and provided an amazing workout session. Very professional, knowledgeable, and motivating. Highly recommend his services!",
    helpful: 18,
    response: {
      date: "2024-01-09",
      text: "Thank you Lisa! It was a pleasure working with you. Keep up the great work with your fitness goals!",
    },
    verified: true,
  },
]

const allReviewData = [
  // Gyms
  { type: "gym", name: "Downtown Fitness Center" },
  { type: "gym", name: "Elite Sports Complex" },
  { type: "gym", name: "Women's Wellness Studio" },
  // Courts
  { type: "court", name: "Tennis Center Pro" },
  { type: "court", name: "Basketball Arena" },
  // Experts
  { type: "expert", name: "Sarah Johnson - Yoga" },
  { type: "expert", name: "Mike Chen - Personal Training" },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedListingType, setSelectedListingType] = useState("all")
  const [selectedListingName, setSelectedListingName] = useState("all")
  const [responseText, setResponseText] = useState("")
  const [respondingTo, setRespondingTo] = useState<number | null>(null)
  const [reviews] = useState(sampleReviews)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesListingType = selectedListingType === "all" || review.listingType === selectedListingType
    const matchesListingName = selectedListingName === "all" || review.listingName === selectedListingName
    return matchesSearch && matchesListingType && matchesListingName
  })

  const getAvailableNames = () => {
    if (selectedListingType === "all") return []
    return allReviewData.filter((item) => item.type === selectedListingType).map((item) => item.name)
  }

  const handleListingTypeChange = (value: string) => {
    setSelectedListingType(value)
    setSelectedListingName("all")
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

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }))

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const handleResponse = (reviewId: number) => {
    if (responseText.trim()) {
      // In real app, send response to API
      console.log(`Responding to review ${reviewId}: ${responseText}`)
      setRespondingTo(null)
      setResponseText("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews & Feedback</h1>
        <p className="text-muted-foreground">Monitor customer feedback and respond to reviews</p>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</CardTitle>
            <div className="flex justify-center">{renderStars(Math.round(averageRating), "w-5 h-5")}</div>
            <CardDescription>{totalReviews} total reviews</CardDescription>
          </CardHeader>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.rating} className="flex items-center gap-2">
                <span className="text-sm w-6">{dist.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${dist.percentage}%` }}></div>
                </div>
                <span className="text-sm text-muted-foreground w-12">{dist.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedListingType} onValueChange={handleListingTypeChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="gym">Gyms</SelectItem>
            <SelectItem value="court">Courts</SelectItem>
            <SelectItem value="expert">Experts</SelectItem>
          </SelectContent>
        </Select>

        {selectedListingType !== "all" && (
          <Select value={selectedListingName} onValueChange={setSelectedListingName}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Names" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Names</SelectItem>
              {getAvailableNames().map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{review.title}</h3>
                    {review.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {review.customerName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getListingTypeBadge(review.listingType)} variant="secondary">
                        {review.listingType}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {review.listingName}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {renderStars(review.rating)}
                  <Badge variant="outline">{review.planType}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{review.comment}</p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="w-3 h-3 mr-1" />
                    Report
                  </Button>
                </div>
                {!review.response && (
                  <Button variant="outline" size="sm" onClick={() => setRespondingTo(review.id)}>
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Respond
                  </Button>
                )}
              </div>

              {/* Response */}
              {review.response && (
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Owner Response</Badge>
                    <span className="text-xs text-muted-foreground">{review.response.date}</span>
                  </div>
                  <p className="text-sm">{review.response.text}</p>
                </div>
              )}

              {/* Response Form */}
              {respondingTo === review.id && (
                <div className="space-y-3 pt-2 border-t">
                  <Textarea
                    placeholder="Write your response..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleResponse(review.id)}>
                      Send Response
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setRespondingTo(null)
                        setResponseText("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
