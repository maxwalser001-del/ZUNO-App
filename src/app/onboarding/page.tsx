'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, title: 'Welcome' },
  { id: 2, title: 'Profile' },
  { id: 3, title: 'Interests' },
  { id: 4, title: 'Ready' },
]

const interests = [
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'startup', label: 'Startups', icon: '🚀' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: 'data', label: 'Data Science', icon: '📊' },
  { id: 'ai', label: 'AI & ML', icon: '🤖' },
  { id: 'crypto', label: 'Web3 & Crypto', icon: '🔗' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'fitness', label: 'Health & Fitness', icon: '💪' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    interests: [] as string[],
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar Progress */}
      <div className="hidden w-80 border-r border-zinc-200 bg-white p-8 lg:block dark:border-zinc-800 dark:bg-zinc-900">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
            <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
          </div>
          <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
        </Link>

        <nav className="mt-12">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
                    currentStep === step.id
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : currentStep > step.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                  )}
                >
                  {currentStep > step.id ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    currentStep === step.id
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400'
                  )}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Progress */}
        <div className="border-b border-zinc-200 bg-white p-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </Link>
            <span className="text-sm text-zinc-500">Step {currentStep} of 4</span>
          </div>
          <div className="mt-4 flex gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors',
                  currentStep >= step.id
                    ? 'bg-zinc-900 dark:bg-white'
                    : 'bg-zinc-200 dark:bg-zinc-700'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-lg">
            {currentStep === 1 && (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500">
                  <span className="text-4xl">👋</span>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-white">
                  Welcome to Zuno!
                </h1>
                <p className="mt-3 text-lg text-zinc-500">
                  Let's get you set up so you can start connecting with amazing communities.
                </p>
                <button
                  onClick={handleNext}
                  className="mt-8 w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Get Started
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Tell us about yourself
                </h1>
                <p className="mt-2 text-zinc-500">
                  This helps others in the community get to know you.
                </p>

                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      placeholder="Tell us a bit about yourself..."
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="San Francisco, CA"
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 rounded-lg border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  What are you interested in?
                </h1>
                <p className="mt-2 text-zinc-500">
                  Select topics you're passionate about. We'll recommend communities based on your interests.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors',
                        formData.interests.includes(interest.id)
                          ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800'
                          : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                      )}
                    >
                      <span className="text-2xl">{interest.icon}</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {interest.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 rounded-lg border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                  <svg
                    className="h-10 w-10 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-white">
                  You're all set!
                </h1>
                <p className="mt-3 text-lg text-zinc-500">
                  Your profile is ready. Let's explore some communities that match your interests.
                </p>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleNext}
                    className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Go to Dashboard
                  </button>
                  <Link
                    href="/dashboard/communities"
                    className="block w-full rounded-lg border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    Explore Communities
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
