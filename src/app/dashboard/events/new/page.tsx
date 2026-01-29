'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const communities = [
  { id: '1', name: 'Design Community', slug: 'design-community' },
  { id: '2', name: 'Tech Founders', slug: 'tech-founders' },
  { id: '3', name: 'Creative Writers', slug: 'creative-writers' },
]

export default function CreateEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    communityId: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'America/New_York',
    locationType: 'online' as 'online' | 'in-person',
    location: '',
    locationUrl: '',
    capacity: '',
    isPublic: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push('/dashboard/events')
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/events"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Create Event</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !formData.title || !formData.communityId || !formData.date}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {isLoading ? 'Publishing...' : 'Publish Event'}
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="mx-auto max-w-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Basic Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Weekly Design Standup"
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  placeholder="Tell people what your event is about..."
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Community <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.communityId}
                  onChange={(e) => updateField('communityId', e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <option value="">Select a community</option>
                  {communities.map((community) => (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Date & Time */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Date & Time</h2>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => updateField('startTime', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => updateField('endTime', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => updateField('timezone', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">GMT/BST</option>
                  <option value="Europe/Paris">Central European Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Location</h2>
            <div className="mt-4 space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="locationType"
                    value="online"
                    checked={formData.locationType === 'online'}
                    onChange={() => updateField('locationType', 'online')}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Online</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="locationType"
                    value="in-person"
                    checked={formData.locationType === 'in-person'}
                    onChange={() => updateField('locationType', 'in-person')}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">In Person</span>
                </label>
              </div>

              {formData.locationType === 'online' ? (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={formData.locationUrl}
                    onChange={(e) => updateField('locationUrl', e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                  />
                  <p className="mt-1 text-xs text-zinc-500">Zoom, Google Meet, or any video conferencing link</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Venue Address
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g., 123 Main St, San Francisco, CA"
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Settings */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => updateField('capacity', e.target.value)}
                  placeholder="Leave empty for unlimited"
                  min="1"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500 sm:w-48"
                />
              </div>

              <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Public Event</p>
                  <p className="text-sm text-zinc-500">Anyone with the link can see this event</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => updateField('isPublic', e.target.checked)}
                  className="h-5 w-5 rounded"
                />
              </label>
            </div>
          </section>

          {/* Preview Card */}
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Preview</h2>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {formData.title || 'Event Title'}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {communities.find((c) => c.id === formData.communityId)?.name || 'Select a community'}
                  </p>
                </div>
              </div>
              {formData.description && (
                <p className="mt-3 text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
                  {formData.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {formData.date && (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {formData.startTime && ` at ${formData.startTime}`}
                  </span>
                )}
                {(formData.location || formData.locationUrl) && (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {formData.locationType === 'online' ? 'Online' : formData.location}
                  </span>
                )}
                {formData.capacity && (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {formData.capacity} spots
                  </span>
                )}
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
