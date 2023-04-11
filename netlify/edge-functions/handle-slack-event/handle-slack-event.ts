import { handleMessageEvent } from './core/handle-message-event.ts';
import {
  SlackEventCallbackPayload,
  SlackEventPayload,
  SlackUrlVerificationPayload,
} from './helpers/slack-types.ts';

export default async (request: Request): Promise<Response> => {
  const payload: SlackEventPayload = await request.json();

  switch (payload.type) {
    case 'event_callback':
      return handleEventCallback(payload);
    case 'url_verification':
      return handleUrlVerification(payload);
  }

  // just in case it gets here somehow
  return new Response(undefined, { status: 200 });
};

async function handleEventCallback(payload: SlackEventCallbackPayload): Promise<Response> {
  switch (payload.event.type) {
    case 'message':
      return handleMessageEvent(payload.event);
  }

  // just in case it gets here somehow
  return new Response(undefined, { status: 200 });
}

function handleUrlVerification(payload: SlackUrlVerificationPayload): Response {
  return new Response(JSON.stringify({ challenge: payload.challenge }), { status: 200 });
}
