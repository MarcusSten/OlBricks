const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  res.status(200).json({ message: 'BrickLink API is working!' });
};
