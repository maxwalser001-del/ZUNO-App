export interface JobContext {
  jobId: string
  startedAt: Date
}

export interface JobResult {
  success: boolean
  processedCount?: number
  errors?: string[]
}

export type JobHandler = (context: JobContext) => Promise<JobResult>

export interface CronJobConfig {
  name: string
  schedule: string
  handler: JobHandler
  enabled: boolean
}
