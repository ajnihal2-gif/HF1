"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, DollarSign, Edit, Trash2 } from "lucide-react"

// Sample plan data
const samplePlans = [
  {
    id: 1,
    gymId: 1,
    gymName: "Downtown Fitness Center",
    type: "Daily Pass",
    price: 25,
    description: "Full access to all gym facilities for one day. Perfect for visitors or trying out our gym.",
    features: ["All gym equipment access", "Locker room access", "Free WiFi", "Water fountain access"],
    isActive: true,
  },
  {
    id: 2,
    gymId: 1,
    gymName: "Downtown Fitness Center",
    type: "Daily Pass with Trainer",
    price: 65,
    description: "Daily gym access plus one-on-one personal training session with certified trainer.",
    features: [
      "All gym equipment access",
      "1-hour personal training session",
      "Workout plan consultation",
      "Nutrition guidance",
      "Locker room access",
    ],
    isActive: true,
  },
  {
    id: 3,
    gymId: 1,
    gymName: "Downtown Fitness Center",
    type: "Membership",
    price: 89.99,
    description: "Monthly unlimited access with exclusive member benefits and priority booking.",
    features: [
      "Unlimited gym access",
      "Group classes included",
      "Priority equipment booking",
      "Member-only events",
      "Guest passes (2 per month)",
      "Nutrition consultation",
    ],
    isActive: true,
  },
  {
    id: 4,
    gymId: 2,
    gymName: "Elite Sports Complex",
    type: "Daily Pass",
    price: 35,
    description: "Premium day pass with access to all facilities including pool and courts.",
    features: ["All equipment access", "Swimming pool", "Basketball court", "Sauna access"],
    isActive: true,
  },
  {
    id: 5,
    gymId: 2,
    gymName: "Elite Sports Complex",
    type: "Membership",
    price: 129.99,
    description: "Premium monthly membership with full facility access and exclusive perks.",
    features: [
      "Unlimited facility access",
      "Pool and court reservations",
      "Group classes",
      "Personal training discount",
      "Towel service",
    ],
    isActive: false,
  },
]

const planTypes = ["All Plans", "Daily Pass", "Daily Pass with Trainer", "Membership"]

export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Plans")
  const [plans] = useState(samplePlans)

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All Plans" || plan.type === selectedType
    return matchesSearch && matchesType
  })

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case "Daily Pass":
        return "bg-blue-100 text-blue-800"
      case "Daily Pass with Trainer":
        return "bg-purple-100 text-purple-800"
      case "Membership":
        return "bg-primary/10 text-primary"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Plan Management</h1>
          <p className="text-muted-foreground">Manage pricing plans for all your gyms</p>
        </div>
        <Button asChild>
          <Link href="/plans/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New Plan
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search plans or gyms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {planTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className={`${!plan.isActive ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Badge className={getPlanTypeColor(plan.type)}>{plan.type}</Badge>
                  <CardTitle className="text-lg">{plan.gymName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      ${plan.price}
                      {plan.type === "Membership" && <span className="text-sm font-normal">/month</span>}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/plans/${plan.id}/edit`}>
                      <Edit className="w-3 h-3" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{plan.description}</p>

              <div className="space-y-2">
                <p className="text-sm font-medium">Features included:</p>
                <ul className="text-sm space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <Badge variant={plan.isActive ? "default" : "secondary"}>{plan.isActive ? "Active" : "Inactive"}</Badge>
                <Button size="sm" variant="ghost">
                  {plan.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No plans found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
