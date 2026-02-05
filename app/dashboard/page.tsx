'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FiCopy, FiRefreshCw, FiLogOut, FiClock } from 'react-icons/fi'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [topic, setTopic] = useState('')
  const [keyword, setKeyword] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(10)
  const [generationCount, setGenerationCount] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
        // Get generation count
        const { count } = await supabase
          .from('generations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
        setGenerationCount(count || 0)
        setCredits(Math.max(0, 10 - (count || 0)))
      }
    }
    checkUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleGenerate = async () => {
    if (credits <= 0) {
      alert('You\'ve used all your free credits! Upgrade to continue.')
      return
    }

    setLoading(true)
    setOutput('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keyword }),
      })

      if (!response.ok) throw new Error('Generation failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let fullOutput = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          fullOutput += chunk
          setOutput(fullOutput)
        }

        // Save to database
        await supabase.from('generations').insert({
          user_id: user?.id,
          topic,
          keyword,
          output: fullOutput,
        })

        setGenerationCount(prev => prev + 1)
        setCredits(prev => prev - 1)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert('Copied to clipboard!')
  }

  const handleRegenerate = () => {
    setOutput('')
    handleGenerate()
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-bold">AI Content Assistant</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="outline" className="text-sm sm:text-base px-2 sm:px-3 py-1">
                {credits}/10
              </Badge>
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  <FiClock className="sm:mr-2" />
                  <span className="hidden sm:inline">History</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <FiLogOut className="sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {/* Left: Input */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Blog Outline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <Input
                  placeholder="e.g., How to invest in real estate"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Keyword</label>
                <Input
                  placeholder="e.g., real estate investing"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading || !topic || !keyword || credits <= 0}
                className="w-full"
                size="lg"
              >
                {loading ? 'Generating...' : 'Generate Outline'}
              </Button>
              {credits <= 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm">
                  <p className="font-semibold text-yellow-800">Out of credits!</p>
                  <p className="text-yellow-700 mt-1">Upgrade to unlimited for $19/month</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Output */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle>Generated Outline</CardTitle>
              {output && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <FiCopy className="sm:mr-2" />
                    <span className="hidden sm:inline">Copy</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={loading}>
                    <FiRefreshCw className="sm:mr-2" />
                    <span className="hidden sm:inline">Regenerate</span>
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {!output && !loading && (
                <div className="text-center text-gray-400 py-12">
                  Enter a topic and keyword to generate your outline
                </div>
              )}
              {loading && (
                <div className="text-center text-gray-400 py-12">
                  Generating your outline...
                </div>
              )}
              {output && (
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[300px] sm:min-h-[500px] font-mono text-sm"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}