import { environment } from '../helpers/environment.ts';
import { SlackMessageEvent } from '../helpers/slack-types.ts';

const { SLACK_TOKEN, SLACK_CHANNEL } = environment;

export async function handleMessageEvent(event: SlackMessageEvent): Promise<Response> {
  const messageIsNotFromBot = !event.bot_id;
  const messageIsNotThreadReply = !event.thread_ts;
  const messageIsInSupportChannel =
    event.channel_type === 'channel' && event.channel === SLACK_CHANNEL;

  if (messageIsNotFromBot && messageIsNotThreadReply && messageIsInSupportChannel) {
    await postSupportReplyMessage(event);
  }

  return new Response(undefined, { status: 200 });
}

async function postSupportReplyMessage(event: SlackMessageEvent): Promise<void> {
  const supportReplyMessage = `Thanks for reaching out in #clarity-support. Until we get a chance to respond to your question, here are a few tips that might help:  
  
• Search this channel or check our <https://confluence.eng.vmware.com/display/DESIGN/Support+Database|support database>. 
• If your question is regarding \`@clr/angular\` or \`@cds/core\`, verify the version you are on is <https://clarity.design/documentation/support|supported>. Updating to the latest minor/patch version may also resolve your issue.`;

  await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: event.channel,
      thread_ts: event.ts,
      text: supportReplyMessage,
    }),
  });
}
