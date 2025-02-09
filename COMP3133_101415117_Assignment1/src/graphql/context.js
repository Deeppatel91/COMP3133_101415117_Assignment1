const authenticate = require('../middleware/auth');

module.exports = ({ req }) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return { user: null }; // Allow signup & login without JWT
  }

  try {
    return { user: authenticate(req) }; // Validate token for other queries/mutations
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};
