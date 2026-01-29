import type {
  EmailProvider,
  SendEmailOptions,
  SendEmailResult,
} from './providers/provider.interface'
import { ConsoleEmailProvider } from './providers/console.provider'

type EmailProviderType = 'resend' | 'sendgrid' | 'nodemailer' | 'console'

function getEmailProvider(): EmailProviderType {
  const provider = process.env.EMAIL_PROVIDER as EmailProviderType | undefined
  return provider ?? 'console'
}

function getEmailFrom(): string {
  return process.env.EMAIL_FROM ?? 'noreply@zuno.app'
}

function createEmailProvider(): EmailProvider {
  const providerType = getEmailProvider()

  switch (providerType) {
    case 'console':
      return new ConsoleEmailProvider()

    case 'resend':
      // Lazy import when implemented
      throw new Error('Resend provider not yet implemented')

    case 'sendgrid':
      // Lazy import when implemented
      throw new Error('SendGrid provider not yet implemented')

    case 'nodemailer':
      // Lazy import when implemented
      throw new Error('Nodemailer provider not yet implemented')

    default:
      return new ConsoleEmailProvider()
  }
}

class EmailService {
  private provider: EmailProvider

  constructor() {
    this.provider = createEmailProvider()
  }

  get providerName(): string {
    return this.provider.name
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const emailOptions: SendEmailOptions = {
      ...options,
      from: options.from ?? { email: getEmailFrom() },
    }

    return this.provider.send(emailOptions)
  }

  async sendBatch(emails: SendEmailOptions[]): Promise<SendEmailResult[]> {
    if (this.provider.sendBatch) {
      return this.provider.sendBatch(emails)
    }

    // Fallback: send sequentially
    return Promise.all(emails.map((email) => this.send(email)))
  }
}

// Singleton export
export const emailService = new EmailService()
