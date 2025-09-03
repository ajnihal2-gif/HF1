"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

// Sample gyms for selection
const sampleGyms = [
  { id: 1, name: "Downtown Fitness Center" },
  { id: 2, name: "Elite Sports Complex" },
  { id: 3, name: "Women's Wellness Studio" },
]

const planTypes = [
  { value: "Daily Pass", label: "Daily Pass" },
  { value: "Daily Pass with Trainer", label: "Daily Pass with Trainer" },
  { value: "Membership", label: "Membership" },
]

const commonFeatures = [
  "All gym equipment access",
  "Locker room access",
  "Free WiFi",
  "Water fountain access",
  "Group classes included",
  "Swimming pool access",
  "Sauna access",
  "Personal training session",
  "Workout plan consultation",
  "Nutrition guidance",
  "Priority equipment booking",
  "Member-only events",
  "Guest passes",
  "Towel service",
  "Parking included",
]

// Sample plan data for editing
const samplePlan = {
  id: 1,
  gymId: "1",
  type: "Daily Pass with Trainer",
  price: "65.00",
  description: "Daily gym access plus one-on-one personal training session with certified trainer.",
  features: [
    "All gym equipment access",
    "Personal training session",
    "Workout plan consultation",
    "Nutrition guidance",
    "Locker room access",
  ],
}

export default function EditPlanPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [customFeatures, setCustomFeatures] = useState<string[]>([])
  const [newCustomFeature, setNewCustomFeature] = useState("")

  const [formData, setFormData] = useState({
    gymId: "",
    type: "",
    price: "",
    description: "",
  })

  useEffect(() => {
    // Load plan data - in real app, fetch from API
    setFormData({
      gymId: samplePlan.gymId,
      type: samplePlan.type,
      price: samplePlan.price,
      description: samplePlan.description,
    })
    setSelectedFeatures(samplePlan.features)
  }, [])

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature])
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    }
  }

  const addCustomFeature = () => {
    if (newCustomFeature.trim() && !customFeatures.includes(newCustomFeature.trim())) {
      setCustomFeatures([...customFeatures, newCustomFeature.trim()])
      setSelectedFeatures([...selectedFeatures, newCustomFeature.trim()])
      setNewCustomFeature("")
    }
  }

  const removeCustomFeature = (feature: string) => {
    setCustomFeatures(customFeatures.filter((f) => f !== feature))
    setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/plans")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/plans">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Plan</h1>
          <p className="text-muted-foreground">Update your pricing plan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>Update the basic information for your plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gym">Select Gym *</Label>
                <Select value={formData.gymId} onValueChange={(value) => setFormData({ ...formData, gymId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a gym" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleGyms.map((gym) => (
                      <SelectItem key={gym.id} value={gym.id.toString()}>
                        {gym.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Plan Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {planTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">
                Price *{" "}
                {formData.type === "Membership" && <span className="text-sm text-muted-foreground">(per month)</span>}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what's included in this plan and its benefits"
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features & Benefits</CardTitle>
            <CardDescription>Update what's included in this plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <Label htmlFor={feature} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>

            {/* Custom Features */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add custom feature..."
                  value={newCustomFeature}
                  onChange={(e) => setNewCustomFeature(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFeature())}
                />
                <Button type="button" onClick={addCustomFeature} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {customFeatures.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Custom Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {customFeatures.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                      >
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => removeCustomFeature(feature)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/plans">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Plan"}
          </Button>
        </div>
      </form>
    </div>
  )
}
