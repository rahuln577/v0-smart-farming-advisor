"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Plus, Edit, Trash2, Navigation, Locate, RefreshCw } from "lucide-react"

interface FarmLocation {
  id: string
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  area: number
  cropType: string
  soilType: string
  lastUpdated: string
}

export function LocationDashboard() {
  const [locations, setLocations] = useState<FarmLocation[]>([])
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAddingLocation, setIsAddingLocation] = useState(false)

  // Dummy data for demonstration
  useEffect(() => {
    const dummyLocations: FarmLocation[] = [
      {
        id: "1",
        name: "North Field",
        address: "Village Rampur, District Meerut, UP 250001",
        coordinates: { lat: 28.9845, lng: 77.7064 },
        area: 5.2,
        cropType: "Wheat",
        soilType: "Loamy",
        lastUpdated: "2 hours ago",
      },
      {
        id: "2",
        name: "South Field",
        address: "Village Rampur, District Meerut, UP 250001",
        coordinates: { lat: 28.9825, lng: 77.7084 },
        area: 3.8,
        cropType: "Rice",
        soilType: "Clay",
        lastUpdated: "1 day ago",
      },
      {
        id: "3",
        name: "East Field",
        address: "Village Rampur, District Meerut, UP 250001",
        coordinates: { lat: 28.9865, lng: 77.7104 },
        area: 2.5,
        cropType: "Sugarcane",
        soilType: "Sandy Loam",
        lastUpdated: "3 days ago",
      },
    ]
    setLocations(dummyLocations)
  }, [])

  const getCurrentLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Fallback to dummy location
          setCurrentLocation({ lat: 28.9845, lng: 77.7064 })
          setLoading(false)
        },
      )
    } else {
      // Fallback to dummy location
      setCurrentLocation({ lat: 28.9845, lng: 77.7064 })
      setLoading(false)
    }
  }

  const addNewLocation = () => {
    const newLocation: FarmLocation = {
      id: Date.now().toString(),
      name: "New Field",
      address: "Click to edit address",
      coordinates: currentLocation || { lat: 28.9845, lng: 77.7064 },
      area: 0,
      cropType: "Not specified",
      soilType: "Not specified",
      lastUpdated: "Just now",
    }
    setLocations([...locations, newLocation])
    setIsAddingLocation(false)
  }

  const deleteLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farm Locations</h1>
          <p className="text-muted-foreground">Manage your farm fields and locations</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={getCurrentLocation} variant="outline" disabled={loading}>
            {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Locate className="h-4 w-4 mr-2" />}
            Get Current Location
          </Button>
          <Dialog open={isAddingLocation} onOpenChange={setIsAddingLocation}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Farm Location</DialogTitle>
                <DialogDescription>Add a new field or farm location to track</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location-name">Field Name</Label>
                  <Input id="location-name" placeholder="e.g., North Field" />
                </div>
                <div>
                  <Label htmlFor="location-address">Address</Label>
                  <Input id="location-address" placeholder="Enter full address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Area (acres)</Label>
                    <Input id="area" type="number" placeholder="5.2" />
                  </div>
                  <div>
                    <Label htmlFor="crop-type">Crop Type</Label>
                    <Input id="crop-type" placeholder="e.g., Wheat" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Input id="soil-type" placeholder="e.g., Loamy" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingLocation(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addNewLocation}>Add Location</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current Location Card */}
      {currentLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Coordinates</p>
                <p className="font-mono text-sm">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
              <Badge variant="secondary">Live</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{location.address}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteLocation(location.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Area</p>
                  <p className="font-semibold">{location.area} acres</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Crop Type</p>
                  <p className="font-semibold">{location.cropType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Soil Type</p>
                  <p className="font-semibold">{location.soilType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-semibold">{location.lastUpdated}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
                <p className="font-mono text-xs">
                  {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View on Map
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Locations Map</CardTitle>
          <CardDescription>Interactive map showing all your farm locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map will be displayed here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Google Maps integration would show all farm locations with markers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Locations</p>
                <p className="text-2xl font-bold">{locations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Navigation className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Area</p>
                <p className="text-2xl font-bold">
                  {locations.reduce((sum, loc) => sum + loc.area, 0).toFixed(1)} acres
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Fields</p>
                <p className="text-2xl font-bold">{locations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Navigation className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Field Size</p>
                <p className="text-2xl font-bold">
                  {locations.length > 0
                    ? (locations.reduce((sum, loc) => sum + loc.area, 0) / locations.length).toFixed(1)
                    : "0"}{" "}
                  acres
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
