"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Bot, User, Leaf, Lightbulb, AlertCircle, Mic, MicOff } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "suggestion" | "warning" | "info"
}

interface QuickAction {
  label: string
  query: string
  icon: React.ReactNode
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions: QuickAction[] = [
    {
      label: "Weather advice",
      query: "What should I do based on today's weather?",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      label: "Crop recommendations",
      query: "What crops should I plant this season?",
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      label: "Pest control",
      query: "How do I deal with pest problems in my wheat field?",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      label: "Market prices",
      query: "What are the current market prices for my crops?",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ]

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "1",
      content:
        "Hello! I'm your AI farming assistant. I can help you with crop advice, weather guidance, pest control, market insights, and more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "info",
    }
    setMessages([welcomeMessage])
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple keyword-based responses for demonstration
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("weather")) {
      return "Based on current weather conditions, I recommend:\n\n• Avoid irrigation today due to expected rainfall\n• Consider applying fungicide before the rain\n• Harvest ready crops within the next 2 days\n• Prepare drainage systems for excess water"
    }

    if (lowerMessage.includes("crop") || lowerMessage.includes("plant")) {
      return "For this season, I suggest:\n\n• Wheat: Excellent choice given current soil conditions\n• Mustard: Good market prices expected\n• Barley: Suitable for your climate zone\n• Consider crop rotation to maintain soil health"
    }

    if (lowerMessage.includes("pest") || lowerMessage.includes("disease")) {
      return "For pest and disease management:\n\n• Use integrated pest management (IPM) approach\n• Apply neem-based organic pesticides\n• Maintain proper field hygiene\n• Monitor crops weekly for early detection\n• Consider beneficial insects for biological control"
    }

    if (lowerMessage.includes("market") || lowerMessage.includes("price")) {
      return "Current market insights:\n\n• Wheat prices are up 4.88% this week - good time to sell\n• Rice prices declining - consider holding if possible\n• Sugarcane demand is stable with steady prices\n• Export opportunities available for quality produce"
    }

    if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrition")) {
      return "Fertilizer recommendations:\n\n• Conduct soil testing first\n• Apply nitrogen in split doses\n• Use organic compost to improve soil structure\n• Consider micronutrient supplements\n• Time application with crop growth stages"
    }

    if (lowerMessage.includes("irrigation") || lowerMessage.includes("water")) {
      return "Water management tips:\n\n• Use drip irrigation for water efficiency\n• Monitor soil moisture levels\n• Irrigate early morning or evening\n• Implement rainwater harvesting\n• Adjust frequency based on crop stage and weather"
    }

    // Default response
    return "I understand you're asking about farming practices. Based on your query, I recommend:\n\n• Consult with local agricultural extension officers\n• Consider soil and water testing\n• Follow integrated farming approaches\n• Keep detailed records of your farming activities\n\nCould you provide more specific details about your situation so I can give more targeted advice?"
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const aiResponse = await simulateAIResponse(content)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
        type: "warning",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (query: string) => {
    handleSendMessage(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const toggleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsListening(!isListening)
      // Voice recognition would be implemented here
      // For demo purposes, we'll just toggle the state
      setTimeout(() => setIsListening(false), 3000)
    } else {
      alert("Speech recognition is not supported in your browser")
    }
  }

  const getMessageTypeStyles = (type?: string) => {
    switch (type) {
      case "suggestion":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
      case "warning":
        return "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
      case "info":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
      default:
        return "bg-card border-border"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-full">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Farming Assistant</h1>
            <p className="text-sm text-muted-foreground">Get personalized farming advice and insights</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : `${getMessageTypeStyles(message.type)} border`
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="border-t bg-card p-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.query)}
                  className="justify-start h-auto p-3"
                >
                  <div className="flex items-center gap-2">
                    {action.icon}
                    <span className="text-xs">{action.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t bg-card p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="pr-12"
                disabled={isTyping}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleVoiceInput}
                className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                  isListening ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are simulated for demonstration. In production, this would connect to a real AI service.
          </p>
        </div>
      </div>
    </div>
  )
}
