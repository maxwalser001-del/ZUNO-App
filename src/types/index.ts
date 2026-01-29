// Re-export Prisma types for convenience
export type {
  User,
  Community,
  Membership,
  Event,
  EventRsvp,
  Invite,
  MembershipRole,
  MembershipStatus,
  EventStatus,
  RsvpStatus,
  InviteStatus,
} from '@prisma/client'

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}
