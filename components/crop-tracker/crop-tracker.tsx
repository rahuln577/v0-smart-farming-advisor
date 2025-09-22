"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera, Upload, ImageIcon, Leaf, Bug, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface CropImage {
  id: string
  imageUrl: string
  cropType: string
  fieldName: string
  captureDate: string
  analysis: {
    healthScore: number
    issues: string[]
    recommendations: string[]
    yieldPrediction: string
    status: "healthy" | "warning" | "critical"
  }
  notes: string
}

export function CropTracker() {
  const [images, setImages] = useState<CropImage[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Dummy data for demonstration
  const dummyImages: CropImage[] = [
    {
      id: "1",
      imageUrl: "/healthy-wheat-crop-field.jpg",
      cropType: "Wheat",
      fieldName: "North Field",
      captureDate: "2024-01-15",
      analysis: {
        healthScore: 85,
        issues: [],
        recommendations: ["Continue current irrigation schedule", "Apply nitrogen fertilizer in 2 weeks"],
        yieldPrediction: "4.2 tons/hectare",
        status: "healthy",
      },
      notes: "Crop looking healthy, good growth pattern observed",
    },
    {
      id: "2",
      imageUrl: "/rice-crop-with-pest-damage.jpg",
      cropType: "Rice",
      fieldName: "South Field",
      captureDate: "2024-01-14",
      analysis: {
        healthScore: 65,
        issues: ["Leaf spot disease detected", "Pest damage on lower leaves"],
        recommendations: ["Apply fungicide treatment", "Increase field monitoring", "Consider pest control measures"],
        yieldPrediction: "3.1 tons/hectare",
        status: "warning",
      },
      notes: "Some disease symptoms noticed, need immediate attention",
    },
    {
      id: "3",
      imageUrl: "/sugarcane-crop-healthy-green.jpg",
      cropType: "Sugarcane",
      fieldName: "East Field",
      captureDate: "2024-01-13",
      analysis: {
        healthScore: 92,
        issues: [],
        recommendations: ["Maintain current care routine", "Monitor for optimal harvest timing"],
        yieldPrediction: "65 tons/hectare",
        status: "healthy",
      },
      notes: "Excellent growth, ready for harvest in 2 months",
    },
  ]

  useState(() => {
    setImages(dummyImages)
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      analyzeImage(file)
    }
  }

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      analyzeImage(file)
    }
  }

  const analyzeImage = async (file: File) => {
    setAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const imageUrl = URL.createObjectURL(file)

    // Simulate AI analysis results
    const analysisResults = [
      {
        healthScore: Math.floor(Math.random() * 30) + 70,
        issues: [],
        recommendations: ["Continue current irrigation", "Monitor growth regularly"],
        yieldPrediction: `${(Math.random() * 2 + 3).toFixed(1)} tons/hectare`,
        status: "healthy" as const,
      },
      {
        healthScore: Math.floor(Math.random() * 20) + 50,
        issues: ["Nutrient deficiency detected", "Irregular growth pattern"],
        recommendations: ["Apply balanced fertilizer", "Adjust irrigation schedule", "Soil testing recommended"],
        yieldPrediction: `${(Math.random() * 1.5 + 2).toFixed(1)} tons/hectare`,
        status: "warning" as const,
      },
    ]

    const randomAnalysis = analysisResults[Math.floor(Math.random() * analysisResults.length)]

    const newImage: CropImage = {
      id: Date.now().toString(),
      imageUrl,
      cropType: "Unknown", // Would be detected by AI
      fieldName: "New Field",
      captureDate: new Date().toISOString().split("T")[0],
      analysis: randomAnalysis,
      notes: "",
    }

    setImages([newImage, ...images])
    setAnalyzing(false)
    setSelectedImage(null)
    setIsCapturing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Crop Tracker</h1>
          <p className="text-muted-foreground">Monitor crop health with AI-powered image analysis</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => cameraInputRef.current?.click()} className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Take Photo
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
      />

      {/* Analysis in progress */}
      {analyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <div>
                <p className="font-semibold">Analyzing crop image...</p>
                <p className="text-sm text-muted-foreground">AI is processing your image for health assessment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-2xl font-bold">{images.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Healthy Crops</p>
                <p className="text-2xl font-bold">{images.filter((img) => img.analysis.status === "healthy").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Need Attention</p>
                <p className="text-2xl font-bold">{images.filter((img) => img.analysis.status === "warning").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Leaf className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Health Score</p>
                <p className="text-2xl font-bold">
                  {images.length > 0
                    ? Math.round(images.reduce((sum, img) => sum + img.analysis.healthScore, 0) / images.length)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{image.cropType}</CardTitle>
                  <CardDescription>{image.fieldName}</CardDescription>
                </div>
                <Badge className={getStatusColor(image.analysis.status)}>
                  {getStatusIcon(image.analysis.status)}
                  <span className="ml-1 capitalize">{image.analysis.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={`${image.cropType} in ${image.fieldName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className="font-semibold">{image.analysis.healthScore}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      image.analysis.healthScore >= 80
                        ? "bg-green-500"
                        : image.analysis.healthScore >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${image.analysis.healthScore}%` }}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Yield Prediction</p>
                <p className="font-semibold">{image.analysis.yieldPrediction}</p>
              </div>

              {image.analysis.issues.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Issues Detected</p>
                  <div className="space-y-1">
                    {image.analysis.issues.slice(0, 2).map((issue, index) => (
                      <p
                        key={index}
                        className="text-xs bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 p-2 rounded"
                      >
                        {issue}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {image.cropType} - {image.fieldName}
                      </DialogTitle>
                      <DialogDescription>
                        Captured on {new Date(image.captureDate).toLocaleDateString()}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={image.imageUrl || "/placeholder.svg"}
                          alt={`${image.cropType} analysis`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Health Score</Label>
                          <p className="text-2xl font-bold">{image.analysis.healthScore}%</p>
                        </div>
                        <div>
                          <Label>Yield Prediction</Label>
                          <p className="text-lg font-semibold">{image.analysis.yieldPrediction}</p>
                        </div>
                      </div>

                      {image.analysis.issues.length > 0 && (
                        <div>
                          <Label>Issues Detected</Label>
                          <div className="space-y-2 mt-2">
                            {image.analysis.issues.map((issue, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded"
                              >
                                <Bug className="h-4 w-4 text-red-600" />
                                <span className="text-sm text-red-700 dark:text-red-300">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <Label>Recommendations</Label>
                        <div className="space-y-2 mt-2">
                          {image.analysis.recommendations.map((rec, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded"
                            >
                              <Leaf className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-700 dark:text-green-300">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add your observations..."
                          value={image.notes}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && !analyzing && (
        <Card>
          <CardContent className="p-12 text-center">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No crop images yet</h3>
            <p className="text-muted-foreground mb-4">Start tracking your crops by taking photos or uploading images</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => cameraInputRef.current?.click()}>
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
