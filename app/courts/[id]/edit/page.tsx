"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Plus } from "lucide-react"
import Link from "next/link"

const amenitiesOptions = [
  "Air Conditioning",
  "Sound System",
  "Scoreboard",
  "Parking",
  "Lighting",
  "Net System",
  "Seating Area",
  "Water Station",
  "Equipment Storage",
  "Changing Rooms",
  "Flexible Layout",
  "Security System",
]

// Mock data for editing
const mockCourt = {
  id: 1,
  name: "Elite Basketball Court",
  location: "Downtown Sports Complex, 123 Main St",
  size: "2800",
  openingTime: "06:00",
  closingTime: "22:00",
  genderAcceptance: "all",
  pricePerHour: "75",
  amenities: ["Air Conditioning", "Sound System", "Scoreboard", "Parking"],
  images: ["/modern-gym-interior.png"],
}

export default function EditCourtPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState(mockCourt)

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((a) => a !== amenity),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated court data:", formData)
    // Handle form submission
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/courts">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Court</h1>
          <p className="text-muted-foreground">Update your court information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Court Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft) *</Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Operating Hours & Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openingTime">Opening Time *</Label>
                <Input
                  id="openingTime"
                  type="time"
                  value={formData.openingTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, openingTime: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closingTime">Closing Time *</Label>
                <Input
                  id="closingTime"
                  type="time"
                  value={formData.closingTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, closingTime: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricePerHour">Price per Hour ($) *</Label>
                <Input
                  id="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pricePerHour: e.target.value }))}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gender Acceptance */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Acceptance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Who can use this court? *</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="genderAcceptance"
                    value="all"
                    checked={formData.genderAcceptance === "all"}
                    onChange={(e) => setFormData((prev) => ({ ...prev, genderAcceptance: e.target.value }))}
                    className="text-primary"
                  />
                  <span>All Genders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="genderAcceptance"
                    value="male"
                    checked={formData.genderAcceptance === "male"}
                    onChange={(e) => setFormData((prev) => ({ ...prev, genderAcceptance: e.target.value }))}
                    className="text-primary"
                  />
                  <span>Male Only</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="genderAcceptance"
                    value="female"
                    checked={formData.genderAcceptance === "female"}
                    onChange={(e) => setFormData((prev) => ({ ...prev, genderAcceptance: e.target.value }))}
                    className="text-primary"
                  />
                  <span>Female Only</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Available Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Court Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Update Court Images</h3>
              <p className="text-muted-foreground mb-4">Add or replace photos to showcase your court.</p>
              <Button type="button" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Choose Images
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          <Link href="/courts">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Update Court
          </Button>
        </div>
      </form>
    </div>
  )
}
