'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock data - will be replaced with real data
const community = {
  id: '1',
  name: 'Design Community',
  slug: 'design-community',
  description:
    'A community for designers to share work, get feedback, and grow together. We host weekly standups, workshops, and monthly meetups.',
  memberCount: 248,
  eventCount: 12,
  imageGradient: 'from-blue-500 to-violet-500',
  isPublic: true,
  createdAt: '2024-06-15',
  timezone: 'America/New_York',
}

const members = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'owner', joinedAt: '2024-06-15', avatar: 'from-blue-500 to-violet-500' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', joinedAt: '2024-06-20', avatar: 'from-emerald-500 to-teal-500' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'member', joinedAt: '2024-07-01', avatar: 'from-orange-500 to-red-500' },
  { id: '4', name: 'Alex Kim', email: 'alex@example.com', role: 'member', joinedAt: '2024-07-15', avatar: 'from-pink-500 to-rose-500' },
  { id: '5', name: 'Jordan Lee', email: 'jordan@example.com', role: 'member', joinedAt: '2024-08-01', avatar: 'from-cyan-500 to-blue-500' },
  { id: '6', name: 'Taylor Brown', email: 'taylor@example.com', role: 'member', joinedAt: '2024-08-10', avatar: 'from-amber-500 to-orange-500' },
]

const events = [
  { id: '1', title: 'Weekly Design Standup', date: '2025-01-30', time: '10:00 AM', attendees: 24, status: 'upcoming' },
  { id: '2', title: 'Design Workshop: Figma Tips', date: '2025-02-18', time: '3:00 PM', attendees: 18, status: 'upcoming' },
  { id: '3', title: 'Portfolio Review Session', date: '2025-02-25', time: '2:00 PM', attendees: 12, status: 'upcoming' },
  { id: '4', title: 'Monthly Design Meetup', date: '2025-01-15', time: '6:00 PM', attendees: 42, status: 'past' },
]

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'events', label: 'Events' },
  { id: 'members', label: 'Members' },
  { id: 'settings', label: 'Settings' },
]

export default function CommunityDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${community.imageGradient}`} />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {community.name}
                  </h1>
                  {!community.isPublic && (
                    <span className="rounded-full bg-zinc-100 p-1.5 dark:bg-zinc-800">
                      <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  {community.memberCount} members · {community.eventCount} events
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInviteModal(true)}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Invite
                </span>
              </button>
              <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab community={community} events={events} members={members} />}
        {activeTab === 'events' && <EventsTab events={events} />}
        {activeTab === 'members' && <MembersTab members={members} />}
        {activeTab === 'settings' && <SettingsTab community={community} />}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Invite Members</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email addresses
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter email addresses, separated by commas"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Personal message (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Add a personal note to your invitation..."
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Or share invite link</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://zuno.app/invite/abc123"
                    className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  />
                  <button className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                  Send Invites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function OverviewTab({ community, events, members }: { community: typeof community; events: typeof events; members: typeof members }) {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3)
  const recentMembers = members.slice(0, 5)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* About */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">About</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{community.description}</p>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Upcoming Events</h2>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">{event.title}</p>
                  <p className="text-sm text-zinc-500">{event.date} at {event.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">{event.attendees} going</span>
                  <button className="rounded-lg border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Stats */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Stats</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{community.memberCount}</p>
              <p className="text-sm text-zinc-500">Members</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{community.eventCount}</p>
              <p className="text-sm text-zinc-500">Events</p>
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Members</h2>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${member.avatar}`} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">{member.name}</p>
                  <p className="text-xs text-zinc-500 capitalize">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EventsTab({ events }: { events: typeof events }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div>
            <div className="flex items-center gap-3">
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{event.title}</p>
              {event.status === 'past' && (
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Past
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-500">{event.date} at {event.time}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">{event.attendees} attendees</span>
            {event.status === 'upcoming' && (
              <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                RSVP
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function MembersTab({ members }: { members: typeof members }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-800">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Joined</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${member.avatar}`} />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-zinc-500">{member.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                  member.role === 'owner'
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : member.role === 'admin'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                )}>
                  {member.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500">{member.joinedAt}</td>
              <td className="px-6 py-4 text-right">
                <button className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SettingsTab({ community }: { community: typeof community }) {
  return (
    <div className="max-w-2xl space-y-6">
      {/* General Settings */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">General Settings</h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Community Name</label>
            <input
              type="text"
              defaultValue={community.name}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
            <textarea
              rows={3}
              defaultValue={community.description}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Timezone</label>
            <select className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
              <option>UTC</option>
            </select>
          </div>
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Save Changes
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/10">
        <h2 className="text-lg font-semibold text-red-900 dark:text-red-400">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          Once you delete a community, there is no going back. Please be certain.
        </p>
        <button className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20">
          Delete Community
        </button>
      </div>
    </div>
  )
}
