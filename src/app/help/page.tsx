'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
  { id: 'communities', label: 'Communities', icon: '👥' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'account', label: 'Account & Settings', icon: '⚙️' },
  { id: 'billing', label: 'Billing', icon: '💳' },
]

const faqs = [
  {
    category: 'getting-started',
    question: 'How do I create an account?',
    answer: 'Creating an account is simple! Click the "Get Started" button on the homepage, enter your email address, and follow the magic link sent to your inbox. You can also sign up using your Google or GitHub account for faster access.',
  },
  {
    category: 'getting-started',
    question: 'What is Zuno and how does it work?',
    answer: 'Zuno is a community operations platform that helps you build and manage communities. You can create communities, host events, manage members, and engage with your audience all in one place. Think of it as your command center for community building.',
  },
  {
    category: 'getting-started',
    question: 'Is Zuno free to use?',
    answer: 'Yes! Zuno offers a generous free tier that includes unlimited communities, up to 100 members per community, and basic event hosting. For larger communities and advanced features, check out our Pro and Enterprise plans.',
  },
  {
    category: 'communities',
    question: 'How do I create a community?',
    answer: 'Once logged in, go to your Dashboard and click "New Community". Fill in your community name, description, choose a category, and set your privacy preferences. You can customize your community further after creation.',
  },
  {
    category: 'communities',
    question: 'Can I make my community private?',
    answer: 'Absolutely! When creating or editing your community, you can choose between Public (anyone can find and join) or Private (invite-only). Private communities won\'t appear in search results and require an invitation link to join.',
  },
  {
    category: 'communities',
    question: 'How do I invite members to my community?',
    answer: 'Go to your community\'s Members page and click "Invite Members". You can either send email invitations directly or share an invite link. You can also enable or disable member invites if you want existing members to invite others.',
  },
  {
    category: 'communities',
    question: 'What are the different member roles?',
    answer: 'Zuno supports four roles: Owner (full control, can delete community), Admin (manage members, events, and settings), Moderator (manage events and moderate content), and Member (attend events, participate in discussions).',
  },
  {
    category: 'events',
    question: 'How do I create an event?',
    answer: 'Navigate to Events in your dashboard and click "Create Event". Fill in the event details including title, description, date/time, and location (online or in-person). You can also set capacity limits and make events public or private.',
  },
  {
    category: 'events',
    question: 'Can I host online events?',
    answer: 'Yes! When creating an event, select "Online" as the location type and add your meeting link (Zoom, Google Meet, etc.). Attendees will see the link when they RSVP, and you can choose to reveal it only to confirmed attendees.',
  },
  {
    category: 'events',
    question: 'How do RSVPs work?',
    answer: 'Members can RSVP to events with a single click. As an organizer, you\'ll see who\'s attending in real-time. You can set capacity limits, enable waitlists, and send reminders to attendees before the event.',
  },
  {
    category: 'events',
    question: 'Can I cancel or reschedule an event?',
    answer: 'Yes, you can edit event details anytime. If you need to cancel, go to the event\'s edit page and click "Cancel Event". All attendees will be automatically notified of any changes or cancellations.',
  },
  {
    category: 'account',
    question: 'How do I change my email address?',
    answer: 'Go to Settings > Account and click "Change Email". You\'ll need to verify your new email address before the change takes effect. Your old email will also receive a notification for security.',
  },
  {
    category: 'account',
    question: 'How do I delete my account?',
    answer: 'We\'re sorry to see you go! Go to Settings > Account and scroll to the "Danger Zone". Click "Delete Account" and follow the confirmation steps. Note that this action is irreversible and will remove all your data.',
  },
  {
    category: 'account',
    question: 'How do I enable dark mode?',
    answer: 'Go to Settings > Appearance and choose your preferred theme: Light, Dark, or System (automatically matches your device settings). Your preference will be saved and applied across all devices.',
  },
  {
    category: 'billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards. For Enterprise plans, we also offer invoicing and bank transfers.',
  },
  {
    category: 'billing',
    question: 'How do I upgrade my plan?',
    answer: 'Go to Settings > Billing and click "Upgrade Plan". Choose your new plan and enter your payment details. Your new features will be available immediately, and billing will be prorated.',
  },
  {
    category: 'billing',
    question: 'Can I get a refund?',
    answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team within 30 days of your purchase for a full refund.',
  },
]

const popularArticles = [
  { title: 'Getting started with Zuno', href: '#', category: 'getting-started' },
  { title: 'Creating your first community', href: '#', category: 'communities' },
  { title: 'Hosting successful online events', href: '#', category: 'events' },
  { title: 'Managing community members', href: '#', category: 'communities' },
  { title: 'Understanding analytics', href: '#', category: 'communities' },
]

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
                <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </Link>
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
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">How can we help?</h1>
          <p className="mt-4 text-lg text-zinc-500">
            Search our knowledge base or browse categories below
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
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
                placeholder="Search for answers..."
                className="w-full rounded-xl border border-zinc-200 bg-white py-4 pl-12 pr-4 text-zinc-700 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              )}
            >
              All Topics
            </button>
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
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </p>

            <div className="mt-6 space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-white py-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
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
                    No results found
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Try a different search term or browse all topics.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-zinc-900 dark:text-white">{faq.question}</span>
                      <svg
                        className={cn(
                          'h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform',
                          expandedFaq === index && 'rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800">
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Popular Articles</h3>
              <ul className="mt-4 space-y-3">
                {popularArticles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href={article.href}
                      className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support */}
            <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Still need help?</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a
                href="mailto:support@zuno.app"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-zinc-900">Z</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">Zuno</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-500">
              <Link href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-300">Terms</Link>
              <Link href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-300">Privacy</Link>
              <Link href="/help" className="hover:text-zinc-700 dark:hover:text-zinc-300">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
