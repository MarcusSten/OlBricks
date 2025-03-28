import axios from 'axios';

export default async function handler(req, res) {
  const consumerKey = process.env.BRICKLINK_CONSUMER_KEY;
  const consumerSecret = process.env.BRICKLINK_CONSUMER_SECRET;
  const token = process.env.BRICKLINK_TOKEN;
  const tokenSecret = process.env.BRICKLINK_TOKEN_SECRET;

  // Проверка наличия всех необходимых переменных окружения
  if (!consumerKey || !consumerSecret || !token || !tokenSecret) {
    console.error('Missing required environment variables');
    return res.status(500).json({ error: 'Missing required environment variables' });
  }

  console.log('Consumer Key:', consumerKey); // Логирование для отладки
  console.log('Token:', token); // Логирование для отладки

  // Если запрос не GET, вернем ошибку
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Формируем заголовки для запроса
    const authHeader = `OAuth oauth_consumer_key="${consumerKey}", oauth_token="${token}", oauth_signature_method="HMAC-SHA1", oauth_version="1.0"`;

    // Запрос к API BrickLink
    const response = await axios.get('https://api.bricklink.com/api/store/v1/items', {
      headers: {
        Authorization: authHeader,
      },
    });

    // Отправляем полученные данные
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from BrickLink:', error);

    // Логируем подробности ошибки
    if (error.response) {
      console.error('Response error:', error.response.data);
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('Request error:', error.request);
      return res.status(500).json({ error: 'No response from BrickLink API' });
    } else {
      console.error('General error:', error.message);
      return res.status(500).json({ error: 'Error in request setup' });
    }
  }
}
