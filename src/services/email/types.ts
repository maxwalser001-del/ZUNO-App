export type EmailTemplate =
  | 'welcome'
  | 'event-reminder'
  | 'event-cancelled'
  | 'invite'
  | 'rsvp-confirmation'
  | 'waitlist-promoted'

export interface EmailTemplateData {
  welcome: {
    userName: string
    communityName: string
    dashboardUrl: string
  }
  'event-reminder': {
    userName: string
    eventTitle: string
    eventDate: string
    eventTime: string
    eventLocation: string
    eventUrl: string
  }
  'event-cancelled': {
    userName: string
    eventTitle: string
    communityName: string
  }
  invite: {
    inviterName: string
    communityName: string
    inviteUrl: string
    expiresAt: string
  }
  'rsvp-confirmation': {
    userName: string
    eventTitle: string
    eventDate: string
    eventLocation: string
  }
  'waitlist-promoted': {
    userName: string
    eventTitle: string
    eventDate: string
    eventUrl: string
  }
}
