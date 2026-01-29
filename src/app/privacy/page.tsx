import Link from 'next/link'

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: December 15, 2024</p>

          <p>
            At Zuno, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
            <li><strong>Profile Information:</strong> Bio, location, profile picture, and other details you choose to share</li>
            <li><strong>Community Content:</strong> Posts, comments, event details, and other content you create</li>
            <li><strong>Communications:</strong> Messages you send through the platform</li>
            <li><strong>Payment Information:</strong> Billing details when you make purchases (processed by our payment providers)</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the platform</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
            <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
            <li><strong>Cookies:</strong> Session cookies and preference cookies to enhance your experience</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Personalize your experience and provide content recommendations</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We may share your information in the following circumstances:</p>

          <h3>With Your Consent</h3>
          <p>We share information when you explicitly consent, such as when joining a community or RSVPing to events.</p>

          <h3>With Community Organizers</h3>
          <p>
            When you join a community or RSVP to an event, organizers may see your profile information.
            This is necessary for community management.
          </p>

          <h3>With Service Providers</h3>
          <p>
            We work with third-party companies to provide services like hosting, analytics, payment processing,
            and customer support. These providers only access information necessary to perform their services.
          </p>

          <h3>For Legal Reasons</h3>
          <p>
            We may disclose information if required by law, legal process, or government request, or to protect
            the rights, property, or safety of Zuno, our users, or others.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide you services.
            You can request deletion of your account and associated data at any time. Some information may be
            retained for legal or legitimate business purposes.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information, including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>6. Your Rights and Choices</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data</li>
            <li><strong>Portability:</strong> Request a portable copy of your data</li>
            <li><strong>Opt-out:</strong> Opt out of marketing communications</li>
            <li><strong>Restriction:</strong> Request restriction of processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@zuno.app or through your account settings.
          </p>

          <h2>7. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Understand how you use our Services</li>
            <li>Improve our Services</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Note that disabling cookies may affect
            functionality.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our Services may contain links to third-party websites or services. We are not responsible for
            the privacy practices of these third parties. We encourage you to read their privacy policies.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our Services are not intended for children under 13. We do not knowingly collect information
            from children under 13. If you believe we have collected such information, please contact us
            immediately.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own.
            We ensure appropriate safeguards are in place for such transfers, including standard
            contractual clauses where applicable.
          </p>

          <h2>11. California Privacy Rights</h2>
          <p>
            California residents have additional rights under the CCPA, including the right to know
            what personal information is collected, the right to delete personal information, and
            the right to opt out of the sale of personal information.
          </p>
          <p>
            We do not sell personal information. To exercise your California privacy rights,
            please contact us at privacy@zuno.app.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes
            by posting the new policy on this page and updating the "Last updated" date. Your continued
            use of the Services after changes constitutes acceptance of the updated policy.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <ul>
            <li>Email: privacy@zuno.app</li>
            <li>Address: 123 Community St, San Francisco, CA 94102</li>
          </ul>
        </article>

        <div className="mt-12 flex gap-4 text-sm text-zinc-500">
          <Link href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            Terms of Service
          </Link>
          <Link href="/help" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
