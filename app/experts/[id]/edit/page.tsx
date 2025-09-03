"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditExpertPage() {
  const params = useParams()
  const expertId = params.id

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    service: "",
    genderAcceptance: "",
    openingTime: "",
    closingTime: "",
    serviceTypes: [] as string[],
    specialties: [] as string[],
    images: [] as string[],
  })

  const [newSpecialty, setNewSpecialty] = useState("")
  const [loading, setLoading] = useState(true)

  const serviceOptions = [
    "Personal Training",
    "Yoga & Meditation",
    "Nutrition Coaching",
    "Physiotherapy",
    "Sports Massage",
    "Pilates",
    "CrossFit Training",
    "Dance Fitness",
    "Swimming Coaching",
    "Mental Health Counseling",
  ]

  // Mock data loading
  useEffect(() => {
    // Simulate loading expert data
    setTimeout(() => {
      setFormData({
        name: "Sarah Johnson",
        location: "Downtown Fitness Center",
        description:
          "Certified personal trainer with 8+ years of experience specializing in strength training and weight loss.",
        service: "Personal Training",
        genderAcceptance: "all",
        openingTime: "06:00",
        closingTime: "22:00",
        serviceTypes: ["online", "service-at-center"],
        specialties: ["Strength Training", "Weight Loss", "Nutrition"],
        images: ["/gym-owner-avatar.png"],
      })
      setLoading(false)
    }, 1000)
  }, [expertId])

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        serviceTypes: [...prev.serviceTypes, serviceType],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        serviceTypes: prev.serviceTypes.filter((type) => type !== serviceType),
      }))
    }
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }))
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated expert data:", formData)
    // Handle form submission
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  <div className="h-20 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/experts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Expert Profile</h1>
          <p className="text-gray-600 mt-1">Update your expert information and services</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Expert Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Select Service *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your primary service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your service location"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your expertise, experience, and what makes you unique..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Service Types *</Label>
                  <p className="text-sm text-gray-600 mb-3">Select how you provide your services</p>
                  <div className="space-y-2">
                    {[
                      { value: "online", label: "Online" },
                      { value: "service-at-home", label: "Service at Home" },
                      { value: "service-at-center", label: "Service at Center" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={formData.serviceTypes.includes(option.value)}
                          onCheckedChange={(checked) => handleServiceTypeChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openingTime">Opening Time *</Label>
                    <Input
                      id="openingTime"
                      type="time"
                      value={formData.openingTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, openingTime: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="closingTime">Closing Time *</Label>
                    <Input
                      id="closingTime"
                      type="time"
                      value={formData.closingTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, closingTime: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="genderAcceptance">Gender Acceptance *</Label>
                  <Select
                    value={formData.genderAcceptance}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, genderAcceptance: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender acceptance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="men-only">Men Only</SelectItem>
                      <SelectItem value="women-only">Women Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add a specialty (e.g., Weight Loss, Strength Training)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                  />
                  <Button type="button" onClick={addSpecialty} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="flex items-center gap-1 bg-[#33A040] text-white px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(specialty)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload your professional photos</p>
                  <Button type="button" variant="outline" size="sm">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Since</span>
                  <span className="font-medium">Jan 2023</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Link href="/experts">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-[#33A040] hover:bg-[#2a8535] text-white">
            Update Expert Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
