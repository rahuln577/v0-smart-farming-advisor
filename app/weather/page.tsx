import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { WeatherDashboard } from "@/components/weather/weather-dashboard"

export default function WeatherPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <WeatherDashboard />
        </main>
      </div>
    </div>
  )
}
