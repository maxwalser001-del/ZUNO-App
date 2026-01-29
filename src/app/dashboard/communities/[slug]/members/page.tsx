'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Mock data
const communityInfo = {
  name: 'Design Community',
  slug: 'design-community',
  gradient: 'from-blue-500 to-violet-500',
}

const mockMembers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'owner' as const, joinedAt: '2024-01-15', eventsAttended: 24, gradient: 'from-blue-500 to-cyan-500' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'admin' as const, joinedAt: '2024-02-20', eventsAttended: 18, gradient: 'from-emerald-500 to-teal-500' },
  { id: '3', name: 'Alex Kim', email: 'alex@example.com', role: 'moderator' as const, joinedAt: '2024-03-10', eventsAttended: 15, gradient: 'from-pink-500 to-rose-500' },
  { id: '4', name: 'Jordan Lee', email: 'jordan@example.com', role: 'member' as const, joinedAt: '2024-04-05', eventsAttended: 12, gradient: 'from-amber-500 to-orange-500' },
  { id: '5', name: 'Taylor Swift', email: 'taylor@example.com', role: 'member' as const, joinedAt: '2024-05-15', eventsAttended: 10, gradient: 'from-indigo-500 to-purple-500' },
  { id: '6', name: 'Chris Brown', email: 'chris@example.com', role: 'member' as const, joinedAt: '2024-06-01', eventsAttended: 8, gradient: 'from-red-500 to-orange-500' },
  { id: '7', name: 'Pat Wilson', email: 'pat@example.com', role: 'member' as const, joinedAt: '2024-06-20', eventsAttended: 6, gradient: 'from-cyan-500 to-blue-500' },
  { id: '8', name: 'Sam Davis', email: 'sam@example.com', role: 'member' as const, joinedAt: '2024-07-10', eventsAttended: 4, gradient: 'from-violet-500 to-purple-500' },
  { id: '9', name: 'Morgan Garcia', email: 'morgan@example.com', role: 'member' as const, joinedAt: '2024-08-05', eventsAttended: 3, gradient: 'from-rose-500 to-pink-500' },
  { id: '10', name: 'Casey Martinez', email: 'casey@example.com', role: 'member' as const, joinedAt: '2024-09-01', eventsAttended: 2, gradient: 'from-teal-500 to-emerald-500' },
]

const pendingRequests = [
  { id: '11', name: 'New User 1', email: 'newuser1@example.com', requestedAt: '2024-12-10', gradient: 'from-gray-400 to-gray-600' },
  { id: '12', name: 'New User 2', email: 'newuser2@example.com', requestedAt: '2024-12-12', gradient: 'from-gray-400 to-gray-600' },
]

const roleOptions = [
  { value: 'member', label: 'Member' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'admin', label: 'Admin' },
]

const roleColors = {
  owner: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  admin: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  moderator: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  member: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
}

export default function MembersPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'members' | 'pending'>('members')

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const toggleSelectMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.id))
    }
  }

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
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Members</h1>
                <p className="text-sm text-zinc-500">{communityInfo.name}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Invite Members
            </span>
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab('members')}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'members'
                ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            )}
          >
            All Members ({mockMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === 'pending'
                ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            )}
          >
            Pending Requests
            {pendingRequests.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {pendingRequests.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'members' && (
          <>
            {/* Filters */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
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
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <option value="all">All Roles</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>

              {selectedMembers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">{selectedMembers.length} selected</span>
                  <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    Change Role
                  </button>
                  <button className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Members Table */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-sm text-zinc-500 dark:border-zinc-800">
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-zinc-300"
                      />
                    </th>
                    <th className="px-6 py-4 font-medium">Member</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Joined</th>
                    <th className="px-6 py-4 font-medium text-right">Events Attended</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleSelectMember(member.id)}
                          disabled={member.role === 'owner'}
                          className="h-4 w-4 rounded border-zinc-300 disabled:opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${member.gradient}`} />
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-white">{member.name}</p>
                            <p className="text-sm text-zinc-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', roleColors[member.role])}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {new Date(member.joinedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-zinc-500">{member.eventsAttended}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setShowRoleModal(member.id)}
                          disabled={member.role === 'owner'}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 disabled:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'pending' && (
          <div className="mt-6">
            {pendingRequests.length === 0 ? (
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">No pending requests</h3>
                <p className="mt-1 text-sm text-zinc-500">All membership requests have been reviewed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${request.gradient}`} />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">{request.name}</p>
                        <p className="text-sm text-zinc-500">{request.email}</p>
                        <p className="text-xs text-zinc-400">
                          Requested {new Date(request.requestedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                        Decline
                      </button>
                      <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
                  Email Addresses
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter email addresses, separated by commas"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Or share invite link
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://zuno.app/invite/${communityInfo.slug}`}
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  />
                  <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Personal message (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Add a personal note to the invitation..."
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                Send Invites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Change Role</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Select a new role for {mockMembers.find((m) => m.id === showRoleModal)?.name}
            </p>

            <div className="mt-6 space-y-2">
              {roleOptions.map((role) => (
                <label
                  key={role.value}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{role.label}</span>
                  <input type="radio" name="role" value={role.value} className="h-4 w-4" />
                </label>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowRoleModal(null)}
                className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRoleModal(null)}
                className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
