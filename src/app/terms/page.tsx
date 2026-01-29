import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
              <span className="text-lg font-bold text-white dark:text-zinc-900">Z</span>
            </div>
            <span className="text-xl font-semibold text-zinc-900 dark:text-white">Zuno</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <article className="prose prose-zinc max-w-none dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: December 15, 2024</p>

          <p>
            Welcome to Zuno. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services").
            By using our Services, you agree to these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Zuno, you agree to be bound by these Terms and our Privacy Policy. If you don't agree to these Terms,
            you may not use our Services. We may update these Terms from time to time. Your continued use of the Services after changes
            constitutes acceptance of the new Terms.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            Zuno provides a platform for creating, managing, and participating in communities. Our Services include:
          </p>
          <ul>
            <li>Community creation and management tools</li>
            <li>Event hosting and RSVP functionality</li>
            <li>Member management and communication features</li>
            <li>Analytics and insights for community organizers</li>
          </ul>

          <h2>3. Account Registration</h2>
          <p>
            To use certain features of our Services, you must create an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update your information if it changes</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
          <p>
            You must be at least 13 years old to create an account. If you're under 18, you must have parental consent.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on others' intellectual property rights</li>
            <li>Post harmful, threatening, or discriminatory content</li>
            <li>Spam, harass, or abuse other users</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the Services for any illegal purpose</li>
            <li>Interfere with the proper functioning of the Services</li>
          </ul>

          <h2>5. Content</h2>
          <h3>Your Content</h3>
          <p>
            You retain ownership of content you post on Zuno. By posting content, you grant us a worldwide, non-exclusive,
            royalty-free license to use, display, and distribute that content in connection with our Services.
          </p>
          <h3>Content Moderation</h3>
          <p>
            We reserve the right to remove content that violates these Terms or our community guidelines. Community organizers
            may also moderate content within their communities.
          </p>

          <h2>6. Community Guidelines</h2>
          <p>
            Communities on Zuno must adhere to our community guidelines, which prohibit:
          </p>
          <ul>
            <li>Hate speech and discrimination</li>
            <li>Harassment and bullying</li>
            <li>Illegal activities</li>
            <li>Spam and misleading content</li>
            <li>Adult content (unless properly marked and restricted)</li>
          </ul>

          <h2>7. Payment Terms</h2>
          <p>
            Some features require a paid subscription. By subscribing, you agree to:
          </p>
          <ul>
            <li>Pay all applicable fees</li>
            <li>Provide valid payment information</li>
            <li>Automatic renewal unless cancelled</li>
          </ul>
          <p>
            Refunds are available within 30 days of purchase, as detailed in our refund policy.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            Zuno and its content, features, and functionality are owned by Zuno and protected by copyright, trademark,
            and other intellectual property laws. You may not copy, modify, or create derivative works without our permission.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms. You may also delete your account at any time.
            Upon termination, your right to use the Services ceases immediately.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT
            THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZUNO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Zuno from any claims, damages, or expenses arising from your use of the Services
            or violation of these Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
            Any disputes shall be resolved in the courts of San Francisco County, California.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <ul>
            <li>Email: legal@zuno.app</li>
            <li>Address: 123 Community St, San Francisco, CA 94102</li>
          </ul>
        </article>

        <div className="mt-12 flex gap-4 text-sm text-zinc-500">
          <Link href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            Privacy Policy
          </Link>
          <Link href="/help" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
