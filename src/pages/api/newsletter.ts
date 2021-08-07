import type {NextApiRequest, NextApiResponse} from 'next';

async function subscribe(email: string, firstName?: string): Promise<boolean> {
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const REGION = process.env.MAILCHIMP_REGION;

  const url = `https://${REGION}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const encodedToken = Buffer.from(`apikey:${API_KEY}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      merge_fields: {
        FNAME: firstName,
      },
      email_address: email,
      status: 'subscribed',
    }),
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Basic ${encodedToken}`,
    }),
  });

  return response.ok;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).send(`Method ${req.method} is not allowed`);
    return;
  }
  if (!req.body || !req.body.email) {
    res.status(400).send(`Missing email`);
    return;
  }
  try {
    const {email, firstName} = req.body;
    const success = await subscribe(email, firstName);
    if (success) {
      res.status(200).json({});
    } else {
      res.status(500).json({});
    }
  } catch {
    res.status(500).json({});
  }
}

export default handler;
