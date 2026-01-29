'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Mock analytics data
const communityInfo = {
  name: 'Design Community',
  slug: 'design-community',
  gradient: 'from-blue-500 to-violet-500',
}

const overviewStats = [
  { label: 'Total Members', value: '2,480', change: '+12%', changeType: 'positive' as const },
  { label: 'Active Members', value: '1,856', change: '+8%', changeType: 'positive' as const },
  { label: 'Events This Month', value: '12', change: '+3', changeType: 'positive' as const },
  { label: 'Avg. Attendance', value: '78%', change: '-2%', changeType: 'negative' as const },
]

const memberGrowthData = [
  { month: 'Jul', members: 1820 },
  { month: 'Aug', members: 1950 },
  { month: 'Sep', members: 2100 },
  { month: 'Oct', members: 2250 },
  { month: 'Nov', members: 2380 },
  { month: 'Dec', members: 2480 },
]

const eventAttendanceData = [
  { event: 'Weekly Design Standup', date: 'Dec 15', rsvps: 45, attended: 38, rate: '84%' },
  { event: 'Portfolio Review Session', date: 'Dec 12', rsvps: 32, attended: 28, rate: '88%' },
  { event: 'Figma Workshop', date: 'Dec 8', rsvps: 60, attended: 52, rate: '87%' },
  { event: 'Design Critique', date: 'Dec 5', rsvps: 25, attended: 18, rate: '72%' },
  { event: 'UX Research Talk', date: 'Dec 1', rsvps: 55, attended: 42, rate: '76%' },
]

const topMembers = [
  { name: 'Sarah Chen', eventsAttended: 18, role: 'Member', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Mike Johnson', eventsAttended: 15, role: 'Admin', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Alex Kim', eventsAttended: 14, role: 'Member', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Jordan Lee', eventsAttended: 12, role: 'Member', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Taylor Swift', eventsAttended: 11, role: 'Member', gradient: 'from-indigo-500 to-purple-500' },
]

const membershipBreakdown = [
  { role: 'Members', count: 2420, percentage: 97.6 },
  { role: 'Admins', count: 8, percentage: 0.3 },
  { role: 'Moderators', count: 12, percentage: 0.5 },
  { role: 'Owner', count: 1, percentage: 0.04 },
]

const timeRanges = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: '90 days', value: '90d' },
  { label: '12 months', value: '12m' },
]

export default function AnalyticsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [timeRange, setTimeRange] = useState('30d')

  const maxMembers = Math.max(...memberGrowthData.map((d) => d.members))

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/communities/${slug}`}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${communityInfo.gradient}`} />
              <div>
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Analytics</h1>
                <p className="text-sm text-zinc-500">{communityInfo.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg',
                    timeRange === range.value
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                <span
                  className={cn(
                    'text-sm font-medium',
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Member Growth Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Member Growth</h2>
              <p className="text-sm text-zinc-500">New members over time</p>

              {/* Simple Bar Chart */}
              <div className="mt-6">
                <div className="flex items-end justify-between gap-2" style={{ height: '200px' }}>
                  {memberGrowthData.map((data) => (
                    <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-blue-500 to-violet-500 transition-all"
                        style={{ height: `${(data.members / maxMembers) * 180}px` }}
                      />
                      <span className="text-xs text-zinc-500">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-zinc-500">
                  <span>0</span>
                  <span>{maxMembers.toLocaleString()} members</span>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Breakdown */}
          <div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Membership</h2>
              <p className="text-sm text-zinc-500">By role</p>

              <div className="mt-6 space-y-4">
                {membershipBreakdown.map((item) => (
                  <div key={item.role}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-700 dark:text-zinc-300">{item.role}</span>
                      <span className="font-medium text-zinc-900 dark:text-white">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                        style={{ width: `${Math.max(item.percentage, 2)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Event Attendance */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Event Attendance</h2>
              <p className="text-sm text-zinc-500">Recent events performance</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-sm text-zinc-500 dark:border-zinc-800">
                    <th className="px-6 py-3 font-medium">Event</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">RSVPs</th>
                    <th className="px-6 py-3 font-medium text-right">Attended</th>
                    <th className="px-6 py-3 font-medium text-right">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {eventAttendanceData.map((event, index) => (
                    <tr
                      key={index}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                        {event.event}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">{event.date}</td>
                      <td className="px-6 py-4 text-right text-sm text-zinc-500">{event.rsvps}</td>
                      <td className="px-6 py-4 text-right text-sm text-zinc-500">{event.attended}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            parseInt(event.rate) >= 80
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : parseInt(event.rate) >= 70
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          )}
                        >
                          {event.rate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Members */}
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Most Active Members</h2>
              <p className="text-sm text-zinc-500">By event attendance</p>
            </div>
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {topMembers.map((member, index) => (
                <li key={member.name} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {index + 1}
                    </span>
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${member.gradient}`} />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-zinc-500">{member.role}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    {member.eventsAttended} events
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Quick Insights</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900">
              <div className="flex items-center gap-2 text-emerald-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm font-medium">Growth Trend</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Member growth is up 12% this month, above your 10% target.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900">
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Engagement</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                75% of members have attended at least one event.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900">
              <div className="flex items-center gap-2 text-amber-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Best Time</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Events at 10 AM on Fridays have the highest attendance.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900">
              <div className="flex items-center gap-2 text-violet-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm font-medium">Suggestion</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Consider adding more workshop-style events - they have 15% higher attendance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
