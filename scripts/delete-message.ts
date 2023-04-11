const SLACK_TOKEN = Deno.env.get('SLACK_TOKEN');
const [messageUrl] = Deno.args;

const messageUrlRegex = /archives\/(C[A-Z0-9]+)\/p([0-9]+)([0-9]{6})/;
const [, channel, tsWhole, tsDecimal] = messageUrlRegex.exec(messageUrl)!;

const ts = `${tsWhole}.${tsDecimal}`;

(async () => {
  const response = await fetch('https://slack.com/api/chat.delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ channel, ts }),
  });

  console.log(await response.json());
})();
