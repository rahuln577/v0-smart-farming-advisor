import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { MarketAnalysis } from "@/components/market/market-analysis"

export default function MarketPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <MarketAnalysis />
        </main>
      </div>
    </div>
  )
}
