import type {
  EmailProvider,
  SendEmailOptions,
  SendEmailResult,
} from './provider.interface'

export class ConsoleEmailProvider implements EmailProvider {
  readonly name = 'console'

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('EMAIL SENT (Console Provider)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('To:', JSON.stringify(options.to))
    console.log('Subject:', options.subject)
    console.log('From:', options.from?.email ?? 'default')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(options.text ?? options.html)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return {
      success: true,
      messageId: `console-${Date.now()}`,
    }
  }

  async sendBatch(emails: SendEmailOptions[]): Promise<SendEmailResult[]> {
    return Promise.all(emails.map((email) => this.send(email)))
  }
}
