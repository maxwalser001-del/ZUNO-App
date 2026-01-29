'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

const communities = [
  { id: '1', name: 'Design Community', slug: 'design-community' },
  { id: '2', name: 'Tech Founders', slug: 'tech-founders' },
  { id: '3', name: 'Creative Writers', slug: 'creative-writers' },
]

// Mock event data - in real app, fetch from API
const mockEvents: Record<string, {
  id: string
  title: string
  description: string
  communityId: string
  date: string
  startTime: string
  endTime: string
  timezone: string
  locationType: 'online' | 'in-person'
  location: string
  locationUrl: string
  capacity: string
  isPublic: boolean
  status: 'published' | 'draft' | 'cancelled'
}> = {
  '1': {
    id: '1',
    title: 'Weekly Design Standup',
    description: 'Join us for our weekly design team standup where we share progress, blockers, and upcoming priorities. All designers welcome!',
    communityId: '1',
    date: '2024-12-15',
    startTime: '10:00',
    endTime: '11:00',
    timezone: 'America/New_York',
    locationType: 'online',
    location: '',
    locationUrl: 'https://zoom.us/j/123456789',
    capacity: '50',
    isPublic: true,
    status: 'published',
  },
  '2': {
    id: '2',
    title: 'Design Workshop: Figma Tips',
    description: 'Learn advanced Figma techniques including auto-layout, components, and design systems. Bring your questions!',
    communityId: '1',
    date: '2024-12-18',
    startTime: '14:00',
    endTime: '16:00',
    timezone: 'America/Los_Angeles',
    locationType: 'in-person',
    location: '123 Design St, San Francisco, CA 94102',
    locationUrl: '',
    capacity: '25',
    isPublic: true,
    status: 'published',
  },
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
    status: 'published' as 'published' | 'draft' | 'cancelled',
  })
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Load event data
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const event = mockEvents[eventId]
      if (event) {
        setFormData(event)
      }
      setIsLoading(false)
    }, 500)
  }, [eventId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    router.push(`/dashboard/events/${eventId}`)
  }

  const handleCancel = async () => {
    setIsSaving(true)
    setFormData({ ...formData, status: 'cancelled' })
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowCancelModal(false)
    setIsSaving(false)
    router.push(`/dashboard/events/${eventId}`)
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-500">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading event...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/events/${eventId}`}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Edit Event</h1>
              <p className="text-sm text-zinc-500">{formData.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {formData.status !== 'cancelled' && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Cancel Event
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSaving || !formData.title || !formData.communityId || !formData.date}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="mx-auto max-w-3xl p-6">
        {formData.status === 'cancelled' && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">This event has been cancelled</p>
                <p className="text-sm text-red-600 dark:text-red-400/80">Attendees have been notified.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
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
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
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
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
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
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
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

          {/* Danger Zone */}
          <section className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/10">
            <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
              These actions cannot be undone.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                disabled={formData.status === 'cancelled'}
                className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
              >
                {formData.status === 'cancelled' ? 'Event Cancelled' : 'Cancel Event'}
              </button>
            </div>
          </section>
        </form>
      </div>

      {/* Cancel Event Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Cancel Event</h3>
                <p className="text-sm text-zinc-500">This action cannot be undone.</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to cancel this event? All attendees will be notified and the event will be marked as cancelled.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Keep Event
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isSaving ? 'Cancelling...' : 'Cancel Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
