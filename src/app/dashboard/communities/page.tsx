'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock data - will be replaced with real data from database
const allCommunities = [
  {
    id: '1',
    name: 'Design Community',
    slug: 'design-community',
    description: 'A community for designers to share work, get feedback, and grow together.',
    memberCount: 248,
    eventCount: 12,
    imageGradient: 'from-blue-500 to-violet-500',
    role: 'owner' as const,
    isPublic: true,
    createdAt: '2024-06-15',
  },
  {
    id: '2',
    name: 'Tech Founders',
    slug: 'tech-founders',
    description: 'Connect with fellow founders, share experiences, and build together.',
    memberCount: 156,
    eventCount: 8,
    imageGradient: 'from-emerald-500 to-teal-500',
    role: 'admin' as const,
    isPublic: false,
    createdAt: '2024-08-22',
  },
  {
    id: '3',
    name: 'Creative Writers',
    slug: 'creative-writers',
    description: 'For writers of all levels to share their work and get inspired.',
    memberCount: 89,
    eventCount: 5,
    imageGradient: 'from-orange-500 to-red-500',
    role: 'member' as const,
    isPublic: true,
    createdAt: '2024-10-01',
  },
  {
    id: '4',
    name: 'Product Managers',
    slug: 'product-managers',
    description: 'A space for PMs to discuss strategy, share frameworks, and learn.',
    memberCount: 312,
    eventCount: 15,
    imageGradient: 'from-pink-500 to-rose-500',
    role: 'member' as const,
    isPublic: true,
    createdAt: '2024-04-10',
  },
  {
    id: '5',
    name: 'AI Enthusiasts',
    slug: 'ai-enthusiasts',
    description: 'Explore the latest in AI, machine learning, and emerging tech.',
    memberCount: 521,
    eventCount: 22,
    imageGradient: 'from-cyan-500 to-blue-500',
    role: 'member' as const,
    isPublic: true,
    createdAt: '2024-03-05',
  },
]

const roleFilters = [
  { label: 'All Communities', value: 'all' },
  { label: 'Owned', value: 'owner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
]

export default function CommunitiesPage() {
  const [selectedRole, setSelectedRole] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredCommunities = allCommunities.filter((community) => {
    if (selectedRole !== 'all' && community.role !== selectedRole) {
      return false
    }
    if (searchQuery && !community.name.toLowerCase().includes(searchQuery.toLowerCase())) {
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
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Communities</h1>
            <p className="text-sm text-zinc-500">
              {filteredCommunities.length} communit{filteredCommunities.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
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
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
            />
          </div>

          {/* Role Filter */}
          <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
            {roleFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedRole(filter.value)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg',
                  selectedRole === filter.value
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="mt-6">
          {filteredCommunities.length === 0 ? (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">
                No communities found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Try adjusting your filters or create a new community.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Create Community
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCommunities.map((community) => (
                <Link
                  key={community.id}
                  href={`/dashboard/communities/${community.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${community.imageGradient}`}
                    />
                    <div className="flex items-center gap-2">
                      {!community.isPublic && (
                        <span className="rounded-full bg-zinc-100 p-1.5 dark:bg-zinc-800">
                          <svg
                            className="h-3.5 w-3.5 text-zinc-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </span>
                      )}
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-medium',
                          community.role === 'owner'
                            ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                            : community.role === 'admin'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                        )}
                      >
                        {community.role.charAt(0).toUpperCase() + community.role.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                    {community.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{community.description}</p>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {community.memberCount} members
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {community.eventCount} events
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Create Community
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Community Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Design Community"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What's your community about?"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Visibility
                </label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      defaultChecked
                      className="h-4 w-4 text-zinc-900"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="visibility" value="private" className="h-4 w-4" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Private</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
