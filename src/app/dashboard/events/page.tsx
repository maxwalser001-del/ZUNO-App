'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock data - will be replaced with real data from database
const allEvents = [
  {
    id: '1',
    title: 'Weekly Design Standup',
    description: 'Share progress, blockers, and get feedback from the team.',
    community: { name: 'Design Community', slug: 'design-community' },
    date: '2025-01-30',
    time: '10:00 AM',
    location: 'Zoom',
    locationUrl: 'https://zoom.us/j/123456789',
    attendees: 24,
    capacity: 30,
    status: 'published' as const,
    rsvpStatus: 'confirmed' as const,
  },
  {
    id: '2',
    title: 'Pitch Practice Session',
    description: 'Practice your startup pitch and get feedback from experienced founders.',
    community: { name: 'Tech Founders', slug: 'tech-founders' },
    date: '2025-01-31',
    time: '2:00 PM',
    location: 'WeWork Downtown',
    locationUrl: null,
    attendees: 12,
    capacity: 20,
    status: 'published' as const,
    rsvpStatus: 'confirmed' as const,
  },
  {
    id: '3',
    title: 'Monthly Creative Meetup',
    description: 'Connect with fellow writers, share your work, and get inspired.',
    community: { name: 'Creative Writers', slug: 'creative-writers' },
    date: '2025-02-15',
    time: '6:00 PM',
    location: 'Central Library',
    locationUrl: 'https://maps.google.com',
    attendees: 42,
    capacity: 50,
    status: 'published' as const,
    rsvpStatus: 'maybe' as const,
  },
  {
    id: '4',
    title: 'Design Workshop: Figma Tips',
    description: 'Learn advanced Figma techniques from our expert designers.',
    community: { name: 'Design Community', slug: 'design-community' },
    date: '2025-02-18',
    time: '3:00 PM',
    location: 'Online',
    locationUrl: null,
    attendees: 18,
    capacity: 40,
    status: 'published' as const,
    rsvpStatus: null,
  },
  {
    id: '5',
    title: 'Founder Dinner',
    description: 'Exclusive dinner for community founders. Limited spots available.',
    community: { name: 'Tech Founders', slug: 'tech-founders' },
    date: '2025-02-20',
    time: '7:00 PM',
    location: 'The Capital Grille',
    locationUrl: null,
    attendees: 8,
    capacity: 12,
    status: 'published' as const,
    rsvpStatus: 'waitlisted' as const,
  },
  {
    id: '6',
    title: 'Writing Workshop: Story Structure',
    description: 'Deep dive into the fundamentals of compelling story structure.',
    community: { name: 'Creative Writers', slug: 'creative-writers' },
    date: '2025-02-25',
    time: '4:00 PM',
    location: 'Online',
    locationUrl: null,
    attendees: 28,
    capacity: null,
    status: 'draft' as const,
    rsvpStatus: null,
  },
]

const communities = [
  { name: 'All Communities', slug: 'all' },
  { name: 'Design Community', slug: 'design-community' },
  { name: 'Tech Founders', slug: 'tech-founders' },
  { name: 'Creative Writers', slug: 'creative-writers' },
]

const statusFilters = [
  { label: 'All Events', value: 'all' },
  { label: 'Going', value: 'confirmed' },
  { label: 'Maybe', value: 'maybe' },
  { label: 'Waitlisted', value: 'waitlisted' },
  { label: 'Not Responded', value: 'pending' },
]

const timeFilters = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Past Events', value: 'past' },
]

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function EventsPage() {
  const [selectedCommunity, setSelectedCommunity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedTime, setSelectedTime] = useState('upcoming')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const filteredEvents = allEvents.filter((event) => {
    if (selectedCommunity !== 'all' && event.community.slug !== selectedCommunity) {
      return false
    }
    if (selectedStatus !== 'all' && event.rsvpStatus !== selectedStatus) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Events</h1>
            <p className="text-sm text-zinc-500">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Event
            </span>
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Community Filter */}
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {communities.map((community) => (
              <option key={community.slug} value={community.slug}>
                {community.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {statusFilters.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          {/* Time Filter */}
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {timeFilters.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>

          <div className="flex-1" />

          {/* View Toggle */}
          <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded-l-lg px-3 py-2 text-sm transition-colors',
                viewMode === 'list'
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-r-lg px-3 py-2 text-sm transition-colors',
                viewMode === 'grid'
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Events List/Grid */}
        <div className="mt-6">
          {filteredEvents.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">
                No events found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Try adjusting your filters or create a new event.
              </p>
              <button className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                Create Event
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/dashboard/events/${event.id}`}
                          className="text-lg font-semibold text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
                        >
                          {event.title}
                        </Link>
                        {event.status === 'draft' && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-zinc-500 line-clamp-1">{event.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4 text-zinc-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatEventDate(event.date)} at {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg
                            className="h-4 w-4 text-zinc-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.location}
                        </span>
                        <Link
                          href={`/dashboard/communities/${event.community.slug}`}
                          className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <svg
                            className="h-4 w-4 text-zinc-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.community.name}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      {/* Attendees */}
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                            <div
                              key={i}
                              className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-900"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-zinc-500">
                          {event.attendees}
                          {event.capacity && `/${event.capacity}`} going
                        </span>
                      </div>
                      {/* RSVP Status */}
                      {event.rsvpStatus ? (
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium',
                            event.rsvpStatus === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : event.rsvpStatus === 'maybe'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                : event.rsvpStatus === 'waitlisted'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                          )}
                        >
                          {event.rsvpStatus === 'confirmed'
                            ? 'Going'
                            : event.rsvpStatus === 'maybe'
                              ? 'Maybe'
                              : event.rsvpStatus === 'waitlisted'
                                ? 'Waitlisted'
                                : 'Declined'}
                        </span>
                      ) : (
                        <button className="rounded-lg border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                          RSVP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/dashboard/communities/${event.community.slug}`}
                      className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      {event.community.name}
                    </Link>
                    {event.status === 'draft' && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Draft
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/dashboard/events/${event.id}`}
                    className="mt-2 block text-lg font-semibold text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
                  >
                    {event.title}
                  </Link>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{event.description}</p>
                  <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatEventDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-900"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">{event.attendees} going</span>
                    </div>
                    {event.rsvpStatus ? (
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-medium',
                          event.rsvpStatus === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : event.rsvpStatus === 'maybe'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              : event.rsvpStatus === 'waitlisted'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                        )}
                      >
                        {event.rsvpStatus === 'confirmed'
                          ? 'Going'
                          : event.rsvpStatus === 'maybe'
                            ? 'Maybe'
                            : event.rsvpStatus === 'waitlisted'
                              ? 'Waitlisted'
                              : 'Declined'}
                      </span>
                    ) : (
                      <button className="rounded-lg border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                        RSVP
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
