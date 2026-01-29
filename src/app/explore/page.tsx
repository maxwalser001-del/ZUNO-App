'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'startup', label: 'Startups', icon: '🚀' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'product', label: 'Product', icon: '📦' },
]

const featuredCommunities = [
  {
    id: '1',
    name: 'Design Community',
    slug: 'design-community',
    description: 'A community for designers to share work, get feedback, and grow together.',
    memberCount: 2480,
    eventCount: 45,
    gradient: 'from-blue-500 to-violet-500',
    category: 'design',
    featured: true,
  },
  {
    id: '2',
    name: 'Tech Founders',
    slug: 'tech-founders',
    description: 'Connect with fellow founders, share experiences, and build together.',
    memberCount: 1560,
    eventCount: 32,
    gradient: 'from-emerald-500 to-teal-500',
    category: 'startup',
    featured: true,
  },
  {
    id: '3',
    name: 'AI Builders',
    slug: 'ai-builders',
    description: 'For developers and researchers building with artificial intelligence.',
    memberCount: 3200,
    eventCount: 28,
    gradient: 'from-cyan-500 to-blue-500',
    category: 'tech',
    featured: true,
  },
]

const allCommunities = [
  ...featuredCommunities,
  {
    id: '4',
    name: 'Creative Writers',
    slug: 'creative-writers',
    description: 'For writers of all levels to share their work and get inspired.',
    memberCount: 890,
    eventCount: 18,
    gradient: 'from-orange-500 to-red-500',
    category: 'writing',
    featured: false,
  },
  {
    id: '5',
    name: 'Product Managers',
    slug: 'product-managers',
    description: 'A space for PMs to discuss strategy, share frameworks, and learn.',
    memberCount: 1240,
    eventCount: 22,
    gradient: 'from-pink-500 to-rose-500',
    category: 'product',
    featured: false,
  },
  {
    id: '6',
    name: 'Growth Hackers',
    slug: 'growth-hackers',
    description: 'Marketing professionals focused on data-driven growth strategies.',
    memberCount: 780,
    eventCount: 15,
    gradient: 'from-amber-500 to-orange-500',
    category: 'marketing',
    featured: false,
  },
  {
    id: '7',
    name: 'UX Research',
    slug: 'ux-research',
    description: 'Dedicated to user research methodologies and best practices.',
    memberCount: 650,
    eventCount: 12,
    gradient: 'from-indigo-500 to-purple-500',
    category: 'design',
    featured: false,
  },
  {
    id: '8',
    name: 'DevOps Engineers',
    slug: 'devops-engineers',
    description: 'Infrastructure, CI/CD, and platform engineering discussions.',
    memberCount: 920,
    eventCount: 14,
    gradient: 'from-slate-500 to-zinc-600',
    category: 'tech',
    featured: false,
  },
  {
    id: '9',
    name: 'Indie Hackers',
    slug: 'indie-hackers',
    description: 'Solo founders and small teams building profitable businesses.',
    memberCount: 2100,
    eventCount: 38,
    gradient: 'from-yellow-500 to-amber-500',
    category: 'startup',
    featured: false,
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredCommunities = allCommunities.filter((community) => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || community.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
                  <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
                </div>
                <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
              </Link>
            </div>
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

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Explore Communities
            </h1>
            <p className="mt-2 text-zinc-500">
              Discover amazing communities and connect with people who share your interests.
            </p>
          </div>

          {/* Search */}
          <div className="relative mt-6">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search communities..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeCategory === category.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                )}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Featured Section */}
        {activeCategory === 'all' && !searchQuery && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Featured Communities</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {featuredCommunities.map((community) => (
                <Link
                  key={community.id}
                  href={`/explore/${community.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${community.gradient}`} />
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                    {community.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{community.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                    <span>{community.memberCount.toLocaleString()} members</span>
                    <span>{community.eventCount} events</span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Featured
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Communities */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {activeCategory === 'all' ? 'All Communities' : `${categories.find(c => c.id === activeCategory)?.label} Communities`}
            </h2>
            <span className="text-sm text-zinc-500">{filteredCommunities.length} communities</span>
          </div>

          {filteredCommunities.length === 0 ? (
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
                No communities found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Try adjusting your search or browse different categories.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCommunities.filter(c => !c.featured || activeCategory !== 'all' || searchQuery).map((community) => (
                <Link
                  key={community.id}
                  href={`/explore/${community.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${community.gradient}`} />
                    {community.featured && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                    {community.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{community.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                    <span>{community.memberCount.toLocaleString()} members</span>
                    <span>{community.eventCount} events</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
