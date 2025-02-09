const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Unauthorized: No token provided');

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error('Unauthorized: Invalid token');
  }
};

module.exports = authenticate;
