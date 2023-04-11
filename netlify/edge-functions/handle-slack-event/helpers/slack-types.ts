export interface SlackMessageEvent {
  type: 'message';
  subtype?: string;
  channel: string;
  channel_type: string;
  bot_id: string;
  ts: string;
  thread_ts?: string;
}

export type SlackEvent = SlackMessageEvent;

export interface SlackEventCallbackPayload {
  type: 'event_callback';
  event: SlackEvent;
}

export interface SlackUrlVerificationPayload {
  type: 'url_verification';
  challenge: string;
}

export type SlackEventPayload = SlackEventCallbackPayload | SlackUrlVerificationPayload;
