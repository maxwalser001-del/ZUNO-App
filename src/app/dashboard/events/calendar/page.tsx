'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock events data
const mockEvents = [
  { id: '1', title: 'Weekly Design Standup', date: '2024-12-15', time: '10:00', community: 'Design Community', color: 'bg-blue-500' },
  { id: '2', title: 'Portfolio Review', date: '2024-12-18', time: '14:00', community: 'Design Community', color: 'bg-blue-500' },
  { id: '3', title: 'Founders Meetup', date: '2024-12-20', time: '18:00', community: 'Tech Founders', color: 'bg-emerald-500' },
  { id: '4', title: 'AI Workshop', date: '2024-12-22', time: '11:00', community: 'AI Builders', color: 'bg-cyan-500' },
  { id: '5', title: 'Design Critique', date: '2024-12-22', time: '15:00', community: 'Design Community', color: 'bg-blue-500' },
  { id: '6', title: 'Startup Pitch Practice', date: '2024-12-28', time: '16:00', community: 'Tech Founders', color: 'bg-emerald-500' },
  { id: '7', title: 'Year End Celebration', date: '2024-12-31', time: '19:00', community: 'Design Community', color: 'bg-blue-500' },
  { id: '8', title: 'Design Standup', date: '2025-01-05', time: '10:00', community: 'Design Community', color: 'bg-blue-500' },
  { id: '9', title: 'ML Paper Discussion', date: '2025-01-08', time: '13:00', community: 'AI Builders', color: 'bg-cyan-500' },
  { id: '10', title: 'Product Launch Review', date: '2025-01-12', time: '14:00', community: 'Tech Founders', color: 'bg-emerald-500' },
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [view, setView] = useState<'month' | 'week'>('month')

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate())

  // Group events by date
  const eventsByDate = mockEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = []
    }
    acc[event.date].push(event)
    return acc
  }, {} as Record<string, typeof mockEvents>)

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const goToToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedDate(todayKey)
  }

  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : []

  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/events"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Calendar</h1>
              <p className="text-sm text-zinc-500">View your events by date</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setView('month')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-l-lg transition-colors',
                  view === 'month'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                )}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-r-lg transition-colors',
                  view === 'week'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                )}
              >
                Week
              </button>
            </div>
            <Link
              href="/dashboard/events/new"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Create Event
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Month Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {months[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={goToToday}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Today
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="rounded-lg border border-zinc-200 p-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-sm font-medium text-zinc-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[120px] border-b border-r border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
                    />
                  )
                }

                const dateKey = formatDateKey(currentYear, currentMonth, day)
                const dayEvents = eventsByDate[dateKey] || []
                const isToday = dateKey === todayKey
                const isSelected = dateKey === selectedDate

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateKey)}
                    className={cn(
                      'min-h-[120px] border-b border-r border-zinc-100 p-2 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800',
                      isSelected && 'bg-zinc-50 dark:bg-zinc-800',
                      (index + 1) % 7 === 0 && 'border-r-0'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm',
                        isToday
                          ? 'bg-zinc-900 font-semibold text-white dark:bg-white dark:text-zinc-900'
                          : 'text-zinc-700 dark:text-zinc-300'
                      )}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            'truncate rounded px-1.5 py-0.5 text-xs font-medium text-white',
                            event.color
                          )}
                        >
                          {event.time} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="px-1.5 text-xs text-zinc-500">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Selected Date Events */}
        <div className="w-80 border-l border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          {selectedDate ? (
            <>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {selectedDateEvents.length === 0 ? (
                <div className="mt-6 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600"
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
                  <p className="mt-2 text-sm text-zinc-500">No events scheduled</p>
                  <Link
                    href="/dashboard/events/new"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:underline dark:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create an event
                  </Link>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {selectedDateEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/dashboard/events/${event.id}`}
                      className="block rounded-lg border border-zinc-200 p-3 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:hover:border-zinc-600"
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', event.color)} />
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {event.title}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </span>
                        <span>{event.community}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600"
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
              <p className="mt-2 text-sm text-zinc-500">Select a date to view events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
