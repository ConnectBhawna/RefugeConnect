'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Globe, MessageCircle, User } from "lucide-react"
import Link from "next/link"

const translateText = (text: string, targetLanguage: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Translated: "${text}" to ${targetLanguage}`)
    }, 1000)
  })
}

const localHelpers = [
  { id: 1, name: "Maria Schmidt", language: "German", expertise: "Legal Advice" },
  { id: 2, name: "Jean Dupont", language: "French", expertise: "Housing Assistance" },
  { id: 3, name: "Anna Kowalski", language: "Polish", expertise: "Job Search" },
  { id: 4, name: "Carlos Fernandez", language: "Spanish", expertise: "Education" },
]

export function BlockPage() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('German')
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    setIsTranslating(true)
    try {
      const result = await translateText(inputText, targetLanguage)
      setTranslatedText(result)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Error in translation. Please try again.')
    }
    setIsTranslating(false)
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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/locations">
            Locations
          </Link>
          <Button variant="outline" size="sm">Sign Out</Button>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
            Refugee Assistance & Translation
          </h1>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Language Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter text to translate"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Polish">Polish</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleTranslate} disabled={isTranslating}>
                      {isTranslating ? 'Translating...' : 'Translate'}
                    </Button>
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p>{translatedText || 'Translation will appear here'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Connect with Local Helpers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {localHelpers.map((helper) => (
                    <div key={helper.id} className="flex items-center justify-between p-4 bg-muted rounded-md">
                      <div>
                        <p className="font-semibold">{helper.name}</p>
                        <p className="text-sm text-muted-foreground">{helper.language} • {helper.expertise}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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