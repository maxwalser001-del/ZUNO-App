'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const gradientOptions = [
  { id: 'blue-violet', value: 'from-blue-500 to-violet-500' },
  { id: 'emerald-teal', value: 'from-emerald-500 to-teal-500' },
  { id: 'orange-red', value: 'from-orange-500 to-red-500' },
  { id: 'pink-rose', value: 'from-pink-500 to-rose-500' },
  { id: 'cyan-blue', value: 'from-cyan-500 to-blue-500' },
  { id: 'amber-orange', value: 'from-amber-500 to-orange-500' },
  { id: 'indigo-purple', value: 'from-indigo-500 to-purple-500' },
  { id: 'slate-zinc', value: 'from-slate-500 to-zinc-600' },
]

const categoryOptions = [
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'startup', label: 'Startups', icon: '🚀' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: 'other', label: 'Other', icon: '🌐' },
]

export default function NewCommunityPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    gradient: gradientOptions[0].value,
    visibility: 'public' as 'public' | 'private',
    allowMemberInvites: true,
    requireApproval: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push(`/dashboard/communities/${formData.slug}`)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link
            href="/dashboard/communities"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Create Community</h1>
            <p className="text-sm text-zinc-500">Set up a new community for your group</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Basic Information</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Tell people what your community is about.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Community Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Design Community"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  URL Slug
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-zinc-500">zuno.app/c/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="design-community"
                    className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's your community about? What can members expect?"
                  className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>
          </section>

          {/* Category & Branding */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Category & Branding</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Help people discover your community and make it recognizable.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors',
                        formData.category === category.id
                          ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800'
                          : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                      )}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Community Color
                </label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {gradientOptions.map((gradient) => (
                    <button
                      key={gradient.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, gradient: gradient.value })}
                      className={cn(
                        'h-10 w-10 rounded-xl bg-gradient-to-br transition-transform',
                        gradient.value,
                        formData.gradient === gradient.value && 'ring-2 ring-zinc-900 ring-offset-2 dark:ring-white'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Preview
                </label>
                <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${formData.gradient}`} />
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {formData.name || 'Community Name'}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {formData.description || 'Community description will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy & Access */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Privacy & Access</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Control who can find and join your community.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Visibility
                </label>
                <div className="mt-2 space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === 'public'}
                      onChange={() => setFormData({ ...formData, visibility: 'public' })}
                      className="mt-0.5 h-4 w-4 text-zinc-900"
                    />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">Public</p>
                      <p className="text-sm text-zinc-500">
                        Anyone can find and join this community. Content is visible to all.
                      </p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === 'private'}
                      onChange={() => setFormData({ ...formData, visibility: 'private' })}
                      className="mt-0.5 h-4 w-4 text-zinc-900"
                    />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">Private</p>
                      <p className="text-sm text-zinc-500">
                        Only people with an invite link can join. Community is hidden from search.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Allow member invites</p>
                    <p className="text-sm text-zinc-500">Members can invite others to join</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, allowMemberInvites: !formData.allowMemberInvites })}
                    className={cn(
                      'relative h-6 w-11 rounded-full transition-colors',
                      formData.allowMemberInvites ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform dark:bg-zinc-900',
                        formData.allowMemberInvites && 'translate-x-5'
                      )}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Require approval</p>
                    <p className="text-sm text-zinc-500">Admins must approve new member requests</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, requireApproval: !formData.requireApproval })}
                    className={cn(
                      'relative h-6 w-11 rounded-full transition-colors',
                      formData.requireApproval ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform dark:bg-zinc-900',
                        formData.requireApproval && 'translate-x-5'
                      )}
                    />
                  </button>
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/dashboard/communities"
              className="flex-1 rounded-lg border border-zinc-200 bg-white py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.description || !formData.category}
              className="flex-1 rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Community'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
