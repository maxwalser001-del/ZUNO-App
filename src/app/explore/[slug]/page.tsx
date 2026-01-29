'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Mock data
const mockCommunities: Record<string, {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  memberCount: number
  eventCount: number
  gradient: string
  category: string
  isPublic: boolean
  createdAt: string
  organizers: { id: string; name: string; role: string }[]
  recentMembers: { id: string; name: string; gradient: string }[]
}> = {
  'design-community': {
    id: '1',
    name: 'Design Community',
    slug: 'design-community',
    description: 'A community for designers to share work, get feedback, and grow together.',
    longDescription: `Welcome to the Design Community! We're a passionate group of designers, creatives, and visual thinkers who come together to share knowledge, provide feedback, and support each other's growth.

Whether you're a seasoned professional or just starting your design journey, you'll find a welcoming space here. We host regular events including design critiques, portfolio reviews, workshops on the latest tools, and networking sessions.

Our community believes in the power of collaboration and continuous learning. Join us to connect with fellow designers, stay updated on industry trends, and take your skills to the next level.`,
    memberCount: 2480,
    eventCount: 45,
    gradient: 'from-blue-500 to-violet-500',
    category: 'design',
    isPublic: true,
    createdAt: '2024-01-15',
    organizers: [
      { id: '1', name: 'Sarah Chen', role: 'Founder' },
      { id: '2', name: 'Mike Johnson', role: 'Co-organizer' },
    ],
    recentMembers: [
      { id: '1', name: 'Alex Kim', gradient: 'from-blue-500 to-cyan-500' },
      { id: '2', name: 'Jordan Lee', gradient: 'from-emerald-500 to-teal-500' },
      { id: '3', name: 'Taylor Swift', gradient: 'from-pink-500 to-rose-500' },
      { id: '4', name: 'Chris Brown', gradient: 'from-amber-500 to-orange-500' },
      { id: '5', name: 'Pat Wilson', gradient: 'from-indigo-500 to-purple-500' },
    ],
  },
  'tech-founders': {
    id: '2',
    name: 'Tech Founders',
    slug: 'tech-founders',
    description: 'Connect with fellow founders, share experiences, and build together.',
    longDescription: `Tech Founders is an exclusive community for startup founders and entrepreneurs in the technology space. We bring together visionaries who are building the future of technology.

Our community focuses on the unique challenges of founding and scaling tech companies. From fundraising strategies to team building, product development to market expansion - we cover it all through our events and discussions.

Join us to network with fellow founders, learn from experienced entrepreneurs, and find potential co-founders, investors, and early employees for your venture.`,
    memberCount: 1560,
    eventCount: 32,
    gradient: 'from-emerald-500 to-teal-500',
    category: 'startup',
    isPublic: true,
    createdAt: '2024-02-20',
    organizers: [
      { id: '3', name: 'David Park', role: 'Founder' },
    ],
    recentMembers: [
      { id: '6', name: 'Emma Davis', gradient: 'from-violet-500 to-purple-500' },
      { id: '7', name: 'Ryan Chen', gradient: 'from-sky-500 to-blue-500' },
      { id: '8', name: 'Lisa Wang', gradient: 'from-rose-500 to-pink-500' },
    ],
  },
  'ai-builders': {
    id: '3',
    name: 'AI Builders',
    slug: 'ai-builders',
    description: 'For developers and researchers building with artificial intelligence.',
    longDescription: `AI Builders is the premier community for developers, researchers, and enthusiasts who are building with artificial intelligence and machine learning technologies.

We explore cutting-edge topics including large language models, computer vision, reinforcement learning, and practical AI applications. Our events feature hands-on workshops, paper discussions, and talks from industry leaders.

Whether you're training your first neural network or deploying production ML systems, you'll find valuable resources and connections here.`,
    memberCount: 3200,
    eventCount: 28,
    gradient: 'from-cyan-500 to-blue-500',
    category: 'tech',
    isPublic: true,
    createdAt: '2024-03-10',
    organizers: [
      { id: '4', name: 'Dr. James Liu', role: 'Founder' },
      { id: '5', name: 'Anna Martinez', role: 'Co-organizer' },
    ],
    recentMembers: [
      { id: '9', name: 'Kevin Wu', gradient: 'from-cyan-500 to-teal-500' },
      { id: '10', name: 'Sophia Lee', gradient: 'from-purple-500 to-violet-500' },
    ],
  },
}

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Weekly Design Standup',
    date: '2024-12-15T10:00:00',
    attendees: 24,
    isOnline: true,
  },
  {
    id: '2',
    title: 'Portfolio Review Session',
    date: '2024-12-18T14:00:00',
    attendees: 18,
    isOnline: true,
  },
  {
    id: '3',
    title: 'Design Systems Workshop',
    date: '2024-12-22T11:00:00',
    attendees: 35,
    isOnline: false,
  },
]

export default function PublicCommunityPage() {
  const params = useParams()
  const slug = params.slug as string
  const [community, setCommunity] = useState<typeof mockCommunities['design-community'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'about' | 'events'>('about')

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCommunity(mockCommunities[slug] || null)
      setIsLoading(false)
    }, 500)
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center gap-3 text-zinc-500">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </div>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Community not found</h1>
          <p className="mt-2 text-zinc-500">The community you're looking for doesn't exist or is private.</p>
          <Link
            href="/explore"
            className="mt-6 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Browse Communities
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/explore" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
                <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Explore
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className={`h-24 w-24 flex-shrink-0 rounded-2xl bg-gradient-to-br ${community.gradient}`} />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{community.name}</h1>
              <p className="mt-2 text-lg text-zinc-500">{community.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {community.memberCount.toLocaleString()} members
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {community.eventCount} events
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
                </span>
              </div>
            </div>
            <Link
              href="/signup"
              className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Join Community
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab('about')}
              className={cn(
                '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'about'
                  ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              )}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={cn(
                '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'events'
                  ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              )}
            >
              Upcoming Events
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {activeTab === 'about' && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">About this community</h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {community.longDescription}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizers */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Organizers</h3>
                <ul className="mt-4 space-y-3">
                  {community.organizers.map((organizer) => (
                    <li key={organizer.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">{organizer.name}</p>
                        <p className="text-xs text-zinc-500">{organizer.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Members */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Recent Members</h3>
                <div className="mt-4 flex -space-x-2">
                  {community.recentMembers.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className={`h-10 w-10 rounded-full bg-gradient-to-br ring-2 ring-white dark:ring-zinc-900 ${member.gradient}`}
                      title={member.name}
                    />
                  ))}
                  {community.memberCount > 5 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-900">
                      +{(community.memberCount - 5).toLocaleString()}
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                  Join {community.memberCount.toLocaleString()} others in this community
                </p>
              </div>

              {/* CTA */}
              <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Ready to join?</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Create a free account to join this community and attend events.
                </p>
                <Link
                  href="/signup"
                  className="mt-4 block rounded-lg bg-zinc-900 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {mockUpcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">{event.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.attendees} attending
                          </span>
                          <span className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            event.isOnline
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          )}>
                            {event.isOnline ? 'Online' : 'In Person'}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/signup"
                        className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        Join to RSVP
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-zinc-500">
                <Link href="/signup" className="font-medium text-zinc-900 hover:underline dark:text-white">
                  Sign up
                </Link>
                {' '}to see more events and RSVP
              </p>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Want to attend events?</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Join this community to RSVP to events and get notified about new ones.
                </p>
                <Link
                  href="/signup"
                  className="mt-4 block rounded-lg bg-zinc-900 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </div>
            <p className="text-sm text-zinc-500">Building communities, together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
