'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, ThumbsUp, ThumbsDown, Globe, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FaFirstAid } from 'react-icons/fa';


// Updated mock data for locations with real images
const initialLocations = [
  { 
    id: 1, 
    name: "Berlin, Germany", 
    distance: 0, 
    isWelcoming: true, 
    image: "/placeholder.svg?height=200&width=300",
    languages: ["German", "English"],
    healthcareAccess: "Excellent",
    jobOpportunities: "High"
  },
  { 
    id: 2, 
    name: "Paris, France", 
    distance: 878, 
    image: "/placeholder.svg?height=200&width=300",
    isWelcoming: true, 
    languages: ["French", "English"],
    healthcareAccess: "Good",
    jobOpportunities: "Medium"
  },
  { 
    id: 3, 
    name: "Warsaw, Poland", 
    distance: 524, 
    image: "/placeholder.svg?height=200&width=300",
    isWelcoming: false, 
    languages: ["Polish", "English"],
    healthcareAccess: "Moderate",
    jobOpportunities: "Low"
  },
  { 
    id: 4, 
    name: "Vienna, Austria", 
    distance: 524, 
    image: "/placeholder.svg?height=200&width=300",
    isWelcoming: true, 
    languages: ["German", "English"],
    healthcareAccess: "Excellent",
    jobOpportunities: "Medium"
  },
  { 
    id: 5, 
    name: "Prague, Czech Republic", 
    distance: 280, 
    image: "/placeholder.svg?height=200&width=300",
    isWelcoming: true, 
    languages: ["Czech", "English"],
    healthcareAccess: "Good",
    jobOpportunities: "Medium"
  },
  { 
    id: 6, 
    name: "Budapest, Hungary", 
    distance: 689, 
    image: "/placeholder.svg?height=200&width=300",
    isWelcoming: false, 
    languages: ["Hungarian", "English"],
    healthcareAccess: "Moderate",
    jobOpportunities: "Low"
  },
]

export function LocationPage() {
  const [locations, setLocations] = useState(initialLocations)
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    const filteredLocations = initialLocations.filter(location =>
      location.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setLocations(filteredLocations)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <MapPin className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">RefugeConnect</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Button variant="outline" size="sm">Sign Out</Button>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
            Safe Locations for Refugees
          </h1>
          <div className="w-full max-w-sm space-y-2 mb-8">
            <form className="flex space-x-2">
              <Input
                className="flex-1"
                placeholder="Filter locations"
                type="text"
                value={filter}
                onChange={handleFilterChange}
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </form>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location.id} className="overflow-hidden">
                <Image
                   src={location.image}
                  alt={`Cityscape of ${location.name}`}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{location.name}</span>
                    {location.isWelcoming ? (
                      <Badge variant="default" className="bg-green-500">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        Welcoming
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-500">
                        <ThumbsDown className="mr-1 h-3 w-3" />
                        Challenging
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Distance: {location.distance} km from your location
                  </p>
                  <div className="flex items-center mb-2">
                    <Globe className="mr-2 h-4 w-4" />
                    <p className="text-sm">Languages: {location.languages.join(", ")}</p>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <FaFirstAid className="mr-2 h-4 w-4" />
                    <p className="text-sm">Healthcare Access: {location.healthcareAccess}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <p className="text-sm">Job Opportunities: {location.jobOpportunities}</p>
                  </div>
                  <Button className="w-full" variant="outline">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 RefugeConnect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
export default LocationPage;