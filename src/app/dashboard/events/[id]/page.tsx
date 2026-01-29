'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock data
const event = {
  id: '1',
  title: 'Weekly Design Standup',
  description: `Join us for our weekly design standup where we share progress, discuss blockers, and get feedback from the team.

This is a great opportunity to:
- Share what you've been working on
- Get constructive feedback from peers
- Learn from others' design processes
- Build connections with fellow designers

Whether you're a seasoned designer or just starting out, everyone is welcome to participate and learn.`,
  community: { name: 'Design Community', slug: 'design-community' },
  date: 'Thursday, January 30, 2025',
  time: '10:00 AM - 11:00 AM',
  timezone: 'Eastern Time (ET)',
  location: 'Zoom',
  locationUrl: 'https://zoom.us/j/123456789',
  capacity: 30,
  status: 'published' as const,
  host: { name: 'Sarah Chen', avatar: 'from-blue-500 to-violet-500' },
}

const attendees = [
  { id: '1', name: 'Sarah Chen', status: 'confirmed', avatar: 'from-blue-500 to-violet-500', isHost: true },
  { id: '2', name: 'Mike Johnson', status: 'confirmed', avatar: 'from-emerald-500 to-teal-500', isHost: false },
  { id: '3', name: 'Emily Davis', status: 'confirmed', avatar: 'from-orange-500 to-red-500', isHost: false },
  { id: '4', name: 'Alex Kim', status: 'confirmed', avatar: 'from-pink-500 to-rose-500', isHost: false },
  { id: '5', name: 'Jordan Lee', status: 'maybe', avatar: 'from-cyan-500 to-blue-500', isHost: false },
  { id: '6', name: 'Taylor Brown', status: 'confirmed', avatar: 'from-amber-500 to-orange-500', isHost: false },
]

const confirmedCount = attendees.filter((a) => a.status === 'confirmed').length
const maybeCount = attendees.filter((a) => a.status === 'maybe').length

export default function EventDetailPage() {
  const [rsvpStatus, setRsvpStatus] = useState<'confirmed' | 'maybe' | 'declined' | null>(null)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="px-6 py-6">
          <Link
            href="/dashboard/events"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{event.title}</h1>
              </div>
              <Link
                href={`/dashboard/communities/${event.community.slug}`}
                className="mt-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                {event.community.name}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              <button className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Event Details</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{event.date}</p>
                    <p className="text-sm text-zinc-500">{event.time} ({event.timezone})</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{event.location}</p>
                    {event.locationUrl && (
                      <a
                        href={event.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Join meeting →
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Hosted by</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${event.host.avatar}`} />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{event.host.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">About this event</h2>
              <div className="mt-4 prose prose-zinc dark:prose-invert prose-sm max-w-none">
                {event.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-zinc-600 dark:text-zinc-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Your RSVP</h2>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setRsvpStatus('confirmed')}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors',
                    rsvpStatus === 'confirmed'
                      ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-900/20'
                      : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800'
                  )}
                >
                  <span className={cn('font-medium', rsvpStatus === 'confirmed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300')}>
                    Going
                  </span>
                  {rsvpStatus === 'confirmed' && (
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => setRsvpStatus('maybe')}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors',
                    rsvpStatus === 'maybe'
                      ? 'border-amber-500 bg-amber-50 dark:border-amber-500 dark:bg-amber-900/20'
                      : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800'
                  )}
                >
                  <span className={cn('font-medium', rsvpStatus === 'maybe' ? 'text-amber-700 dark:text-amber-400' : 'text-zinc-700 dark:text-zinc-300')}>
                    Maybe
                  </span>
                  {rsvpStatus === 'maybe' && (
                    <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => setRsvpStatus('declined')}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors',
                    rsvpStatus === 'declined'
                      ? 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                      : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800'
                  )}
                >
                  <span className={cn('font-medium', rsvpStatus === 'declined' ? 'text-red-700 dark:text-red-400' : 'text-zinc-700 dark:text-zinc-300')}>
                    Can't go
                  </span>
                  {rsvpStatus === 'declined' && (
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Attendees Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Attendees</h2>
                <span className="text-sm text-zinc-500">
                  {confirmedCount}/{event.capacity}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(confirmedCount / event.capacity) * 100}%` }}
                />
              </div>

              <div className="mt-2 flex gap-4 text-sm text-zinc-500">
                <span>{confirmedCount} going</span>
                <span>{maybeCount} maybe</span>
              </div>

              <div className="mt-4 space-y-3">
                {attendees.slice(0, 5).map((attendee) => (
                  <div key={attendee.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${attendee.avatar}`} />
                      <div>
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {attendee.name}
                        </span>
                        {attendee.isHost && (
                          <span className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            Host
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium',
                        attendee.status === 'confirmed'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      )}
                    >
                      {attendee.status === 'confirmed' ? 'Going' : 'Maybe'}
                    </span>
                  </div>
                ))}
              </div>

              {attendees.length > 5 && (
                <button className="mt-4 w-full text-center text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  View all {attendees.length} attendees
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
