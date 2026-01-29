'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Mock search results
const mockCommunities = [
  { id: '1', name: 'Design Community', slug: 'design-community', description: 'A community for designers to share work', memberCount: 2480, gradient: 'from-blue-500 to-violet-500' },
  { id: '2', name: 'Tech Founders', slug: 'tech-founders', description: 'Connect with fellow founders', memberCount: 1560, gradient: 'from-emerald-500 to-teal-500' },
  { id: '3', name: 'AI Builders', slug: 'ai-builders', description: 'For developers building with AI', memberCount: 3200, gradient: 'from-cyan-500 to-blue-500' },
  { id: '4', name: 'Creative Writers', slug: 'creative-writers', description: 'Share your writing and get inspired', memberCount: 890, gradient: 'from-orange-500 to-red-500' },
]

const mockEvents = [
  { id: '1', title: 'Weekly Design Standup', community: 'Design Community', date: '2024-12-15', time: '10:00 AM', isOnline: true },
  { id: '2', title: 'Design Workshop: Figma Tips', community: 'Design Community', date: '2024-12-18', time: '2:00 PM', isOnline: true },
  { id: '3', title: 'Founders Networking', community: 'Tech Founders', date: '2024-12-20', time: '6:00 PM', isOnline: false },
  { id: '4', title: 'AI Paper Discussion', community: 'AI Builders', date: '2024-12-22', time: '11:00 AM', isOnline: true },
]

const mockUsers = [
  { id: '1', name: 'Sarah Chen', bio: 'Product Designer at Figma', communities: 5, gradient: 'from-blue-500 to-cyan-500' },
  { id: '2', name: 'Mike Johnson', bio: 'Startup Founder', communities: 3, gradient: 'from-emerald-500 to-teal-500' },
  { id: '3', name: 'Alex Kim', bio: 'Full-stack Developer', communities: 8, gradient: 'from-pink-500 to-rose-500' },
]

type TabType = 'all' | 'communities' | 'events' | 'people'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [searchQuery, setSearchQuery] = useState(query)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate search
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  const filteredCommunities = mockCommunities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  )

  const filteredEvents = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.community.toLowerCase().includes(query.toLowerCase())
  )

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.bio.toLowerCase().includes(query.toLowerCase())
  )

  const totalResults = filteredCommunities.length + filteredEvents.length + filteredUsers.length

  const tabs = [
    { id: 'all' as const, label: 'All', count: totalResults },
    { id: 'communities' as const, label: 'Communities', count: filteredCommunities.length },
    { id: 'events' as const, label: 'Events', count: filteredEvents.length },
    { id: 'people' as const, label: 'People', count: filteredUsers.length },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
                <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
              </div>
            </Link>
            <form action="/search" method="GET" className="flex-1 max-w-2xl">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search communities, events, people..."
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>
            </form>
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

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Search Info */}
        <div className="mb-6">
          {query ? (
            <>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Search results for "{query}"
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {totalResults} {totalResults === 1 ? 'result' : 'results'} found
              </p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Search</h1>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              )}
            >
              {tab.label}
              <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="mt-8 flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-zinc-500">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Searching...
            </div>
          </div>
        ) : totalResults === 0 && query ? (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">
              No results found
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Try a different search term or browse communities.
            </p>
            <Link
              href="/explore"
              className="mt-6 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Explore Communities
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {/* Communities */}
            {(activeTab === 'all' || activeTab === 'communities') && filteredCommunities.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Communities</h2>
                    <button
                      onClick={() => setActiveTab('communities')}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      View all ({filteredCommunities.length})
                    </button>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(activeTab === 'all' ? filteredCommunities.slice(0, 3) : filteredCommunities).map((community) => (
                    <Link
                      key={community.id}
                      href={`/explore/${community.slug}`}
                      className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    >
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${community.gradient}`} />
                      <h3 className="mt-4 font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                        {community.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{community.description}</p>
                      <p className="mt-3 text-sm text-zinc-500">
                        {community.memberCount.toLocaleString()} members
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Events */}
            {(activeTab === 'all' || activeTab === 'events') && filteredEvents.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Events</h2>
                    <button
                      onClick={() => setActiveTab('events')}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      View all ({filteredEvents.length})
                    </button>
                  </div>
                )}
                <div className="space-y-3">
                  {(activeTab === 'all' ? filteredEvents.slice(0, 3) : filteredEvents).map((event) => (
                    <Link
                      key={event.id}
                      href={`/dashboard/events/${event.id}`}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    >
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">{event.title}</h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-zinc-500">
                          <span>{event.community}</span>
                          <span>{event.date} at {event.time}</span>
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
                      <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* People */}
            {(activeTab === 'all' || activeTab === 'people') && filteredUsers.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">People</h2>
                    <button
                      onClick={() => setActiveTab('people')}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      View all ({filteredUsers.length})
                    </button>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(activeTab === 'all' ? filteredUsers.slice(0, 3) : filteredUsers).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${user.gradient}`} />
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">{user.name}</h3>
                        <p className="text-sm text-zinc-500">{user.bio}</p>
                        <p className="text-xs text-zinc-400">{user.communities} communities</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
