import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
const consumerKey = process.env.BRICKLINK_CONSUMER_KEY;
const consumerSecret = process.env.BRICKLINK_CONSUMER_SECRET;
const token = process.env.BRICKLINK_TOKEN;
const tokenSecret = process.env.BRICKLINK_TOKEN_SECRET;

export default async function handler(req, res) {
  const { BRICKLINK_CONSUMER_KEY, BRICKLINK_CONSUMER_SECRET, BRICKLINK_TOKEN, BRICKLINK_TOKEN_SECRET } = process.env;

  if (!BRICKLINK_CONSUMER_KEY || !BRICKLINK_CONSUMER_SECRET || !BRICKLINK_TOKEN || !BRICKLINK_TOKEN_SECRET) {
    return res.status(500).json({ error: 'Missing API credentials' });
  }

  const oauth = OAuth({
    consumer: { key: BRICKLINK_CONSUMER_KEY, secret: BRICKLINK_CONSUMER_SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    },
  });

  const requestData = {
    url: 'https://api.bricklink.com/api/store/v1/items/part', // Получаем список деталей
    method: 'GET',
  };

  const headers = oauth.toHeader(oauth.authorize(requestData, { key: BRICKLINK_TOKEN, secret: BRICKLINK_TOKEN_SECRET }));

  try {
    const response = await fetch(requestData.url, { headers });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('BrickLink API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
