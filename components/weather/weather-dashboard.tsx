"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Gauge, AlertTriangle, Info, RefreshCw } from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    visibility: number
    pressure: number
    condition: string
    icon: string
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
  }>
  alerts: Array<{
    type: "warning" | "info" | "severe"
    title: string
    description: string
    time: string
  }>
}

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simulate API call with dummy data
  const fetchWeatherData = async () => {
    setLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const dummyData: WeatherData = {
      current: {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
      },
      forecast: [
        { day: "Today", high: 32, low: 22, condition: "Sunny", icon: "sunny", precipitation: 0 },
        { day: "Tomorrow", high: 29, low: 20, condition: "Rainy", icon: "rainy", precipitation: 80 },
        { day: "Wednesday", high: 26, low: 18, condition: "Cloudy", icon: "cloudy", precipitation: 20 },
        { day: "Thursday", high: 30, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 10 },
        { day: "Friday", high: 33, low: 24, condition: "Sunny", icon: "sunny", precipitation: 0 },
      ],
      alerts: [
        {
          type: "warning",
          title: "Heavy Rainfall Warning",
          description: "Heavy rainfall expected tomorrow. Consider postponing outdoor farming activities.",
          time: "2 hours ago",
        },
        {
          type: "info",
          title: "Optimal Planting Conditions",
          description: "Weather conditions are favorable for planting wheat in the next 3 days.",
          time: "1 day ago",
        },
      ],
    }

    setWeatherData(dummyData)
    setLastUpdated(new Date())
    setLoading(false)
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "partly-cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "severe":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "default"
      case "severe":
        return "destructive"
      case "info":
        return "default"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!weatherData) return null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <Button onClick={fetchWeatherData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="space-y-3">
          {weatherData.alerts.map((alert, index) => (
            <Alert key={index} variant={getAlertVariant(alert.type)}>
              {getAlertIcon(alert.type)}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                {alert.description}
                <span className="block text-xs mt-1 opacity-70">{alert.time}</span>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
          <CardDescription>Real-time weather conditions for your location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weatherData.current.icon)}
              <div>
                <p className="text-4xl font-bold">{weatherData.current.temperature}°C</p>
                <p className="text-muted-foreground">{weatherData.current.condition}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weatherData.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="font-semibold">{weatherData.current.visibility} km</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pressure</p>
                <p className="font-semibold">{weatherData.current.pressure} hPa</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Weather outlook for the coming days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-2">{day.day}</p>
                <div className="flex justify-center mb-2">{getWeatherIcon(day.icon)}</div>
                <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                <div className="flex justify-center gap-2 text-sm">
                  <span className="font-semibold">{day.high}°</span>
                  <span className="text-muted-foreground">{day.low}°</span>
                </div>
                {day.precipitation > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-blue-600">{day.precipitation}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farming Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Farming Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions based on current weather</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Optimal conditions for irrigation today
            </p>
            <p className="text-xs text-green-600 dark:text-green-300 mt-1">
              Low wind speed and moderate humidity make it ideal for watering crops
            </p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Postpone pesticide application</p>
            <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
              Expected rainfall tomorrow may wash away treatments
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Prepare for water collection</p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              Heavy rainfall expected - set up rainwater harvesting systems
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
