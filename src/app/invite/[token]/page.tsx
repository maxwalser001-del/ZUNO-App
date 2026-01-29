'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Mock data - will be fetched based on token
const invite = {
  id: '1',
  community: {
    name: 'Design Community',
    slug: 'design-community',
    description: 'A community for designers to share work, get feedback, and grow together.',
    memberCount: 248,
    imageGradient: 'from-blue-500 to-violet-500',
  },
  inviter: {
    name: 'Sarah Chen',
    avatar: 'from-blue-500 to-violet-500',
  },
  status: 'pending' as 'pending' | 'accepted' | 'expired',
}

export default function InvitePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const handleAccept = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsAccepted(true)
  }

  if (invite.status === 'expired') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Invite Expired</h1>
          <p className="mt-2 text-zinc-500">This invite link is no longer valid. Please ask for a new invite.</p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  if (isAccepted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Welcome to {invite.community.name}!</h1>
          <p className="mt-2 text-zinc-500">You're now a member of this community.</p>
          <button
            onClick={() => router.push(`/dashboard/communities/${invite.community.slug}`)}
            className="mt-8 inline-flex rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Go to Community
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
              <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
            </div>
            <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
          </Link>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-center">
            <div className={`mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br ${invite.community.imageGradient}`} />
            <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Join {invite.community.name}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {invite.community.description}
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${invite.inviter.avatar}`} />
              <div>
                <p className="text-sm text-zinc-500">Invited by</p>
                <p className="font-medium text-zinc-900 dark:text-white">{invite.inviter.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-center text-sm text-zinc-500">
            <div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{invite.community.memberCount}</p>
              <p>Members</p>
            </div>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
            <div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">12</p>
              <p>Events</p>
            </div>
          </div>

          <button
            onClick={handleAccept}
            disabled={isLoading}
            className="mt-8 w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Joining...
              </span>
            ) : (
              'Accept Invite'
            )}
          </button>

          <p className="mt-4 text-center text-xs text-zinc-500">
            By joining, you agree to the community guidelines and our{' '}
            <Link href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
