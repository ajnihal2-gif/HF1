"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

const amenityOptions = [
  "Free Weights",
  "Cardio Equipment",
  "Group Classes",
  "Swimming Pool",
  "Sauna",
  "Steam Room",
  "Basketball Court",
  "Tennis Court",
  "Yoga Studio",
  "Pilates",
  "Personal Training",
  "Locker Rooms",
  "Parking",
  "Childcare",
  "Nutrition Counseling",
  "Massage Therapy",
]

export default function NewGymPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedPricingOptions, setSelectedPricingOptions] = useState<string[]>([])
  const [pricingData, setPricingData] = useState({
    dailyPassWithTrainer: "",
    dailyPassWithoutTrainer: "",
    membershipPlan: "",
    membershipDescription: "",
    membershipPrice: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    openTime: "",
    closeTime: "",
    genderAcceptance: "",
    size: "",
    description: "",
  })

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const handlePricingOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedPricingOptions([...selectedPricingOptions, option])
    } else {
      setSelectedPricingOptions(selectedPricingOptions.filter((o) => o !== option))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simulate image upload - in real app, upload to storage service
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/gyms")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/gyms">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gyms
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Gym</h1>
          <p className="text-muted-foreground">Create a new gym listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details about your gym</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Gym Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter gym name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft) *</Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 5000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Full address including city, state, zip"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your gym, its atmosphere, and what makes it special"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operating Hours & Policies</CardTitle>
            <CardDescription>Set your gym's schedule and policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openTime">Opening Time *</Label>
                <Input
                  id="openTime"
                  type="time"
                  value={formData.openTime}
                  onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeTime">Closing Time *</Label>
                <Input
                  id="closeTime"
                  type="time"
                  value={formData.closeTime}
                  onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="genderAcceptance">Gender Acceptance *</Label>
              <Select
                value={formData.genderAcceptance}
                onValueChange={(value) => setFormData({ ...formData, genderAcceptance: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="women">Women Only</SelectItem>
                  <SelectItem value="men">Men Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Select all amenities available at your gym</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
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

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Configure your gym's pricing options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Select Pricing Options</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dailyPassWithTrainer"
                    checked={selectedPricingOptions.includes("dailyPassWithTrainer")}
                    onCheckedChange={(checked) => handlePricingOptionChange("dailyPassWithTrainer", checked as boolean)}
                  />
                  <Label htmlFor="dailyPassWithTrainer">Daily Pass with Trainer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dailyPassWithoutTrainer"
                    checked={selectedPricingOptions.includes("dailyPassWithoutTrainer")}
                    onCheckedChange={(checked) =>
                      handlePricingOptionChange("dailyPassWithoutTrainer", checked as boolean)
                    }
                  />
                  <Label htmlFor="dailyPassWithoutTrainer">Daily Pass without Trainer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="membership"
                    checked={selectedPricingOptions.includes("membership")}
                    onCheckedChange={(checked) => handlePricingOptionChange("membership", checked as boolean)}
                  />
                  <Label htmlFor="membership">Membership</Label>
                </div>
              </div>
            </div>

            {/* Daily Pass with Trainer Price */}
            {selectedPricingOptions.includes("dailyPassWithTrainer") && (
              <div className="space-y-2">
                <Label htmlFor="dailyPassWithTrainerPrice">Daily Pass with Trainer Price ($)</Label>
                <Input
                  id="dailyPassWithTrainerPrice"
                  type="number"
                  value={pricingData.dailyPassWithTrainer}
                  onChange={(e) => setPricingData({ ...pricingData, dailyPassWithTrainer: e.target.value })}
                  placeholder="e.g., 25"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            {/* Daily Pass without Trainer Price */}
            {selectedPricingOptions.includes("dailyPassWithoutTrainer") && (
              <div className="space-y-2">
                <Label htmlFor="dailyPassWithoutTrainerPrice">Daily Pass without Trainer Price ($)</Label>
                <Input
                  id="dailyPassWithoutTrainerPrice"
                  type="number"
                  value={pricingData.dailyPassWithoutTrainer}
                  onChange={(e) => setPricingData({ ...pricingData, dailyPassWithoutTrainer: e.target.value })}
                  placeholder="e.g., 15"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            {/* Membership Options */}
            {selectedPricingOptions.includes("membership") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="membershipPlan">Membership Plan</Label>
                  <Select
                    value={pricingData.membershipPlan}
                    onValueChange={(value) => setPricingData({ ...pricingData, membershipPlan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipDescription">Membership Description</Label>
                  <Textarea
                    id="membershipDescription"
                    value={pricingData.membershipDescription}
                    onChange={(e) => setPricingData({ ...pricingData, membershipDescription: e.target.value })}
                    placeholder="Describe what's included in this membership plan"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipPrice">Membership Price ($)</Label>
                  <Input
                    id="membershipPrice"
                    type="number"
                    value={pricingData.membershipPrice}
                    onChange={(e) => setPricingData({ ...pricingData, membershipPrice: e.target.value })}
                    placeholder="e.g., 50"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload photos of your gym (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                Choose Files
              </Button>
            </div>
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gym image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/gyms">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Gym"}
          </Button>
        </div>
      </form>
    </div>
  )
}
