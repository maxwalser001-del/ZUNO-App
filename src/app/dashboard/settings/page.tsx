'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'security', label: 'Security' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-16 items-center px-6">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Settings</h1>
            <p className="text-sm text-zinc-500">Manage your account and preferences</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Profile</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Update your personal information and public profile.
      </p>

      <div className="mt-8 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
          <div>
            <button className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              Change avatar
            </button>
            <p className="mt-1 text-xs text-zinc-500">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Demo User"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="demo@zuno.app"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
          <textarea
            rows={3}
            placeholder="Tell us a bit about yourself..."
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
          />
          <p className="mt-1 text-xs text-zinc-500">Brief description for your profile.</p>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Timezone
          </label>
          <select className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <option>UTC (GMT+0)</option>
            <option>Eastern Time (GMT-5)</option>
            <option>Central Time (GMT-6)</option>
            <option>Pacific Time (GMT-8)</option>
            <option>Central European Time (GMT+1)</option>
          </select>
        </div>

        <div className="pt-4">
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Notifications</h2>
      <p className="mt-1 text-sm text-zinc-500">Choose how you want to be notified.</p>

      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Email Notifications</h3>

          <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">Event reminders</p>
              <p className="text-sm text-zinc-500">Get notified 24 hours before events you RSVP'd to</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </label>

          <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">New events</p>
              <p className="text-sm text-zinc-500">When new events are created in your communities</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </label>

          <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">Community updates</p>
              <p className="text-sm text-zinc-500">Important announcements from your communities</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </label>

          <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">New members</p>
              <p className="text-sm text-zinc-500">When someone joins a community you manage</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
          </label>

          <label className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">Marketing emails</p>
              <p className="text-sm text-zinc-500">Tips, product updates, and community insights</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
          </label>
        </div>

        <div className="pt-4">
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState('system')

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Appearance</h2>
      <p className="mt-1 text-sm text-zinc-500">Customize how Zuno looks on your device.</p>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Theme</h3>
          <p className="text-sm text-zinc-500">Select your preferred theme.</p>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { id: 'light', label: 'Light', icon: '☀️' },
              { id: 'dark', label: 'Dark', icon: '🌙' },
              { id: 'system', label: 'System', icon: '💻' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setTheme(option.id)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors',
                  theme === option.id
                    ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800'
                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                )}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Security</h2>
      <p className="mt-1 text-sm text-zinc-500">Manage your account security.</p>

      <div className="mt-8 space-y-6">
        {/* Sessions */}
        <div>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Active Sessions</h3>
          <p className="text-sm text-zinc-500">Manage devices where you're currently logged in.</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <svg
                    className="h-5 w-5 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">macOS - Chrome</p>
                  <p className="text-sm text-zinc-500">Current session</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <svg
                    className="h-5 w-5 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">iPhone - Safari</p>
                  <p className="text-sm text-zinc-500">Last active 2 hours ago</p>
                </div>
              </div>
              <button className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                Revoke
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
          <h3 className="text-sm font-medium text-red-900 dark:text-red-400">Danger Zone</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            Permanently delete your account and all associated data.
          </p>
          <button className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
