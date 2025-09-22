"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  MapPin,
  TrendingUp,
  Camera,
  MessageCircle,
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react"
import Link from "next/link"

export function DashboardContent() {
  const weatherAlerts = [
    { type: "warning", message: "Heavy rainfall expected in next 24 hours", time: "2 hours ago" },
    { type: "info", message: "Optimal planting conditions for wheat", time: "1 day ago" },
  ]

  const quickStats = [
    { label: "Temperature", value: "28°C", icon: Thermometer, color: "text-orange-600" },
    { label: "Humidity", value: "65%", icon: Droplets, color: "text-blue-600" },
    { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "text-gray-600" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your farm today.</p>
      </div>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weatherAlerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${alert.type === "warning" ? "bg-amber-500" : "bg-blue-500"}`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
          <Link href="/weather">
            <Button variant="outline" className="w-full bg-transparent">
              View Full Weather Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/weather">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Cloud className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Weather</h3>
              <p className="text-sm text-muted-foreground">Check forecasts & alerts</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/location">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">Manage farm locations</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/market">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Market</h3>
              <p className="text-sm text-muted-foreground">Price analysis & trends</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/crop-tracker">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Crop Tracker</h3>
              <p className="text-sm text-muted-foreground">Monitor crop health</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest farming activities and insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Camera className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Crop image uploaded for Field A</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <Badge variant="secondary">Analyzed</Badge>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MessageCircle className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">AI recommendation: Apply fertilizer</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Market price alert: Wheat prices up 5%</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
            <Badge variant="secondary">Viewed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
