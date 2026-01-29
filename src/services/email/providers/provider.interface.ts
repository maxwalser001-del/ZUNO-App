export interface EmailAddress {
  email: string
  name?: string
}

export interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType?: string
}

export interface SendEmailOptions {
  to: EmailAddress | EmailAddress[]
  from?: EmailAddress
  subject: string
  html: string
  text?: string
  replyTo?: EmailAddress
  attachments?: EmailAttachment[]
  tags?: Record<string, string>
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface EmailProvider {
  readonly name: string
  send(options: SendEmailOptions): Promise<SendEmailResult>
  sendBatch?(emails: SendEmailOptions[]): Promise<SendEmailResult[]>
}
