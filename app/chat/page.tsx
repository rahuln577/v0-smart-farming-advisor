import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { AIChatbot } from "@/components/chat/ai-chatbot"

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <AIChatbot />
        </main>
      </div>
    </div>
  )
}
