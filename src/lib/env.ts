import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Application
  APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  // Email
  EMAIL_PROVIDER: z
    .enum(['resend', 'sendgrid', 'nodemailer', 'console'])
    .default('console'),
  EMAIL_PROVIDER_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default('noreply@zuno.app'),

  // SMTP (optional, for nodemailer)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error(
      'Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = validateEnv()
