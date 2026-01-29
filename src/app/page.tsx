import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
              <span className="text-sm font-bold text-white dark:text-zinc-900">Z</span>
            </div>
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">Zuno</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
              The operating system for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                thriving communities
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Bring your community together with powerful tools for events, member management,
              and meaningful connections. Simple to use, beautifully designed.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="w-full rounded-full bg-zinc-900 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md sm:w-auto dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Start for free
              </Link>
              <Link
                href="#features"
                className="w-full rounded-full border border-zinc-300 bg-white px-8 py-3 text-base font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 sm:mt-20">
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="rounded-xl bg-white p-6 dark:bg-zinc-950">
                  {/* Mock Dashboard */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Design Community</div>
                        <div className="text-sm text-zinc-500">248 members</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        Events
                      </div>
                      <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        Members
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {[
                      { title: 'Weekly Standup', date: 'Tomorrow, 10:00 AM', attendees: 24 },
                      { title: 'Design Workshop', date: 'Friday, 2:00 PM', attendees: 18 },
                      { title: 'Monthly Meetup', date: 'Jan 15, 6:00 PM', attendees: 42 },
                    ].map((event, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-zinc-100 p-4 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700"
                      >
                        <div className="font-medium text-zinc-900 dark:text-white">{event.title}</div>
                        <div className="mt-1 text-sm text-zinc-500">{event.date}</div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-950"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-zinc-500">+{event.attendees - 3} going</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Everything you need to run your community
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Powerful features designed to help you build, manage, and grow your community.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Member Management',
                description: 'Organize members with roles, track engagement, and build a thriving community directory.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Event Planning',
                description: 'Create and manage events with RSVPs, waitlists, reminders, and attendance tracking.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Smart Invites',
                description: 'Invite members with personalized links, track invite status, and grow your community.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Privacy First',
                description: 'Control who sees what with granular privacy settings. Your community, your rules.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Lightning Fast',
                description: 'Built on modern technology for instant load times and a smooth experience.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                title: 'Beautiful Design',
                description: 'A clean, intuitive interface that your members will love using every day.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Three simple steps to launch your community on Zuno.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Create your community',
                description: 'Set up your community space with a name, description, and customize your settings.',
              },
              {
                step: '02',
                title: 'Invite your members',
                description: 'Send personalized invites or share your community link to start growing.',
              },
              {
                step: '03',
                title: 'Host your first event',
                description: 'Create an event, collect RSVPs, and bring your community together.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-zinc-100 dark:text-zinc-800">{item.step}</div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-200 bg-zinc-900 py-24 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build your community?
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Join thousands of community leaders who trust Zuno to bring their people together.
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex rounded-full bg-white px-8 py-3 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-100"
              >
                Get started for free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">About</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Features</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Pricing</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Privacy</Link>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Terms</Link>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} Zuno. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
