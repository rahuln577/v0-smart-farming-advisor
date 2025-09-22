"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, BarChart3, RefreshCw, AlertCircle, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface CropPrice {
  crop: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  unit: string
  market: string
  lastUpdated: string
  trend: "up" | "down" | "stable"
}

interface MarketData {
  priceHistory: Array<{
    date: string
    wheat: number
    rice: number
    sugarcane: number
    cotton: number
  }>
  demandSupply: Array<{
    crop: string
    demand: number
    supply: number
    surplus: number
  }>
}

export function MarketAnalysis() {
  const [selectedRegion, setSelectedRegion] = useState("uttar-pradesh")
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [loading, setLoading] = useState(false)

  const cropPrices: CropPrice[] = [
    {
      crop: "Wheat",
      currentPrice: 2150,
      previousPrice: 2050,
      change: 100,
      changePercent: 4.88,
      unit: "₹/quintal",
      market: "Meerut Mandi",
      lastUpdated: "2 hours ago",
      trend: "up",
    },
    {
      crop: "Rice (Basmati)",
      currentPrice: 4200,
      previousPrice: 4350,
      change: -150,
      changePercent: -3.45,
      unit: "₹/quintal",
      market: "Delhi Mandi",
      lastUpdated: "1 hour ago",
      trend: "down",
    },
    {
      crop: "Sugarcane",
      currentPrice: 350,
      previousPrice: 340,
      change: 10,
      changePercent: 2.94,
      unit: "₹/quintal",
      market: "Muzaffarnagar",
      lastUpdated: "3 hours ago",
      trend: "up",
    },
    {
      crop: "Cotton",
      currentPrice: 6800,
      previousPrice: 6750,
      change: 50,
      changePercent: 0.74,
      unit: "₹/quintal",
      market: "Sirsa Mandi",
      lastUpdated: "4 hours ago",
      trend: "stable",
    },
    {
      crop: "Maize",
      currentPrice: 1850,
      previousPrice: 1920,
      change: -70,
      changePercent: -3.65,
      unit: "₹/quintal",
      market: "Karnal Mandi",
      lastUpdated: "1 hour ago",
      trend: "down",
    },
    {
      crop: "Mustard",
      currentPrice: 5200,
      previousPrice: 5100,
      change: 100,
      changePercent: 1.96,
      unit: "₹/quintal",
      market: "Bharatpur Mandi",
      lastUpdated: "2 hours ago",
      trend: "up",
    },
  ]

  const marketData: MarketData = {
    priceHistory: [
      { date: "Jan", wheat: 2000, rice: 4000, sugarcane: 320, cotton: 6500 },
      { date: "Feb", wheat: 2050, rice: 4100, sugarcane: 330, cotton: 6600 },
      { date: "Mar", wheat: 2100, rice: 4200, sugarcane: 340, cotton: 6700 },
      { date: "Apr", wheat: 2080, rice: 4300, sugarcane: 345, cotton: 6750 },
      { date: "May", wheat: 2120, rice: 4250, sugarcane: 350, cotton: 6800 },
      { date: "Jun", wheat: 2150, rice: 4200, sugarcane: 350, cotton: 6800 },
    ],
    demandSupply: [
      { crop: "Wheat", demand: 85, supply: 90, surplus: 5 },
      { crop: "Rice", demand: 75, supply: 70, surplus: -5 },
      { crop: "Sugarcane", demand: 95, supply: 100, surplus: 5 },
      { crop: "Cotton", demand: 80, supply: 85, surplus: 5 },
    ],
  }

  const refreshData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Analysis</h1>
          <p className="text-muted-foreground">Real-time crop prices and market trends</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={refreshData} variant="outline" disabled={loading}>
            {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cropPrices.map((crop, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{crop.crop}</CardTitle>
                {getTrendIcon(crop.trend)}
              </div>
              <CardDescription>{crop.market}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-2xl font-bold">
                  {crop.currentPrice.toLocaleString()} {crop.unit}
                </p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(crop.trend)}`}>
                  <span>
                    {crop.change > 0 ? "+" : ""}
                    {crop.change}
                  </span>
                  <span>
                    ({crop.changePercent > 0 ? "+" : ""}
                    {crop.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Last updated: {crop.lastUpdated}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View History
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Set Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="price-trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="price-trends">Price Trends</TabsTrigger>
          <TabsTrigger value="demand-supply">Demand & Supply</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="price-trends" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Price Trends</CardTitle>
                  <CardDescription>Historical price movements over the last 6 months</CardDescription>
                </div>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wheat" stroke="#22c55e" strokeWidth={2} name="Wheat" />
                    <Line type="monotone" dataKey="rice" stroke="#3b82f6" strokeWidth={2} name="Rice" />
                    <Line type="monotone" dataKey="sugarcane" stroke="#f59e0b" strokeWidth={2} name="Sugarcane" />
                    <Line type="monotone" dataKey="cotton" stroke="#8b5cf6" strokeWidth={2} name="Cotton" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand-supply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand vs Supply Analysis</CardTitle>
              <CardDescription>Current market demand and supply balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData.demandSupply}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand" fill="#ef4444" name="Demand" />
                    <Bar dataKey="supply" fill="#22c55e" name="Supply" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.demandSupply.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">{item.crop}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Demand:</span>
                        <span className="font-medium">{item.demand}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Supply:</span>
                        <span className="font-medium">{item.supply}%</span>
                      </div>
                      <div className="pt-2 border-t">
                        <Badge variant={item.surplus >= 0 ? "secondary" : "destructive"}>
                          {item.surplus >= 0 ? "Surplus" : "Deficit"}: {Math.abs(item.surplus)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Selling Recommendations
                </CardTitle>
                <CardDescription>Best crops to sell based on current market conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Wheat</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      High Demand
                    </Badge>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Prices up 4.88% this week. Good time to sell stored wheat.
                  </p>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Sugarcane</h4>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Stable</Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Steady demand with 2.94% price increase. Consider gradual selling.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Market Alerts
                </CardTitle>
                <CardDescription>Important market updates and warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200">Rice Prices Declining</h4>
                    <Badge variant="destructive">Alert</Badge>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Basmati rice prices down 3.45%. Consider holding if possible.
                  </p>
                </div>

                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-800 dark:text-red-200">Maize Market Weak</h4>
                    <Badge variant="destructive">Warning</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Maize prices falling due to oversupply. Avoid selling unless urgent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Machine learning predictions and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Price Prediction</h4>
                  <p className="text-sm text-muted-foreground">
                    Wheat prices expected to rise 8-12% in next 30 days due to export demand.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Optimal Selling Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Best time to sell sugarcane: Next 2 weeks before monsoon affects transport.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Market Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    Cotton demand increasing in textile sector. Consider increasing production.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
