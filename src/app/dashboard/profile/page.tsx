import Link from 'next/link'

// Mock user data
const user = {
  id: '1',
  name: 'Demo User',
  email: 'demo@zuno.app',
  bio: 'Passionate about building communities and connecting people. Always looking for new ways to bring people together.',
  avatarGradient: 'from-blue-500 to-violet-500',
  joinedAt: 'June 2024',
  location: 'San Francisco, CA',
  website: 'https://example.com',
}

const stats = [
  { label: 'Communities', value: 5 },
  { label: 'Events Attended', value: 23 },
  { label: 'Events Hosted', value: 8 },
  { label: 'Connections', value: 156 },
]

const communities = [
  { id: '1', name: 'Design Community', slug: 'design-community', role: 'Owner', memberCount: 248, gradient: 'from-blue-500 to-violet-500' },
  { id: '2', name: 'Tech Founders', slug: 'tech-founders', role: 'Admin', memberCount: 156, gradient: 'from-emerald-500 to-teal-500' },
  { id: '3', name: 'Creative Writers', slug: 'creative-writers', role: 'Member', memberCount: 89, gradient: 'from-orange-500 to-red-500' },
]

const recentActivity = [
  { id: '1', type: 'event_rsvp', text: 'RSVPd to Weekly Design Standup', time: '2 hours ago' },
  { id: '2', type: 'event_host', text: 'Created Design Workshop: Figma Tips', time: '1 day ago' },
  { id: '3', type: 'community_join', text: 'Joined Creative Writers community', time: '3 days ago' },
  { id: '4', type: 'event_attend', text: 'Attended Monthly Founders Meetup', time: '1 week ago' },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="px-6 py-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${user.avatarGradient}`} />

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{user.name}</h1>
              <p className="mt-1 text-zinc-500">{user.email}</p>
              {user.bio && (
                <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">{user.bio}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 sm:justify-start">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {user.joinedAt}
                </span>
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <Link
              href="/dashboard/settings"
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Communities */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Communities</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {communities.map((community) => (
                <Link
                  key={community.id}
                  href={`/dashboard/communities/${community.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${community.gradient}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white">{community.name}</p>
                    <p className="text-sm text-zinc-500">{community.memberCount} members</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    community.role === 'Owner'
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                      : community.role === 'Admin'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {community.role}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent Activity</h2>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="px-4 py-3">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{activity.text}</p>
                    <p className="mt-1 text-xs text-zinc-500">{activity.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
