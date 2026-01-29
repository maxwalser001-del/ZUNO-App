'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock notifications data
const allNotifications = [
  {
    id: '1',
    type: 'event_reminder' as const,
    title: 'Event starting soon',
    message: 'Weekly Design Standup starts in 1 hour',
    link: '/dashboard/events/1',
    read: false,
    time: '1 hour ago',
  },
  {
    id: '2',
    type: 'new_member' as const,
    title: 'New member joined',
    message: 'Sarah Chen joined Design Community',
    link: '/dashboard/communities/design-community',
    read: false,
    time: '2 hours ago',
  },
  {
    id: '3',
    type: 'event_rsvp' as const,
    title: 'RSVP confirmed',
    message: "You're confirmed for Design Workshop: Figma Tips",
    link: '/dashboard/events/2',
    read: false,
    time: '5 hours ago',
  },
  {
    id: '4',
    type: 'community_invite' as const,
    title: 'Community invitation',
    message: 'Mike Johnson invited you to join Product Managers',
    link: '/invite/abc123',
    read: true,
    time: '1 day ago',
  },
  {
    id: '5',
    type: 'event_update' as const,
    title: 'Event updated',
    message: 'Monthly Founders Meetup location has changed',
    link: '/dashboard/events/3',
    read: true,
    time: '2 days ago',
  },
  {
    id: '6',
    type: 'new_event' as const,
    title: 'New event created',
    message: 'Portfolio Review Session was created in Design Community',
    link: '/dashboard/events/4',
    read: true,
    time: '3 days ago',
  },
  {
    id: '7',
    type: 'mention' as const,
    title: 'You were mentioned',
    message: 'Alex Kim mentioned you in a discussion',
    link: '#',
    read: true,
    time: '1 week ago',
  },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'events', label: 'Events' },
  { id: 'communities', label: 'Communities' },
]

const notificationIcons = {
  event_reminder: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  new_member: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  event_rsvp: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  community_invite: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  event_update: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  new_event: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  mention: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  ),
}

const notificationColors = {
  event_reminder: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  new_member: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  event_rsvp: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  community_invite: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  event_update: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  new_event: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  mention: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState(allNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'unread') return !notification.read
    if (activeFilter === 'events') return ['event_reminder', 'event_rsvp', 'event_update', 'new_event'].includes(notification.type)
    if (activeFilter === 'communities') return ['new_member', 'community_invite'].includes(notification.type)
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Notifications</h1>
            <p className="text-sm text-zinc-500">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Mark all as read
            </button>
          )}
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                activeFilter === filter.id
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              )}
            >
              {filter.label}
              {filter.id === 'unread' && unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="mt-6">
          {filteredNotifications.length === 0 ? (
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">
                No notifications
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                You're all caught up! Check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.link}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-sm',
                    notification.read
                      ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                      : 'border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800'
                  )}
                >
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', notificationColors[notification.type])}>
                    {notificationIcons[notification.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn('font-medium', notification.read ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-white')}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500">{notification.message}</p>
                    <p className="mt-1 text-xs text-zinc-400">{notification.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
