import Link from 'next/link'

// Mock data - will be replaced with real data from database
const stats = [
  { name: 'Communities', value: '3', change: '+1 this month' },
  { name: 'Total Events', value: '12', change: '+4 this month' },
  { name: 'Connections', value: '248', change: '+23 this month' },
  { name: 'RSVPs', value: '18', change: 'Upcoming' },
]

const communities = [
  {
    id: '1',
    name: 'Design Community',
    slug: 'design-community',
    memberCount: 248,
    imageGradient: 'from-blue-500 to-violet-500',
    role: 'Owner',
  },
  {
    id: '2',
    name: 'Tech Founders',
    slug: 'tech-founders',
    memberCount: 156,
    imageGradient: 'from-emerald-500 to-teal-500',
    role: 'Admin',
  },
  {
    id: '3',
    name: 'Creative Writers',
    slug: 'creative-writers',
    memberCount: 89,
    imageGradient: 'from-orange-500 to-red-500',
    role: 'Member',
  },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Weekly Design Standup',
    community: 'Design Community',
    date: 'Tomorrow',
    time: '10:00 AM',
    attendees: 24,
    status: 'confirmed' as const,
  },
  {
    id: '2',
    title: 'Pitch Practice Session',
    community: 'Tech Founders',
    date: 'Friday',
    time: '2:00 PM',
    attendees: 12,
    status: 'confirmed' as const,
  },
  {
    id: '3',
    title: 'Monthly Creative Meetup',
    community: 'Creative Writers',
    date: 'Jan 15',
    time: '6:00 PM',
    attendees: 42,
    status: 'maybe' as const,
  },
  {
    id: '4',
    title: 'Design Workshop: Figma Tips',
    community: 'Design Community',
    date: 'Jan 18',
    time: '3:00 PM',
    attendees: 18,
    status: 'pending' as const,
  },
]

const recentActivity = [
  { id: '1', text: 'Sarah joined Design Community', time: '2 hours ago' },
  { id: '2', text: 'New event "Pitch Practice" created in Tech Founders', time: '5 hours ago' },
  { id: '3', text: 'You RSVPd to Monthly Creative Meetup', time: '1 day ago' },
  { id: '4', text: 'Mike commented on Weekly Design Standup', time: '2 days ago' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-zinc-500">Welcome back, Demo User</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
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
                New Community
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</p>
              <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Communities Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Your Communities
              </h2>
              <Link
                href="/dashboard/communities"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {communities.map((community) => (
                <Link
                  key={community.id}
                  href={`/dashboard/communities/${community.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${community.imageGradient}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white">{community.name}</p>
                    <p className="text-sm text-zinc-500">{community.memberCount} members</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      community.role === 'Owner'
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                        : community.role === 'Admin'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    {community.role}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Upcoming Events
              </h2>
              <Link
                href="/dashboard/events"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Attendees
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {upcomingEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-white">{event.title}</p>
                          <p className="text-sm text-zinc-500">{event.community}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-zinc-900 dark:text-white">{event.date}</p>
                        <p className="text-sm text-zinc-500">{event.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                              <div
                                key={i}
                                className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-900"
                              />
                            ))}
                          </div>
                          {event.attendees > 3 && (
                            <span className="text-sm text-zinc-500">+{event.attendees - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            event.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : event.status === 'maybe'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}
                        >
                          {event.status === 'confirmed'
                            ? 'Going'
                            : event.status === 'maybe'
                              ? 'Maybe'
                              : 'Not responded'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent Activity</h2>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between px-4 py-3">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{activity.text}</p>
                  <span className="text-xs text-zinc-500">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
