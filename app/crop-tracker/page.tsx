import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { CropTracker } from "@/components/crop-tracker/crop-tracker"

export default function CropTrackerPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <CropTracker />
        </main>
      </div>
    </div>
  )
}
