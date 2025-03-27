import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const consumerKey = process.env.BRICKLINK_CONSUMER_KEY;
  const consumerSecret = process.env.BRICKLINK_CONSUMER_SECRET;
  const token = process.env.BRICKLINK_TOKEN;
  const tokenSecret = process.env.BRICKLINK_TOKEN_SECRET;

  if (!consumerKey || !consumerSecret || !token || !tokenSecret) {
    return res.status(500).json({ error: 'Missing API credentials' });
  }

  const oauth = OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    },
  });

  const requestData = {
    url: 'https://api.bricklink.com/api/store/Malmeloon/items', // Пример запроса
    method: 'GET',
  };

  const headers = oauth.toHeader(oauth.authorize(requestData, { key: token, secret: tokenSecret }));

  try {
    const response = await fetch(requestData.url, { method: requestData.method, headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from BrickLink' });
  }
}
