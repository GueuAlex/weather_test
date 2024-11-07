"use client"

import "@/app/styles/home.css"

import { Bell, ChevronRight, Cloud, CloudRain, Compass, Grid, MapPin, Menu, Search, Settings, Sun } from "lucide-react"




import { useState } from "react"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/inputs"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs"

export default function Component() {
  const [activeTab, setActiveTab] = useState("7Days")
  
  return (
    <div className="max-h-screen bg-gradient-to-b bg-[#205bab] p-8">
      <Card className="w-full max-w-[1200px] mx-auto  backdrop-blur-md border-none text-white first-glass relative">
        <div className="absolute inset-0  overlay rounded-lg w-20 h-full" />
        <div className="p-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <Input
                  placeholder="Search for location"
                  className="w-[300px] border-none pl-10 text-white placeholder:text-blue-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-[auto_1fr_auto] gap-6">
            {/* Left Sidebar */}
            <div className="flex flex-col gap-6">
              <Button variant="ghost" size="icon" className="text-white">
                <Grid className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Compass className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {/* Center Content */}
            <div className="space-y-6">
              {/* Current Weather */}
              <Card className="bg-blue-900/20 border-none text-white p-6">
                <div className="mb-2">Current Weather</div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Sun className="h-16 w-16 text-yellow-300" />
                    <CloudRain className="h-12 w-12 text-blue-300 absolute -bottom-2 -right-2" />
                  </div>
                  <div>
                    <div className="text-6xl font-light">24°C</div>
                    <div className="text-blue-200">Heavy Rain</div>
                  </div>
                  <div className="ml-12 grid grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-2xl">173</div>
                      <div className="text-sm text-blue-200">AQI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">92%</div>
                      <div className="text-sm text-blue-200">Humidity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">6km/h</div>
                      <div className="text-sm text-blue-200">Wind</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Placeholder */}
              <Card className="bg-blue-900/20 border-none h-[300px] overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d5.3389!3d6.5018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1651151030096!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </Card>

              {/* Forecast */}
              <Card className="bg-blue-900/20 border-none text-white p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg">Forecast</div>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-blue-800/20">
                      <TabsTrigger value="7Days" className="data-[state=active]:bg-blue-700">
                        7 Days
                      </TabsTrigger>
                      <TabsTrigger value="10Days" className="data-[state=active]:bg-blue-700">
                        10 Days
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <Cloud className="h-6 w-6 text-blue-300" />
                      <div className="flex-1 ml-4">24° / 22°</div>
                      <div className="text-blue-200">{`${i + 25} Jul, ${['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'][i]}`}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="w-[240px]">
              <Card className="bg-blue-900/20 border-none text-white p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg">Popular Cities</div>
                  <Button variant="ghost" size="sm" className="text-blue-200">
                    View more
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { city: "Delhi", weather: "Partly Cloudy" },
                    { city: "Mumbai", weather: "Drizzle Rain" },
                    { city: "Hyderabad", weather: "Heavy Rain" },
                    { city: "Bangalore", weather: "Light Thunders" },
                    { city: "Kolkata", weather: "Mostly Sunny" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cloud className="h-5 w-5 text-blue-300" />
                        <div>{item.city}</div>
                      </div>
                      <div className="text-sm text-blue-200">{item.weather}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Summary Graph */}
          <Card className="bg-blue-900/20 border-none text-white p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg">Summary</div>
              <Tabs defaultValue="summary">
                <TabsList className="bg-blue-800/20">
                  <TabsTrigger value="summary" className="data-[state=active]:bg-blue-700">
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="hourly" className="data-[state=active]:bg-blue-700">
                    Hourly
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:bg-blue-700">
                    More Details
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-[200px] relative">
              {/* Graph Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg" />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
