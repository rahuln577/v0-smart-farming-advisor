import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { LocationDashboard } from "@/components/location/location-dashboard"

export default function LocationPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LocationDashboard />
        </main>
      </div>
    </div>
  )
}
